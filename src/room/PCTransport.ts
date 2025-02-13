import { MediaDescription, parse, write } from 'sdp-transform';
import { debounce } from 'ts-debounce';
import log from '../logger';
import { NegotiationError } from './errors';

/** @internal */
interface TrackBitrateInfo {
  sid: string;
  codec: string;
  maxbr: number;
}

/** @internal */
export default class PCTransport {
  pc: RTCPeerConnection;

  pendingCandidates: RTCIceCandidateInit[] = [];

  restartingIce: boolean = false;

  renegotiate: boolean = false;

  trackBitrates: TrackBitrateInfo[] = [];

  forceStereoAudioSupport: boolean = false;

  onOffer?: (offer: RTCSessionDescriptionInit) => void;

  constructor(config?: RTCConfiguration, forceStereoAudioSupport?: boolean) {
    this.pc = new RTCPeerConnection(config);
    this.forceStereoAudioSupport = forceStereoAudioSupport ?? false;
  }

  get isICEConnected(): boolean {
    return this.pc.iceConnectionState === 'connected' || this.pc.iceConnectionState === 'completed';
  }

  async addIceCandidate(candidate: RTCIceCandidateInit): Promise<void> {
    if (this.pc.remoteDescription && !this.restartingIce) {
      return this.pc.addIceCandidate(candidate);
    }
    this.pendingCandidates.push(candidate);
  }

  async setRemoteDescription(sd: RTCSessionDescriptionInit): Promise<void> {
    await this.pc.setRemoteDescription(sd);

    this.pendingCandidates.forEach((candidate) => {
      this.pc.addIceCandidate(candidate);
    });
    this.pendingCandidates = [];
    this.restartingIce = false;

    if (this.renegotiate) {
      this.renegotiate = false;
      this.createAndSendOffer();
    }
  }

  // debounced negotiate interface
  negotiate = debounce((onError?: (e: Error) => void) => {
    try {
      this.createAndSendOffer();
    } catch (e) {
      if (onError) {
        onError(e as Error);
      } else {
        throw e;
      }
    }
  }, 100);

  async createAndSendOffer(options?: RTCOfferOptions) {
    if (this.onOffer === undefined) {
      return;
    }

    if (options?.iceRestart) {
      log.debug('restarting ICE');
      this.restartingIce = true;
    }

    if (this.pc.signalingState === 'have-local-offer') {
      // we're waiting for the peer to accept our offer, so we'll just wait
      // the only exception to this is when ICE restart is needed
      const currentSD = this.pc.remoteDescription;
      if (options?.iceRestart && currentSD) {
        // TODO: handle when ICE restart is needed but we don't have a remote description
        // the best thing to do is to recreate the peerconnection
        await this.pc.setRemoteDescription(currentSD);
      } else {
        this.renegotiate = true;
        return;
      }
    } else if (this.pc.signalingState === 'closed') {
      log.warn('could not createOffer with closed peer connection');
      return;
    }

    // actually negotiate
    log.debug('starting to negotiate');
    const offer = await this.pc.createOffer(options);

    const sdpParsed = parse(offer.sdp ?? '');
    sdpParsed.media.forEach((media) => {
      if (media.type === 'audio') {
        ensureAudioNack(media);
        if (this.forceStereoAudioSupport) {
          ensureStereoAudio(media);
        }
      } else if (media.type === 'video') {
        // mung sdp for codec bitrate setting that can't apply by sendEncoding
        this.trackBitrates.some((trackbr): boolean => {
          if (!media.msid || !media.msid.includes(trackbr.sid)) {
            return false;
          }

          let codecPayload = 0;
          media.rtp.some((rtp): boolean => {
            if (rtp.codec.toUpperCase() === trackbr.codec.toUpperCase()) {
              codecPayload = rtp.payload;
              return true;
            }
            return false;
          });

          // add x-google-max-bitrate to fmtp line if not exist
          if (codecPayload > 0) {
            if (
              !media.fmtp.some((fmtp): boolean => {
                if (fmtp.payload === codecPayload) {
                  if (!fmtp.config.includes('x-google-max-bitrate')) {
                    fmtp.config += `;x-google-max-bitrate=${trackbr.maxbr}`;
                  }
                  return true;
                }
                return false;
              })
            ) {
              media.fmtp.push({
                payload: codecPayload,
                config: `x-google-max-bitrate=${trackbr.maxbr}`,
              });
            }
          }

          return true;
        });
      }
    });

    this.trackBitrates = [];

    await this.setMungedLocalDescription(offer, write(sdpParsed));
    this.onOffer(offer);
  }

  async createAndSetAnswer(): Promise<RTCSessionDescriptionInit> {
    const answer = await this.pc.createAnswer();
    const sdpParsed = parse(answer.sdp ?? '');
    sdpParsed.media.forEach((media) => {
      if (media.type === 'audio') {
        ensureAudioNack(media);
        if (this.forceStereoAudioSupport) {
          ensureStereoAudio(media);
        }
      }
    });
    await this.setMungedLocalDescription(answer, write(sdpParsed));
    return answer;
  }

  setTrackCodecBitrate(sid: string, codec: string, maxbr: number) {
    this.trackBitrates.push({
      sid,
      codec,
      maxbr,
    });
  }

  close() {
    this.pc.close();
  }

  private async setMungedLocalDescription(sd: RTCSessionDescriptionInit, munged: string) {
    const originalSdp = sd.sdp;
    sd.sdp = munged;
    try {
      log.debug('setting munged local description');
      await this.pc.setLocalDescription(sd);
      return;
    } catch (e) {
      log.warn(`not able to set ${sd.type}, falling back to unmodified sdp`, {
        error: e,
      });
      sd.sdp = originalSdp;
    }

    try {
      await this.pc.setLocalDescription(sd);
    } catch (e) {
      // this error cannot always be caught.
      // If the local description has a setCodecPreferences error, this error will be uncaught
      let msg = 'unknown error';
      if (e instanceof Error) {
        msg = e.message;
      } else if (typeof e === 'string') {
        msg = e;
      }
      throw new NegotiationError(msg);
    }
  }
}

function ensureAudioNack(
  media: {
    type: string;
    port: number;
    protocol: string;
    payloads?: string | undefined;
  } & MediaDescription,
) {
  // found opus codec to add nack fb
  let opusPayload = 0;
  media.rtp.some((rtp): boolean => {
    if (rtp.codec === 'opus') {
      opusPayload = rtp.payload;
      return true;
    }
    return false;
  });

  // add nack rtcpfb if not exist
  if (opusPayload > 0) {
    if (!media.rtcpFb) {
      media.rtcpFb = [];
    }

    if (!media.rtcpFb.some((fb) => fb.payload === opusPayload && fb.type === 'nack')) {
      media.rtcpFb.push({
        payload: opusPayload,
        type: 'nack',
      });
    }
  }
}

function ensureStereoAudio(media: MediaDescription) {
  for (const attributes of media.fmtp) {
    if (attributes.payload == 111 && !attributes.config.includes('stereo=')) {
      attributes.config += ';stereo=1';
    }
  }
}
