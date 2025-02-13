import _m0 from "protobufjs/minimal";
import { ClientConfiguration, ConnectionQuality, DisconnectReason, ParticipantInfo, ParticipantTracks, Room, ServerInfo, SpeakerInfo, TrackInfo, TrackSource, TrackType, VideoLayer, VideoQuality } from "./livekit_models";
export declare const protobufPackage = "livekit";
export declare enum SignalTarget {
    PUBLISHER = 0,
    SUBSCRIBER = 1,
    UNRECOGNIZED = -1
}
export declare function signalTargetFromJSON(object: any): SignalTarget;
export declare function signalTargetToJSON(object: SignalTarget): string;
export declare enum StreamState {
    ACTIVE = 0,
    PAUSED = 1,
    UNRECOGNIZED = -1
}
export declare function streamStateFromJSON(object: any): StreamState;
export declare function streamStateToJSON(object: StreamState): string;
export declare enum CandidateProtocol {
    UDP = 0,
    TCP = 1,
    TLS = 2,
    UNRECOGNIZED = -1
}
export declare function candidateProtocolFromJSON(object: any): CandidateProtocol;
export declare function candidateProtocolToJSON(object: CandidateProtocol): string;
export interface SignalRequest {
    message?: {
        $case: "offer";
        offer: SessionDescription;
    } | {
        $case: "answer";
        answer: SessionDescription;
    } | {
        $case: "trickle";
        trickle: TrickleRequest;
    } | {
        $case: "addTrack";
        addTrack: AddTrackRequest;
    } | {
        $case: "mute";
        mute: MuteTrackRequest;
    } | {
        $case: "subscription";
        subscription: UpdateSubscription;
    } | {
        $case: "trackSetting";
        trackSetting: UpdateTrackSettings;
    } | {
        $case: "leave";
        leave: LeaveRequest;
    } | {
        $case: "updateLayers";
        updateLayers: UpdateVideoLayers;
    } | {
        $case: "subscriptionPermission";
        subscriptionPermission: SubscriptionPermission;
    } | {
        $case: "syncState";
        syncState: SyncState;
    } | {
        $case: "simulate";
        simulate: SimulateScenario;
    } | {
        $case: "ping";
        ping: number;
    };
}
export interface SignalResponse {
    message?: {
        $case: "join";
        join: JoinResponse;
    } | {
        $case: "answer";
        answer: SessionDescription;
    } | {
        $case: "offer";
        offer: SessionDescription;
    } | {
        $case: "trickle";
        trickle: TrickleRequest;
    } | {
        $case: "update";
        update: ParticipantUpdate;
    } | {
        $case: "trackPublished";
        trackPublished: TrackPublishedResponse;
    } | {
        $case: "leave";
        leave: LeaveRequest;
    } | {
        $case: "mute";
        mute: MuteTrackRequest;
    } | {
        $case: "speakersChanged";
        speakersChanged: SpeakersChanged;
    } | {
        $case: "roomUpdate";
        roomUpdate: RoomUpdate;
    } | {
        $case: "connectionQuality";
        connectionQuality: ConnectionQualityUpdate;
    } | {
        $case: "streamStateUpdate";
        streamStateUpdate: StreamStateUpdate;
    } | {
        $case: "subscribedQualityUpdate";
        subscribedQualityUpdate: SubscribedQualityUpdate;
    } | {
        $case: "subscriptionPermissionUpdate";
        subscriptionPermissionUpdate: SubscriptionPermissionUpdate;
    } | {
        $case: "refreshToken";
        refreshToken: string;
    } | {
        $case: "trackUnpublished";
        trackUnpublished: TrackUnpublishedResponse;
    } | {
        $case: "pong";
        pong: number;
    };
}
export interface SimulcastCodec {
    codec: string;
    cid: string;
    enableSimulcastLayers: boolean;
}
export interface AddTrackRequest {
    /** client ID of track, to match it when RTC track is received */
    cid: string;
    name: string;
    type: TrackType;
    /** to be deprecated in favor of layers */
    width: number;
    height: number;
    /** true to add track and initialize to muted */
    muted: boolean;
    /** true if DTX (Discontinuous Transmission) is disabled for audio */
    disableDtx: boolean;
    source: TrackSource;
    layers: VideoLayer[];
    simulcastCodecs: SimulcastCodec[];
    /** server ID of track, publish new codec to exist track */
    sid: string;
}
export interface TrickleRequest {
    candidateInit: string;
    target: SignalTarget;
}
export interface MuteTrackRequest {
    sid: string;
    muted: boolean;
}
export interface JoinResponse {
    room?: Room;
    participant?: ParticipantInfo;
    otherParticipants: ParticipantInfo[];
    /** deprecated. use server_info.version instead. */
    serverVersion: string;
    iceServers: ICEServer[];
    /** use subscriber as the primary PeerConnection */
    subscriberPrimary: boolean;
    /**
     * when the current server isn't available, return alternate url to retry connection
     * when this is set, the other fields will be largely empty
     */
    alternativeUrl: string;
    clientConfiguration?: ClientConfiguration;
    /** deprecated. use server_info.region instead. */
    serverRegion: string;
    pingTimeout: number;
    pingInterval: number;
    serverInfo?: ServerInfo;
}
export interface TrackPublishedResponse {
    cid: string;
    track?: TrackInfo;
}
export interface TrackUnpublishedResponse {
    trackSid: string;
}
export interface SessionDescription {
    /** "answer" | "offer" | "pranswer" | "rollback" */
    type: string;
    sdp: string;
}
export interface ParticipantUpdate {
    participants: ParticipantInfo[];
}
export interface UpdateSubscription {
    trackSids: string[];
    subscribe: boolean;
    participantTracks: ParticipantTracks[];
}
export interface UpdateTrackSettings {
    trackSids: string[];
    /** when true, the track is placed in a paused state, with no new data returned */
    disabled: boolean;
    /** deprecated in favor of width & height */
    quality: VideoQuality;
    /** for video, width to receive */
    width: number;
    /** for video, height to receive */
    height: number;
}
export interface LeaveRequest {
    /**
     * sent when server initiates the disconnect due to server-restart
     * indicates clients should attempt full-reconnect sequence
     */
    canReconnect: boolean;
    reason: DisconnectReason;
}
/** message to indicate published video track dimensions are changing */
export interface UpdateVideoLayers {
    trackSid: string;
    layers: VideoLayer[];
}
export interface ICEServer {
    urls: string[];
    username: string;
    credential: string;
}
export interface SpeakersChanged {
    speakers: SpeakerInfo[];
}
export interface RoomUpdate {
    room?: Room;
}
export interface ConnectionQualityInfo {
    participantSid: string;
    quality: ConnectionQuality;
    score: number;
}
export interface ConnectionQualityUpdate {
    updates: ConnectionQualityInfo[];
}
export interface StreamStateInfo {
    participantSid: string;
    trackSid: string;
    state: StreamState;
}
export interface StreamStateUpdate {
    streamStates: StreamStateInfo[];
}
export interface SubscribedQuality {
    quality: VideoQuality;
    enabled: boolean;
}
export interface SubscribedCodec {
    codec: string;
    qualities: SubscribedQuality[];
}
export interface SubscribedQualityUpdate {
    trackSid: string;
    subscribedQualities: SubscribedQuality[];
    subscribedCodecs: SubscribedCodec[];
}
export interface TrackPermission {
    /** permission could be granted either by participant sid or identity */
    participantSid: string;
    allTracks: boolean;
    trackSids: string[];
    participantIdentity: string;
}
export interface SubscriptionPermission {
    allParticipants: boolean;
    trackPermissions: TrackPermission[];
}
export interface SubscriptionPermissionUpdate {
    participantSid: string;
    trackSid: string;
    allowed: boolean;
}
export interface SyncState {
    /** last subscribe answer before reconnecting */
    answer?: SessionDescription;
    subscription?: UpdateSubscription;
    publishTracks: TrackPublishedResponse[];
    dataChannels: DataChannelInfo[];
    /** last received server side offer before reconnecting */
    offer?: SessionDescription;
}
export interface DataChannelInfo {
    label: string;
    id: number;
    target: SignalTarget;
}
export interface SimulateScenario {
    scenario?: {
        $case: "speakerUpdate";
        speakerUpdate: number;
    } | {
        $case: "nodeFailure";
        nodeFailure: boolean;
    } | {
        $case: "migration";
        migration: boolean;
    } | {
        $case: "serverLeave";
        serverLeave: boolean;
    } | {
        $case: "switchCandidateProtocol";
        switchCandidateProtocol: CandidateProtocol;
    };
}
export declare const SignalRequest: {
    encode(message: SignalRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignalRequest;
    fromJSON(object: any): SignalRequest;
    toJSON(message: SignalRequest): unknown;
    fromPartial<I extends {
        message?: ({
            offer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "offer";
        }) | ({
            answer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "answer";
        }) | ({
            trickle?: {
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } | undefined;
        } & {
            $case: "trickle";
        }) | ({
            addTrack?: {
                cid?: string | undefined;
                name?: string | undefined;
                type?: TrackType | undefined;
                width?: number | undefined;
                height?: number | undefined;
                muted?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                simulcastCodecs?: {
                    codec?: string | undefined;
                    cid?: string | undefined;
                    enableSimulcastLayers?: boolean | undefined;
                }[] | undefined;
                sid?: string | undefined;
            } | undefined;
        } & {
            $case: "addTrack";
        }) | ({
            mute?: {
                sid?: string | undefined;
                muted?: boolean | undefined;
            } | undefined;
        } & {
            $case: "mute";
        }) | ({
            subscription?: {
                trackSids?: string[] | undefined;
                subscribe?: boolean | undefined;
                participantTracks?: {
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "subscription";
        }) | ({
            trackSetting?: {
                trackSids?: string[] | undefined;
                disabled?: boolean | undefined;
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
        } & {
            $case: "trackSetting";
        }) | ({
            leave?: {
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } | undefined;
        } & {
            $case: "leave";
        }) | ({
            updateLayers?: {
                trackSid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "updateLayers";
        }) | ({
            subscriptionPermission?: {
                allParticipants?: boolean | undefined;
                trackPermissions?: {
                    participantSid?: string | undefined;
                    allTracks?: boolean | undefined;
                    trackSids?: string[] | undefined;
                    participantIdentity?: string | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "subscriptionPermission";
        }) | ({
            syncState?: {
                answer?: {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } | undefined;
                subscription?: {
                    trackSids?: string[] | undefined;
                    subscribe?: boolean | undefined;
                    participantTracks?: {
                        participantSid?: string | undefined;
                        trackSids?: string[] | undefined;
                    }[] | undefined;
                } | undefined;
                publishTracks?: {
                    cid?: string | undefined;
                    track?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    } | undefined;
                }[] | undefined;
                dataChannels?: {
                    label?: string | undefined;
                    id?: number | undefined;
                    target?: SignalTarget | undefined;
                }[] | undefined;
                offer?: {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "syncState";
        }) | ({
            simulate?: {
                scenario?: ({
                    speakerUpdate?: number | undefined;
                } & {
                    $case: "speakerUpdate";
                }) | ({
                    nodeFailure?: boolean | undefined;
                } & {
                    $case: "nodeFailure";
                }) | ({
                    migration?: boolean | undefined;
                } & {
                    $case: "migration";
                }) | ({
                    serverLeave?: boolean | undefined;
                } & {
                    $case: "serverLeave";
                }) | ({
                    switchCandidateProtocol?: CandidateProtocol | undefined;
                } & {
                    $case: "switchCandidateProtocol";
                }) | undefined;
            } | undefined;
        } & {
            $case: "simulate";
        }) | ({
            ping?: number | undefined;
        } & {
            $case: "ping";
        }) | undefined;
    } & {
        message?: ({
            offer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "offer";
        } & {
            offer?: ({
                type?: string | undefined;
                sdp?: string | undefined;
            } & {
                type?: string | undefined;
                sdp?: string | undefined;
            } & { [K in Exclude<keyof I["message"]["offer"], keyof SessionDescription>]: never; }) | undefined;
            $case: "offer";
        } & { [K_1 in Exclude<keyof I["message"], "offer" | "$case">]: never; }) | ({
            answer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "answer";
        } & {
            answer?: ({
                type?: string | undefined;
                sdp?: string | undefined;
            } & {
                type?: string | undefined;
                sdp?: string | undefined;
            } & { [K_2 in Exclude<keyof I["message"]["answer"], keyof SessionDescription>]: never; }) | undefined;
            $case: "answer";
        } & { [K_3 in Exclude<keyof I["message"], "answer" | "$case">]: never; }) | ({
            trickle?: {
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } | undefined;
        } & {
            $case: "trickle";
        } & {
            trickle?: ({
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } & {
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } & { [K_4 in Exclude<keyof I["message"]["trickle"], keyof TrickleRequest>]: never; }) | undefined;
            $case: "trickle";
        } & { [K_5 in Exclude<keyof I["message"], "trickle" | "$case">]: never; }) | ({
            addTrack?: {
                cid?: string | undefined;
                name?: string | undefined;
                type?: TrackType | undefined;
                width?: number | undefined;
                height?: number | undefined;
                muted?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                simulcastCodecs?: {
                    codec?: string | undefined;
                    cid?: string | undefined;
                    enableSimulcastLayers?: boolean | undefined;
                }[] | undefined;
                sid?: string | undefined;
            } | undefined;
        } & {
            $case: "addTrack";
        } & {
            addTrack?: ({
                cid?: string | undefined;
                name?: string | undefined;
                type?: TrackType | undefined;
                width?: number | undefined;
                height?: number | undefined;
                muted?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                simulcastCodecs?: {
                    codec?: string | undefined;
                    cid?: string | undefined;
                    enableSimulcastLayers?: boolean | undefined;
                }[] | undefined;
                sid?: string | undefined;
            } & {
                cid?: string | undefined;
                name?: string | undefined;
                type?: TrackType | undefined;
                width?: number | undefined;
                height?: number | undefined;
                muted?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & { [K_6 in Exclude<keyof I["message"]["addTrack"]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_7 in Exclude<keyof I["message"]["addTrack"]["layers"], keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>]: never; }) | undefined;
                simulcastCodecs?: ({
                    codec?: string | undefined;
                    cid?: string | undefined;
                    enableSimulcastLayers?: boolean | undefined;
                }[] & ({
                    codec?: string | undefined;
                    cid?: string | undefined;
                    enableSimulcastLayers?: boolean | undefined;
                } & {
                    codec?: string | undefined;
                    cid?: string | undefined;
                    enableSimulcastLayers?: boolean | undefined;
                } & { [K_8 in Exclude<keyof I["message"]["addTrack"]["simulcastCodecs"][number], keyof SimulcastCodec>]: never; })[] & { [K_9 in Exclude<keyof I["message"]["addTrack"]["simulcastCodecs"], keyof {
                    codec?: string | undefined;
                    cid?: string | undefined;
                    enableSimulcastLayers?: boolean | undefined;
                }[]>]: never; }) | undefined;
                sid?: string | undefined;
            } & { [K_10 in Exclude<keyof I["message"]["addTrack"], keyof AddTrackRequest>]: never; }) | undefined;
            $case: "addTrack";
        } & { [K_11 in Exclude<keyof I["message"], "addTrack" | "$case">]: never; }) | ({
            mute?: {
                sid?: string | undefined;
                muted?: boolean | undefined;
            } | undefined;
        } & {
            $case: "mute";
        } & {
            mute?: ({
                sid?: string | undefined;
                muted?: boolean | undefined;
            } & {
                sid?: string | undefined;
                muted?: boolean | undefined;
            } & { [K_12 in Exclude<keyof I["message"]["mute"], keyof MuteTrackRequest>]: never; }) | undefined;
            $case: "mute";
        } & { [K_13 in Exclude<keyof I["message"], "mute" | "$case">]: never; }) | ({
            subscription?: {
                trackSids?: string[] | undefined;
                subscribe?: boolean | undefined;
                participantTracks?: {
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "subscription";
        } & {
            subscription?: ({
                trackSids?: string[] | undefined;
                subscribe?: boolean | undefined;
                participantTracks?: {
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                }[] | undefined;
            } & {
                trackSids?: (string[] & string[] & { [K_14 in Exclude<keyof I["message"]["subscription"]["trackSids"], keyof string[]>]: never; }) | undefined;
                subscribe?: boolean | undefined;
                participantTracks?: ({
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                }[] & ({
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                } & {
                    participantSid?: string | undefined;
                    trackSids?: (string[] & string[] & { [K_15 in Exclude<keyof I["message"]["subscription"]["participantTracks"][number]["trackSids"], keyof string[]>]: never; }) | undefined;
                } & { [K_16 in Exclude<keyof I["message"]["subscription"]["participantTracks"][number], keyof ParticipantTracks>]: never; })[] & { [K_17 in Exclude<keyof I["message"]["subscription"]["participantTracks"], keyof {
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_18 in Exclude<keyof I["message"]["subscription"], keyof UpdateSubscription>]: never; }) | undefined;
            $case: "subscription";
        } & { [K_19 in Exclude<keyof I["message"], "subscription" | "$case">]: never; }) | ({
            trackSetting?: {
                trackSids?: string[] | undefined;
                disabled?: boolean | undefined;
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
            } | undefined;
        } & {
            $case: "trackSetting";
        } & {
            trackSetting?: ({
                trackSids?: string[] | undefined;
                disabled?: boolean | undefined;
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
            } & {
                trackSids?: (string[] & string[] & { [K_20 in Exclude<keyof I["message"]["trackSetting"]["trackSids"], keyof string[]>]: never; }) | undefined;
                disabled?: boolean | undefined;
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
            } & { [K_21 in Exclude<keyof I["message"]["trackSetting"], keyof UpdateTrackSettings>]: never; }) | undefined;
            $case: "trackSetting";
        } & { [K_22 in Exclude<keyof I["message"], "trackSetting" | "$case">]: never; }) | ({
            leave?: {
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } | undefined;
        } & {
            $case: "leave";
        } & {
            leave?: ({
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } & {
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } & { [K_23 in Exclude<keyof I["message"]["leave"], keyof LeaveRequest>]: never; }) | undefined;
            $case: "leave";
        } & { [K_24 in Exclude<keyof I["message"], "leave" | "$case">]: never; }) | ({
            updateLayers?: {
                trackSid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "updateLayers";
        } & {
            updateLayers?: ({
                trackSid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            } & {
                trackSid?: string | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & { [K_25 in Exclude<keyof I["message"]["updateLayers"]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_26 in Exclude<keyof I["message"]["updateLayers"]["layers"], keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_27 in Exclude<keyof I["message"]["updateLayers"], keyof UpdateVideoLayers>]: never; }) | undefined;
            $case: "updateLayers";
        } & { [K_28 in Exclude<keyof I["message"], "updateLayers" | "$case">]: never; }) | ({
            subscriptionPermission?: {
                allParticipants?: boolean | undefined;
                trackPermissions?: {
                    participantSid?: string | undefined;
                    allTracks?: boolean | undefined;
                    trackSids?: string[] | undefined;
                    participantIdentity?: string | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "subscriptionPermission";
        } & {
            subscriptionPermission?: ({
                allParticipants?: boolean | undefined;
                trackPermissions?: {
                    participantSid?: string | undefined;
                    allTracks?: boolean | undefined;
                    trackSids?: string[] | undefined;
                    participantIdentity?: string | undefined;
                }[] | undefined;
            } & {
                allParticipants?: boolean | undefined;
                trackPermissions?: ({
                    participantSid?: string | undefined;
                    allTracks?: boolean | undefined;
                    trackSids?: string[] | undefined;
                    participantIdentity?: string | undefined;
                }[] & ({
                    participantSid?: string | undefined;
                    allTracks?: boolean | undefined;
                    trackSids?: string[] | undefined;
                    participantIdentity?: string | undefined;
                } & {
                    participantSid?: string | undefined;
                    allTracks?: boolean | undefined;
                    trackSids?: (string[] & string[] & { [K_29 in Exclude<keyof I["message"]["subscriptionPermission"]["trackPermissions"][number]["trackSids"], keyof string[]>]: never; }) | undefined;
                    participantIdentity?: string | undefined;
                } & { [K_30 in Exclude<keyof I["message"]["subscriptionPermission"]["trackPermissions"][number], keyof TrackPermission>]: never; })[] & { [K_31 in Exclude<keyof I["message"]["subscriptionPermission"]["trackPermissions"], keyof {
                    participantSid?: string | undefined;
                    allTracks?: boolean | undefined;
                    trackSids?: string[] | undefined;
                    participantIdentity?: string | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_32 in Exclude<keyof I["message"]["subscriptionPermission"], keyof SubscriptionPermission>]: never; }) | undefined;
            $case: "subscriptionPermission";
        } & { [K_33 in Exclude<keyof I["message"], "subscriptionPermission" | "$case">]: never; }) | ({
            syncState?: {
                answer?: {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } | undefined;
                subscription?: {
                    trackSids?: string[] | undefined;
                    subscribe?: boolean | undefined;
                    participantTracks?: {
                        participantSid?: string | undefined;
                        trackSids?: string[] | undefined;
                    }[] | undefined;
                } | undefined;
                publishTracks?: {
                    cid?: string | undefined;
                    track?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    } | undefined;
                }[] | undefined;
                dataChannels?: {
                    label?: string | undefined;
                    id?: number | undefined;
                    target?: SignalTarget | undefined;
                }[] | undefined;
                offer?: {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "syncState";
        } & {
            syncState?: ({
                answer?: {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } | undefined;
                subscription?: {
                    trackSids?: string[] | undefined;
                    subscribe?: boolean | undefined;
                    participantTracks?: {
                        participantSid?: string | undefined;
                        trackSids?: string[] | undefined;
                    }[] | undefined;
                } | undefined;
                publishTracks?: {
                    cid?: string | undefined;
                    track?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    } | undefined;
                }[] | undefined;
                dataChannels?: {
                    label?: string | undefined;
                    id?: number | undefined;
                    target?: SignalTarget | undefined;
                }[] | undefined;
                offer?: {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } | undefined;
            } & {
                answer?: ({
                    type?: string | undefined;
                    sdp?: string | undefined;
                } & {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } & { [K_34 in Exclude<keyof I["message"]["syncState"]["answer"], keyof SessionDescription>]: never; }) | undefined;
                subscription?: ({
                    trackSids?: string[] | undefined;
                    subscribe?: boolean | undefined;
                    participantTracks?: {
                        participantSid?: string | undefined;
                        trackSids?: string[] | undefined;
                    }[] | undefined;
                } & {
                    trackSids?: (string[] & string[] & { [K_35 in Exclude<keyof I["message"]["syncState"]["subscription"]["trackSids"], keyof string[]>]: never; }) | undefined;
                    subscribe?: boolean | undefined;
                    participantTracks?: ({
                        participantSid?: string | undefined;
                        trackSids?: string[] | undefined;
                    }[] & ({
                        participantSid?: string | undefined;
                        trackSids?: string[] | undefined;
                    } & {
                        participantSid?: string | undefined;
                        trackSids?: (string[] & string[] & { [K_36 in Exclude<keyof I["message"]["syncState"]["subscription"]["participantTracks"][number]["trackSids"], keyof string[]>]: never; }) | undefined;
                    } & { [K_37 in Exclude<keyof I["message"]["syncState"]["subscription"]["participantTracks"][number], keyof ParticipantTracks>]: never; })[] & { [K_38 in Exclude<keyof I["message"]["syncState"]["subscription"]["participantTracks"], keyof {
                        participantSid?: string | undefined;
                        trackSids?: string[] | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_39 in Exclude<keyof I["message"]["syncState"]["subscription"], keyof UpdateSubscription>]: never; }) | undefined;
                publishTracks?: ({
                    cid?: string | undefined;
                    track?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    } | undefined;
                }[] & ({
                    cid?: string | undefined;
                    track?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    } | undefined;
                } & {
                    cid?: string | undefined;
                    track?: ({
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    } & {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] & ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & { [K_40 in Exclude<keyof I["message"]["syncState"]["publishTracks"][number]["track"]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_41 in Exclude<keyof I["message"]["syncState"]["publishTracks"][number]["track"]["layers"], keyof {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[]>]: never; }) | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] & ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        } & {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] & ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & { [K_42 in Exclude<keyof I["message"]["syncState"]["publishTracks"][number]["track"]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_43 in Exclude<keyof I["message"]["syncState"]["publishTracks"][number]["track"]["codecs"][number]["layers"], keyof {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[]>]: never; }) | undefined;
                        } & { [K_44 in Exclude<keyof I["message"]["syncState"]["publishTracks"][number]["track"]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_45 in Exclude<keyof I["message"]["syncState"]["publishTracks"][number]["track"]["codecs"], keyof {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[]>]: never; }) | undefined;
                    } & { [K_46 in Exclude<keyof I["message"]["syncState"]["publishTracks"][number]["track"], keyof TrackInfo>]: never; }) | undefined;
                } & { [K_47 in Exclude<keyof I["message"]["syncState"]["publishTracks"][number], keyof TrackPublishedResponse>]: never; })[] & { [K_48 in Exclude<keyof I["message"]["syncState"]["publishTracks"], keyof {
                    cid?: string | undefined;
                    track?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    } | undefined;
                }[]>]: never; }) | undefined;
                dataChannels?: ({
                    label?: string | undefined;
                    id?: number | undefined;
                    target?: SignalTarget | undefined;
                }[] & ({
                    label?: string | undefined;
                    id?: number | undefined;
                    target?: SignalTarget | undefined;
                } & {
                    label?: string | undefined;
                    id?: number | undefined;
                    target?: SignalTarget | undefined;
                } & { [K_49 in Exclude<keyof I["message"]["syncState"]["dataChannels"][number], keyof DataChannelInfo>]: never; })[] & { [K_50 in Exclude<keyof I["message"]["syncState"]["dataChannels"], keyof {
                    label?: string | undefined;
                    id?: number | undefined;
                    target?: SignalTarget | undefined;
                }[]>]: never; }) | undefined;
                offer?: ({
                    type?: string | undefined;
                    sdp?: string | undefined;
                } & {
                    type?: string | undefined;
                    sdp?: string | undefined;
                } & { [K_51 in Exclude<keyof I["message"]["syncState"]["offer"], keyof SessionDescription>]: never; }) | undefined;
            } & { [K_52 in Exclude<keyof I["message"]["syncState"], keyof SyncState>]: never; }) | undefined;
            $case: "syncState";
        } & { [K_53 in Exclude<keyof I["message"], "syncState" | "$case">]: never; }) | ({
            simulate?: {
                scenario?: ({
                    speakerUpdate?: number | undefined;
                } & {
                    $case: "speakerUpdate";
                }) | ({
                    nodeFailure?: boolean | undefined;
                } & {
                    $case: "nodeFailure";
                }) | ({
                    migration?: boolean | undefined;
                } & {
                    $case: "migration";
                }) | ({
                    serverLeave?: boolean | undefined;
                } & {
                    $case: "serverLeave";
                }) | ({
                    switchCandidateProtocol?: CandidateProtocol | undefined;
                } & {
                    $case: "switchCandidateProtocol";
                }) | undefined;
            } | undefined;
        } & {
            $case: "simulate";
        } & {
            simulate?: ({
                scenario?: ({
                    speakerUpdate?: number | undefined;
                } & {
                    $case: "speakerUpdate";
                }) | ({
                    nodeFailure?: boolean | undefined;
                } & {
                    $case: "nodeFailure";
                }) | ({
                    migration?: boolean | undefined;
                } & {
                    $case: "migration";
                }) | ({
                    serverLeave?: boolean | undefined;
                } & {
                    $case: "serverLeave";
                }) | ({
                    switchCandidateProtocol?: CandidateProtocol | undefined;
                } & {
                    $case: "switchCandidateProtocol";
                }) | undefined;
            } & {
                scenario?: ({
                    speakerUpdate?: number | undefined;
                } & {
                    $case: "speakerUpdate";
                } & {
                    speakerUpdate?: number | undefined;
                    $case: "speakerUpdate";
                } & { [K_54 in Exclude<keyof I["message"]["simulate"]["scenario"], "speakerUpdate" | "$case">]: never; }) | ({
                    nodeFailure?: boolean | undefined;
                } & {
                    $case: "nodeFailure";
                } & {
                    nodeFailure?: boolean | undefined;
                    $case: "nodeFailure";
                } & { [K_55 in Exclude<keyof I["message"]["simulate"]["scenario"], "nodeFailure" | "$case">]: never; }) | ({
                    migration?: boolean | undefined;
                } & {
                    $case: "migration";
                } & {
                    migration?: boolean | undefined;
                    $case: "migration";
                } & { [K_56 in Exclude<keyof I["message"]["simulate"]["scenario"], "migration" | "$case">]: never; }) | ({
                    serverLeave?: boolean | undefined;
                } & {
                    $case: "serverLeave";
                } & {
                    serverLeave?: boolean | undefined;
                    $case: "serverLeave";
                } & { [K_57 in Exclude<keyof I["message"]["simulate"]["scenario"], "serverLeave" | "$case">]: never; }) | ({
                    switchCandidateProtocol?: CandidateProtocol | undefined;
                } & {
                    $case: "switchCandidateProtocol";
                } & {
                    switchCandidateProtocol?: CandidateProtocol | undefined;
                    $case: "switchCandidateProtocol";
                } & { [K_58 in Exclude<keyof I["message"]["simulate"]["scenario"], "switchCandidateProtocol" | "$case">]: never; }) | undefined;
            } & { [K_59 in Exclude<keyof I["message"]["simulate"], "scenario">]: never; }) | undefined;
            $case: "simulate";
        } & { [K_60 in Exclude<keyof I["message"], "simulate" | "$case">]: never; }) | ({
            ping?: number | undefined;
        } & {
            $case: "ping";
        } & {
            ping?: number | undefined;
            $case: "ping";
        } & { [K_61 in Exclude<keyof I["message"], "ping" | "$case">]: never; }) | undefined;
    } & { [K_62 in Exclude<keyof I, "message">]: never; }>(object: I): SignalRequest;
};
export declare const SignalResponse: {
    encode(message: SignalResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignalResponse;
    fromJSON(object: any): SignalResponse;
    toJSON(message: SignalResponse): unknown;
    fromPartial<I extends {
        message?: ({
            join?: {
                room?: {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    activeRecording?: boolean | undefined;
                } | undefined;
                participant?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } | undefined;
                otherParticipants?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] | undefined;
                serverVersion?: string | undefined;
                iceServers?: {
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[] | undefined;
                subscriberPrimary?: boolean | undefined;
                alternativeUrl?: string | undefined;
                clientConfiguration?: {
                    video?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    screen?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: {
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } | undefined;
                serverRegion?: string | undefined;
                pingTimeout?: number | undefined;
                pingInterval?: number | undefined;
                serverInfo?: {
                    edition?: import("./livekit_models").ServerInfo_Edition | undefined;
                    version?: string | undefined;
                    protocol?: number | undefined;
                    region?: string | undefined;
                    nodeId?: string | undefined;
                    debugInfo?: string | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "join";
        }) | ({
            answer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "answer";
        }) | ({
            offer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "offer";
        }) | ({
            trickle?: {
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } | undefined;
        } & {
            $case: "trickle";
        }) | ({
            update?: {
                participants?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "update";
        }) | ({
            trackPublished?: {
                cid?: string | undefined;
                track?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                    }[] | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "trackPublished";
        }) | ({
            leave?: {
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } | undefined;
        } & {
            $case: "leave";
        }) | ({
            mute?: {
                sid?: string | undefined;
                muted?: boolean | undefined;
            } | undefined;
        } & {
            $case: "mute";
        }) | ({
            speakersChanged?: {
                speakers?: {
                    sid?: string | undefined;
                    level?: number | undefined;
                    active?: boolean | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "speakersChanged";
        }) | ({
            roomUpdate?: {
                room?: {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    activeRecording?: boolean | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "roomUpdate";
        }) | ({
            connectionQuality?: {
                updates?: {
                    participantSid?: string | undefined;
                    quality?: ConnectionQuality | undefined;
                    score?: number | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "connectionQuality";
        }) | ({
            streamStateUpdate?: {
                streamStates?: {
                    participantSid?: string | undefined;
                    trackSid?: string | undefined;
                    state?: StreamState | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "streamStateUpdate";
        }) | ({
            subscribedQualityUpdate?: {
                trackSid?: string | undefined;
                subscribedQualities?: {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
                subscribedCodecs?: {
                    codec?: string | undefined;
                    qualities?: {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "subscribedQualityUpdate";
        }) | ({
            subscriptionPermissionUpdate?: {
                participantSid?: string | undefined;
                trackSid?: string | undefined;
                allowed?: boolean | undefined;
            } | undefined;
        } & {
            $case: "subscriptionPermissionUpdate";
        }) | ({
            refreshToken?: string | undefined;
        } & {
            $case: "refreshToken";
        }) | ({
            trackUnpublished?: {
                trackSid?: string | undefined;
            } | undefined;
        } & {
            $case: "trackUnpublished";
        }) | ({
            pong?: number | undefined;
        } & {
            $case: "pong";
        }) | undefined;
    } & {
        message?: ({
            join?: {
                room?: {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    activeRecording?: boolean | undefined;
                } | undefined;
                participant?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } | undefined;
                otherParticipants?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] | undefined;
                serverVersion?: string | undefined;
                iceServers?: {
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[] | undefined;
                subscriberPrimary?: boolean | undefined;
                alternativeUrl?: string | undefined;
                clientConfiguration?: {
                    video?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    screen?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: {
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } | undefined;
                serverRegion?: string | undefined;
                pingTimeout?: number | undefined;
                pingInterval?: number | undefined;
                serverInfo?: {
                    edition?: import("./livekit_models").ServerInfo_Edition | undefined;
                    version?: string | undefined;
                    protocol?: number | undefined;
                    region?: string | undefined;
                    nodeId?: string | undefined;
                    debugInfo?: string | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "join";
        } & {
            join?: ({
                room?: {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    activeRecording?: boolean | undefined;
                } | undefined;
                participant?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } | undefined;
                otherParticipants?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] | undefined;
                serverVersion?: string | undefined;
                iceServers?: {
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[] | undefined;
                subscriberPrimary?: boolean | undefined;
                alternativeUrl?: string | undefined;
                clientConfiguration?: {
                    video?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    screen?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: {
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } | undefined;
                serverRegion?: string | undefined;
                pingTimeout?: number | undefined;
                pingInterval?: number | undefined;
                serverInfo?: {
                    edition?: import("./livekit_models").ServerInfo_Edition | undefined;
                    version?: string | undefined;
                    protocol?: number | undefined;
                    region?: string | undefined;
                    nodeId?: string | undefined;
                    debugInfo?: string | undefined;
                } | undefined;
            } & {
                room?: ({
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    activeRecording?: boolean | undefined;
                } & {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: ({
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] & ({
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    } & {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    } & { [K in Exclude<keyof I["message"]["join"]["room"]["enabledCodecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_1 in Exclude<keyof I["message"]["join"]["room"]["enabledCodecs"], keyof {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[]>]: never; }) | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    activeRecording?: boolean | undefined;
                } & { [K_2 in Exclude<keyof I["message"]["join"]["room"], keyof Room>]: never; }) | undefined;
                participant?: ({
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } & {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: ({
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[] & ({
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    } & {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] & ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & { [K_3 in Exclude<keyof I["message"]["join"]["participant"]["tracks"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_4 in Exclude<keyof I["message"]["join"]["participant"]["tracks"][number]["layers"], keyof {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[]>]: never; }) | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] & ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        } & {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] & ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & { [K_5 in Exclude<keyof I["message"]["join"]["participant"]["tracks"][number]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_6 in Exclude<keyof I["message"]["join"]["participant"]["tracks"][number]["codecs"][number]["layers"], keyof {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[]>]: never; }) | undefined;
                        } & { [K_7 in Exclude<keyof I["message"]["join"]["participant"]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_8 in Exclude<keyof I["message"]["join"]["participant"]["tracks"][number]["codecs"], keyof {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[]>]: never; }) | undefined;
                    } & { [K_9 in Exclude<keyof I["message"]["join"]["participant"]["tracks"][number], keyof TrackInfo>]: never; })[] & { [K_10 in Exclude<keyof I["message"]["join"]["participant"]["tracks"], keyof {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[]>]: never; }) | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: ({
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } & {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } & { [K_11 in Exclude<keyof I["message"]["join"]["participant"]["permission"], keyof import("./livekit_models").ParticipantPermission>]: never; }) | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } & { [K_12 in Exclude<keyof I["message"]["join"]["participant"], keyof ParticipantInfo>]: never; }) | undefined;
                otherParticipants?: ({
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] & ({
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } & {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: ({
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[] & ({
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    } & {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] & ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & { [K_13 in Exclude<keyof I["message"]["join"]["otherParticipants"][number]["tracks"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_14 in Exclude<keyof I["message"]["join"]["otherParticipants"][number]["tracks"][number]["layers"], keyof {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[]>]: never; }) | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] & ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        } & {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] & ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & { [K_15 in Exclude<keyof I["message"]["join"]["otherParticipants"][number]["tracks"][number]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_16 in Exclude<keyof I["message"]["join"]["otherParticipants"][number]["tracks"][number]["codecs"][number]["layers"], keyof {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[]>]: never; }) | undefined;
                        } & { [K_17 in Exclude<keyof I["message"]["join"]["otherParticipants"][number]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_18 in Exclude<keyof I["message"]["join"]["otherParticipants"][number]["tracks"][number]["codecs"], keyof {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[]>]: never; }) | undefined;
                    } & { [K_19 in Exclude<keyof I["message"]["join"]["otherParticipants"][number]["tracks"][number], keyof TrackInfo>]: never; })[] & { [K_20 in Exclude<keyof I["message"]["join"]["otherParticipants"][number]["tracks"], keyof {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[]>]: never; }) | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: ({
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } & {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } & { [K_21 in Exclude<keyof I["message"]["join"]["otherParticipants"][number]["permission"], keyof import("./livekit_models").ParticipantPermission>]: never; }) | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } & { [K_22 in Exclude<keyof I["message"]["join"]["otherParticipants"][number], keyof ParticipantInfo>]: never; })[] & { [K_23 in Exclude<keyof I["message"]["join"]["otherParticipants"], keyof {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[]>]: never; }) | undefined;
                serverVersion?: string | undefined;
                iceServers?: ({
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[] & ({
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                } & {
                    urls?: (string[] & string[] & { [K_24 in Exclude<keyof I["message"]["join"]["iceServers"][number]["urls"], keyof string[]>]: never; }) | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                } & { [K_25 in Exclude<keyof I["message"]["join"]["iceServers"][number], keyof ICEServer>]: never; })[] & { [K_26 in Exclude<keyof I["message"]["join"]["iceServers"], keyof {
                    urls?: string[] | undefined;
                    username?: string | undefined;
                    credential?: string | undefined;
                }[]>]: never; }) | undefined;
                subscriberPrimary?: boolean | undefined;
                alternativeUrl?: string | undefined;
                clientConfiguration?: ({
                    video?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    screen?: {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: {
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } & {
                    video?: ({
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } & {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } & { [K_27 in Exclude<keyof I["message"]["join"]["clientConfiguration"]["video"], "hardwareEncoder">]: never; }) | undefined;
                    screen?: ({
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } & {
                        hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                    } & { [K_28 in Exclude<keyof I["message"]["join"]["clientConfiguration"]["screen"], "hardwareEncoder">]: never; }) | undefined;
                    resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
                    disabledCodecs?: ({
                        codecs?: {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] | undefined;
                    } & {
                        codecs?: ({
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[] & ({
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        } & {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        } & { [K_29 in Exclude<keyof I["message"]["join"]["clientConfiguration"]["disabledCodecs"]["codecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_30 in Exclude<keyof I["message"]["join"]["clientConfiguration"]["disabledCodecs"]["codecs"], keyof {
                            mime?: string | undefined;
                            fmtpLine?: string | undefined;
                        }[]>]: never; }) | undefined;
                    } & { [K_31 in Exclude<keyof I["message"]["join"]["clientConfiguration"]["disabledCodecs"], "codecs">]: never; }) | undefined;
                    forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
                } & { [K_32 in Exclude<keyof I["message"]["join"]["clientConfiguration"], keyof ClientConfiguration>]: never; }) | undefined;
                serverRegion?: string | undefined;
                pingTimeout?: number | undefined;
                pingInterval?: number | undefined;
                serverInfo?: ({
                    edition?: import("./livekit_models").ServerInfo_Edition | undefined;
                    version?: string | undefined;
                    protocol?: number | undefined;
                    region?: string | undefined;
                    nodeId?: string | undefined;
                    debugInfo?: string | undefined;
                } & {
                    edition?: import("./livekit_models").ServerInfo_Edition | undefined;
                    version?: string | undefined;
                    protocol?: number | undefined;
                    region?: string | undefined;
                    nodeId?: string | undefined;
                    debugInfo?: string | undefined;
                } & { [K_33 in Exclude<keyof I["message"]["join"]["serverInfo"], keyof ServerInfo>]: never; }) | undefined;
            } & { [K_34 in Exclude<keyof I["message"]["join"], keyof JoinResponse>]: never; }) | undefined;
            $case: "join";
        } & { [K_35 in Exclude<keyof I["message"], "join" | "$case">]: never; }) | ({
            answer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "answer";
        } & {
            answer?: ({
                type?: string | undefined;
                sdp?: string | undefined;
            } & {
                type?: string | undefined;
                sdp?: string | undefined;
            } & { [K_36 in Exclude<keyof I["message"]["answer"], keyof SessionDescription>]: never; }) | undefined;
            $case: "answer";
        } & { [K_37 in Exclude<keyof I["message"], "answer" | "$case">]: never; }) | ({
            offer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
        } & {
            $case: "offer";
        } & {
            offer?: ({
                type?: string | undefined;
                sdp?: string | undefined;
            } & {
                type?: string | undefined;
                sdp?: string | undefined;
            } & { [K_38 in Exclude<keyof I["message"]["offer"], keyof SessionDescription>]: never; }) | undefined;
            $case: "offer";
        } & { [K_39 in Exclude<keyof I["message"], "offer" | "$case">]: never; }) | ({
            trickle?: {
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } | undefined;
        } & {
            $case: "trickle";
        } & {
            trickle?: ({
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } & {
                candidateInit?: string | undefined;
                target?: SignalTarget | undefined;
            } & { [K_40 in Exclude<keyof I["message"]["trickle"], keyof TrickleRequest>]: never; }) | undefined;
            $case: "trickle";
        } & { [K_41 in Exclude<keyof I["message"], "trickle" | "$case">]: never; }) | ({
            update?: {
                participants?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "update";
        } & {
            update?: ({
                participants?: {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] | undefined;
            } & {
                participants?: ({
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[] & ({
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } & {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: ({
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[] & ({
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    } & {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] & ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & { [K_42 in Exclude<keyof I["message"]["update"]["participants"][number]["tracks"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_43 in Exclude<keyof I["message"]["update"]["participants"][number]["tracks"][number]["layers"], keyof {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[]>]: never; }) | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] & ({
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        } & {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] & ({
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            } & { [K_44 in Exclude<keyof I["message"]["update"]["participants"][number]["tracks"][number]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_45 in Exclude<keyof I["message"]["update"]["participants"][number]["tracks"][number]["codecs"][number]["layers"], keyof {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[]>]: never; }) | undefined;
                        } & { [K_46 in Exclude<keyof I["message"]["update"]["participants"][number]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_47 in Exclude<keyof I["message"]["update"]["participants"][number]["tracks"][number]["codecs"], keyof {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[]>]: never; }) | undefined;
                    } & { [K_48 in Exclude<keyof I["message"]["update"]["participants"][number]["tracks"][number], keyof TrackInfo>]: never; })[] & { [K_49 in Exclude<keyof I["message"]["update"]["participants"][number]["tracks"], keyof {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[]>]: never; }) | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: ({
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } & {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } & { [K_50 in Exclude<keyof I["message"]["update"]["participants"][number]["permission"], keyof import("./livekit_models").ParticipantPermission>]: never; }) | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                } & { [K_51 in Exclude<keyof I["message"]["update"]["participants"][number], keyof ParticipantInfo>]: never; })[] & { [K_52 in Exclude<keyof I["message"]["update"]["participants"], keyof {
                    sid?: string | undefined;
                    identity?: string | undefined;
                    state?: import("./livekit_models").ParticipantInfo_State | undefined;
                    tracks?: {
                        sid?: string | undefined;
                        type?: TrackType | undefined;
                        name?: string | undefined;
                        muted?: boolean | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        simulcast?: boolean | undefined;
                        disableDtx?: boolean | undefined;
                        source?: TrackSource | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        codecs?: {
                            mimeType?: string | undefined;
                            mid?: string | undefined;
                            cid?: string | undefined;
                            layers?: {
                                quality?: VideoQuality | undefined;
                                width?: number | undefined;
                                height?: number | undefined;
                                bitrate?: number | undefined;
                                ssrc?: number | undefined;
                            }[] | undefined;
                        }[] | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    joinedAt?: number | undefined;
                    name?: string | undefined;
                    version?: number | undefined;
                    permission?: {
                        canSubscribe?: boolean | undefined;
                        canPublish?: boolean | undefined;
                        canPublishData?: boolean | undefined;
                        hidden?: boolean | undefined;
                        recorder?: boolean | undefined;
                    } | undefined;
                    region?: string | undefined;
                    isPublisher?: boolean | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_53 in Exclude<keyof I["message"]["update"], "participants">]: never; }) | undefined;
            $case: "update";
        } & { [K_54 in Exclude<keyof I["message"], "update" | "$case">]: never; }) | ({
            trackPublished?: {
                cid?: string | undefined;
                track?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                    }[] | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "trackPublished";
        } & {
            trackPublished?: ({
                cid?: string | undefined;
                track?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                    }[] | undefined;
                } | undefined;
            } & {
                cid?: string | undefined;
                track?: ({
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                    }[] | undefined;
                } & {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & { [K_55 in Exclude<keyof I["message"]["trackPublished"]["track"]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_56 in Exclude<keyof I["message"]["trackPublished"]["track"]["layers"], keyof {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[]>]: never; }) | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: ({
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                    }[] & ({
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                    } & {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] & ({
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        } & { [K_57 in Exclude<keyof I["message"]["trackPublished"]["track"]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_58 in Exclude<keyof I["message"]["trackPublished"]["track"]["codecs"][number]["layers"], keyof {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[]>]: never; }) | undefined;
                    } & { [K_59 in Exclude<keyof I["message"]["trackPublished"]["track"]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_60 in Exclude<keyof I["message"]["trackPublished"]["track"]["codecs"], keyof {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                        layers?: {
                            quality?: VideoQuality | undefined;
                            width?: number | undefined;
                            height?: number | undefined;
                            bitrate?: number | undefined;
                            ssrc?: number | undefined;
                        }[] | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_61 in Exclude<keyof I["message"]["trackPublished"]["track"], keyof TrackInfo>]: never; }) | undefined;
            } & { [K_62 in Exclude<keyof I["message"]["trackPublished"], keyof TrackPublishedResponse>]: never; }) | undefined;
            $case: "trackPublished";
        } & { [K_63 in Exclude<keyof I["message"], "trackPublished" | "$case">]: never; }) | ({
            leave?: {
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } | undefined;
        } & {
            $case: "leave";
        } & {
            leave?: ({
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } & {
                canReconnect?: boolean | undefined;
                reason?: DisconnectReason | undefined;
            } & { [K_64 in Exclude<keyof I["message"]["leave"], keyof LeaveRequest>]: never; }) | undefined;
            $case: "leave";
        } & { [K_65 in Exclude<keyof I["message"], "leave" | "$case">]: never; }) | ({
            mute?: {
                sid?: string | undefined;
                muted?: boolean | undefined;
            } | undefined;
        } & {
            $case: "mute";
        } & {
            mute?: ({
                sid?: string | undefined;
                muted?: boolean | undefined;
            } & {
                sid?: string | undefined;
                muted?: boolean | undefined;
            } & { [K_66 in Exclude<keyof I["message"]["mute"], keyof MuteTrackRequest>]: never; }) | undefined;
            $case: "mute";
        } & { [K_67 in Exclude<keyof I["message"], "mute" | "$case">]: never; }) | ({
            speakersChanged?: {
                speakers?: {
                    sid?: string | undefined;
                    level?: number | undefined;
                    active?: boolean | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "speakersChanged";
        } & {
            speakersChanged?: ({
                speakers?: {
                    sid?: string | undefined;
                    level?: number | undefined;
                    active?: boolean | undefined;
                }[] | undefined;
            } & {
                speakers?: ({
                    sid?: string | undefined;
                    level?: number | undefined;
                    active?: boolean | undefined;
                }[] & ({
                    sid?: string | undefined;
                    level?: number | undefined;
                    active?: boolean | undefined;
                } & {
                    sid?: string | undefined;
                    level?: number | undefined;
                    active?: boolean | undefined;
                } & { [K_68 in Exclude<keyof I["message"]["speakersChanged"]["speakers"][number], keyof SpeakerInfo>]: never; })[] & { [K_69 in Exclude<keyof I["message"]["speakersChanged"]["speakers"], keyof {
                    sid?: string | undefined;
                    level?: number | undefined;
                    active?: boolean | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_70 in Exclude<keyof I["message"]["speakersChanged"], "speakers">]: never; }) | undefined;
            $case: "speakersChanged";
        } & { [K_71 in Exclude<keyof I["message"], "speakersChanged" | "$case">]: never; }) | ({
            roomUpdate?: {
                room?: {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    activeRecording?: boolean | undefined;
                } | undefined;
            } | undefined;
        } & {
            $case: "roomUpdate";
        } & {
            roomUpdate?: ({
                room?: {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    activeRecording?: boolean | undefined;
                } | undefined;
            } & {
                room?: ({
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    activeRecording?: boolean | undefined;
                } & {
                    sid?: string | undefined;
                    name?: string | undefined;
                    emptyTimeout?: number | undefined;
                    maxParticipants?: number | undefined;
                    creationTime?: number | undefined;
                    turnPassword?: string | undefined;
                    enabledCodecs?: ({
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[] & ({
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    } & {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    } & { [K_72 in Exclude<keyof I["message"]["roomUpdate"]["room"]["enabledCodecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_73 in Exclude<keyof I["message"]["roomUpdate"]["room"]["enabledCodecs"], keyof {
                        mime?: string | undefined;
                        fmtpLine?: string | undefined;
                    }[]>]: never; }) | undefined;
                    metadata?: string | undefined;
                    numParticipants?: number | undefined;
                    activeRecording?: boolean | undefined;
                } & { [K_74 in Exclude<keyof I["message"]["roomUpdate"]["room"], keyof Room>]: never; }) | undefined;
            } & { [K_75 in Exclude<keyof I["message"]["roomUpdate"], "room">]: never; }) | undefined;
            $case: "roomUpdate";
        } & { [K_76 in Exclude<keyof I["message"], "roomUpdate" | "$case">]: never; }) | ({
            connectionQuality?: {
                updates?: {
                    participantSid?: string | undefined;
                    quality?: ConnectionQuality | undefined;
                    score?: number | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "connectionQuality";
        } & {
            connectionQuality?: ({
                updates?: {
                    participantSid?: string | undefined;
                    quality?: ConnectionQuality | undefined;
                    score?: number | undefined;
                }[] | undefined;
            } & {
                updates?: ({
                    participantSid?: string | undefined;
                    quality?: ConnectionQuality | undefined;
                    score?: number | undefined;
                }[] & ({
                    participantSid?: string | undefined;
                    quality?: ConnectionQuality | undefined;
                    score?: number | undefined;
                } & {
                    participantSid?: string | undefined;
                    quality?: ConnectionQuality | undefined;
                    score?: number | undefined;
                } & { [K_77 in Exclude<keyof I["message"]["connectionQuality"]["updates"][number], keyof ConnectionQualityInfo>]: never; })[] & { [K_78 in Exclude<keyof I["message"]["connectionQuality"]["updates"], keyof {
                    participantSid?: string | undefined;
                    quality?: ConnectionQuality | undefined;
                    score?: number | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_79 in Exclude<keyof I["message"]["connectionQuality"], "updates">]: never; }) | undefined;
            $case: "connectionQuality";
        } & { [K_80 in Exclude<keyof I["message"], "connectionQuality" | "$case">]: never; }) | ({
            streamStateUpdate?: {
                streamStates?: {
                    participantSid?: string | undefined;
                    trackSid?: string | undefined;
                    state?: StreamState | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "streamStateUpdate";
        } & {
            streamStateUpdate?: ({
                streamStates?: {
                    participantSid?: string | undefined;
                    trackSid?: string | undefined;
                    state?: StreamState | undefined;
                }[] | undefined;
            } & {
                streamStates?: ({
                    participantSid?: string | undefined;
                    trackSid?: string | undefined;
                    state?: StreamState | undefined;
                }[] & ({
                    participantSid?: string | undefined;
                    trackSid?: string | undefined;
                    state?: StreamState | undefined;
                } & {
                    participantSid?: string | undefined;
                    trackSid?: string | undefined;
                    state?: StreamState | undefined;
                } & { [K_81 in Exclude<keyof I["message"]["streamStateUpdate"]["streamStates"][number], keyof StreamStateInfo>]: never; })[] & { [K_82 in Exclude<keyof I["message"]["streamStateUpdate"]["streamStates"], keyof {
                    participantSid?: string | undefined;
                    trackSid?: string | undefined;
                    state?: StreamState | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_83 in Exclude<keyof I["message"]["streamStateUpdate"], "streamStates">]: never; }) | undefined;
            $case: "streamStateUpdate";
        } & { [K_84 in Exclude<keyof I["message"], "streamStateUpdate" | "$case">]: never; }) | ({
            subscribedQualityUpdate?: {
                trackSid?: string | undefined;
                subscribedQualities?: {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
                subscribedCodecs?: {
                    codec?: string | undefined;
                    qualities?: {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            $case: "subscribedQualityUpdate";
        } & {
            subscribedQualityUpdate?: ({
                trackSid?: string | undefined;
                subscribedQualities?: {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
                subscribedCodecs?: {
                    codec?: string | undefined;
                    qualities?: {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
            } & {
                trackSid?: string | undefined;
                subscribedQualities?: ({
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                } & { [K_85 in Exclude<keyof I["message"]["subscribedQualityUpdate"]["subscribedQualities"][number], keyof SubscribedQuality>]: never; })[] & { [K_86 in Exclude<keyof I["message"]["subscribedQualityUpdate"]["subscribedQualities"], keyof {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[]>]: never; }) | undefined;
                subscribedCodecs?: ({
                    codec?: string | undefined;
                    qualities?: {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[] | undefined;
                }[] & ({
                    codec?: string | undefined;
                    qualities?: {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[] | undefined;
                } & {
                    codec?: string | undefined;
                    qualities?: ({
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    } & { [K_87 in Exclude<keyof I["message"]["subscribedQualityUpdate"]["subscribedCodecs"][number]["qualities"][number], keyof SubscribedQuality>]: never; })[] & { [K_88 in Exclude<keyof I["message"]["subscribedQualityUpdate"]["subscribedCodecs"][number]["qualities"], keyof {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_89 in Exclude<keyof I["message"]["subscribedQualityUpdate"]["subscribedCodecs"][number], keyof SubscribedCodec>]: never; })[] & { [K_90 in Exclude<keyof I["message"]["subscribedQualityUpdate"]["subscribedCodecs"], keyof {
                    codec?: string | undefined;
                    qualities?: {
                        quality?: VideoQuality | undefined;
                        enabled?: boolean | undefined;
                    }[] | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_91 in Exclude<keyof I["message"]["subscribedQualityUpdate"], keyof SubscribedQualityUpdate>]: never; }) | undefined;
            $case: "subscribedQualityUpdate";
        } & { [K_92 in Exclude<keyof I["message"], "subscribedQualityUpdate" | "$case">]: never; }) | ({
            subscriptionPermissionUpdate?: {
                participantSid?: string | undefined;
                trackSid?: string | undefined;
                allowed?: boolean | undefined;
            } | undefined;
        } & {
            $case: "subscriptionPermissionUpdate";
        } & {
            subscriptionPermissionUpdate?: ({
                participantSid?: string | undefined;
                trackSid?: string | undefined;
                allowed?: boolean | undefined;
            } & {
                participantSid?: string | undefined;
                trackSid?: string | undefined;
                allowed?: boolean | undefined;
            } & { [K_93 in Exclude<keyof I["message"]["subscriptionPermissionUpdate"], keyof SubscriptionPermissionUpdate>]: never; }) | undefined;
            $case: "subscriptionPermissionUpdate";
        } & { [K_94 in Exclude<keyof I["message"], "subscriptionPermissionUpdate" | "$case">]: never; }) | ({
            refreshToken?: string | undefined;
        } & {
            $case: "refreshToken";
        } & {
            refreshToken?: string | undefined;
            $case: "refreshToken";
        } & { [K_95 in Exclude<keyof I["message"], "refreshToken" | "$case">]: never; }) | ({
            trackUnpublished?: {
                trackSid?: string | undefined;
            } | undefined;
        } & {
            $case: "trackUnpublished";
        } & {
            trackUnpublished?: ({
                trackSid?: string | undefined;
            } & {
                trackSid?: string | undefined;
            } & { [K_96 in Exclude<keyof I["message"]["trackUnpublished"], "trackSid">]: never; }) | undefined;
            $case: "trackUnpublished";
        } & { [K_97 in Exclude<keyof I["message"], "trackUnpublished" | "$case">]: never; }) | ({
            pong?: number | undefined;
        } & {
            $case: "pong";
        } & {
            pong?: number | undefined;
            $case: "pong";
        } & { [K_98 in Exclude<keyof I["message"], "pong" | "$case">]: never; }) | undefined;
    } & { [K_99 in Exclude<keyof I, "message">]: never; }>(object: I): SignalResponse;
};
export declare const SimulcastCodec: {
    encode(message: SimulcastCodec, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SimulcastCodec;
    fromJSON(object: any): SimulcastCodec;
    toJSON(message: SimulcastCodec): unknown;
    fromPartial<I extends {
        codec?: string | undefined;
        cid?: string | undefined;
        enableSimulcastLayers?: boolean | undefined;
    } & {
        codec?: string | undefined;
        cid?: string | undefined;
        enableSimulcastLayers?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof SimulcastCodec>]: never; }>(object: I): SimulcastCodec;
};
export declare const AddTrackRequest: {
    encode(message: AddTrackRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AddTrackRequest;
    fromJSON(object: any): AddTrackRequest;
    toJSON(message: AddTrackRequest): unknown;
    fromPartial<I extends {
        cid?: string | undefined;
        name?: string | undefined;
        type?: TrackType | undefined;
        width?: number | undefined;
        height?: number | undefined;
        muted?: boolean | undefined;
        disableDtx?: boolean | undefined;
        source?: TrackSource | undefined;
        layers?: {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[] | undefined;
        simulcastCodecs?: {
            codec?: string | undefined;
            cid?: string | undefined;
            enableSimulcastLayers?: boolean | undefined;
        }[] | undefined;
        sid?: string | undefined;
    } & {
        cid?: string | undefined;
        name?: string | undefined;
        type?: TrackType | undefined;
        width?: number | undefined;
        height?: number | undefined;
        muted?: boolean | undefined;
        disableDtx?: boolean | undefined;
        source?: TrackSource | undefined;
        layers?: ({
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[] & ({
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        } & {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        } & { [K in Exclude<keyof I["layers"][number], keyof VideoLayer>]: never; })[] & { [K_1 in Exclude<keyof I["layers"], keyof {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[]>]: never; }) | undefined;
        simulcastCodecs?: ({
            codec?: string | undefined;
            cid?: string | undefined;
            enableSimulcastLayers?: boolean | undefined;
        }[] & ({
            codec?: string | undefined;
            cid?: string | undefined;
            enableSimulcastLayers?: boolean | undefined;
        } & {
            codec?: string | undefined;
            cid?: string | undefined;
            enableSimulcastLayers?: boolean | undefined;
        } & { [K_2 in Exclude<keyof I["simulcastCodecs"][number], keyof SimulcastCodec>]: never; })[] & { [K_3 in Exclude<keyof I["simulcastCodecs"], keyof {
            codec?: string | undefined;
            cid?: string | undefined;
            enableSimulcastLayers?: boolean | undefined;
        }[]>]: never; }) | undefined;
        sid?: string | undefined;
    } & { [K_4 in Exclude<keyof I, keyof AddTrackRequest>]: never; }>(object: I): AddTrackRequest;
};
export declare const TrickleRequest: {
    encode(message: TrickleRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TrickleRequest;
    fromJSON(object: any): TrickleRequest;
    toJSON(message: TrickleRequest): unknown;
    fromPartial<I extends {
        candidateInit?: string | undefined;
        target?: SignalTarget | undefined;
    } & {
        candidateInit?: string | undefined;
        target?: SignalTarget | undefined;
    } & { [K in Exclude<keyof I, keyof TrickleRequest>]: never; }>(object: I): TrickleRequest;
};
export declare const MuteTrackRequest: {
    encode(message: MuteTrackRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MuteTrackRequest;
    fromJSON(object: any): MuteTrackRequest;
    toJSON(message: MuteTrackRequest): unknown;
    fromPartial<I extends {
        sid?: string | undefined;
        muted?: boolean | undefined;
    } & {
        sid?: string | undefined;
        muted?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof MuteTrackRequest>]: never; }>(object: I): MuteTrackRequest;
};
export declare const JoinResponse: {
    encode(message: JoinResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): JoinResponse;
    fromJSON(object: any): JoinResponse;
    toJSON(message: JoinResponse): unknown;
    fromPartial<I extends {
        room?: {
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            activeRecording?: boolean | undefined;
        } | undefined;
        participant?: {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } | undefined;
        otherParticipants?: {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[] | undefined;
        serverVersion?: string | undefined;
        iceServers?: {
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        }[] | undefined;
        subscriberPrimary?: boolean | undefined;
        alternativeUrl?: string | undefined;
        clientConfiguration?: {
            video?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            screen?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
            disabledCodecs?: {
                codecs?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
            } | undefined;
            forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
        } | undefined;
        serverRegion?: string | undefined;
        pingTimeout?: number | undefined;
        pingInterval?: number | undefined;
        serverInfo?: {
            edition?: import("./livekit_models").ServerInfo_Edition | undefined;
            version?: string | undefined;
            protocol?: number | undefined;
            region?: string | undefined;
            nodeId?: string | undefined;
            debugInfo?: string | undefined;
        } | undefined;
    } & {
        room?: ({
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            activeRecording?: boolean | undefined;
        } & {
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: ({
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] & ({
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            } & {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            } & { [K in Exclude<keyof I["room"]["enabledCodecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_1 in Exclude<keyof I["room"]["enabledCodecs"], keyof {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[]>]: never; }) | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            activeRecording?: boolean | undefined;
        } & { [K_2 in Exclude<keyof I["room"], keyof Room>]: never; }) | undefined;
        participant?: ({
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] & ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            } & {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & { [K_3 in Exclude<keyof I["participant"]["tracks"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_4 in Exclude<keyof I["participant"]["tracks"][number]["layers"], keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>]: never; }) | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] & ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                } & {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & { [K_5 in Exclude<keyof I["participant"]["tracks"][number]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_6 in Exclude<keyof I["participant"]["tracks"][number]["codecs"][number]["layers"], keyof {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_7 in Exclude<keyof I["participant"]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_8 in Exclude<keyof I["participant"]["tracks"][number]["codecs"], keyof {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_9 in Exclude<keyof I["participant"]["tracks"][number], keyof TrackInfo>]: never; })[] & { [K_10 in Exclude<keyof I["participant"]["tracks"], keyof {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: ({
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } & {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } & { [K_11 in Exclude<keyof I["participant"]["permission"], keyof import("./livekit_models").ParticipantPermission>]: never; }) | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & { [K_12 in Exclude<keyof I["participant"], keyof ParticipantInfo>]: never; }) | undefined;
        otherParticipants?: ({
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[] & ({
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] & ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            } & {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & { [K_13 in Exclude<keyof I["otherParticipants"][number]["tracks"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_14 in Exclude<keyof I["otherParticipants"][number]["tracks"][number]["layers"], keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>]: never; }) | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] & ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                } & {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & { [K_15 in Exclude<keyof I["otherParticipants"][number]["tracks"][number]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_16 in Exclude<keyof I["otherParticipants"][number]["tracks"][number]["codecs"][number]["layers"], keyof {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_17 in Exclude<keyof I["otherParticipants"][number]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_18 in Exclude<keyof I["otherParticipants"][number]["tracks"][number]["codecs"], keyof {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_19 in Exclude<keyof I["otherParticipants"][number]["tracks"][number], keyof TrackInfo>]: never; })[] & { [K_20 in Exclude<keyof I["otherParticipants"][number]["tracks"], keyof {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: ({
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } & {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } & { [K_21 in Exclude<keyof I["otherParticipants"][number]["permission"], keyof import("./livekit_models").ParticipantPermission>]: never; }) | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & { [K_22 in Exclude<keyof I["otherParticipants"][number], keyof ParticipantInfo>]: never; })[] & { [K_23 in Exclude<keyof I["otherParticipants"], keyof {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[]>]: never; }) | undefined;
        serverVersion?: string | undefined;
        iceServers?: ({
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        }[] & ({
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        } & {
            urls?: (string[] & string[] & { [K_24 in Exclude<keyof I["iceServers"][number]["urls"], keyof string[]>]: never; }) | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        } & { [K_25 in Exclude<keyof I["iceServers"][number], keyof ICEServer>]: never; })[] & { [K_26 in Exclude<keyof I["iceServers"], keyof {
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        }[]>]: never; }) | undefined;
        subscriberPrimary?: boolean | undefined;
        alternativeUrl?: string | undefined;
        clientConfiguration?: ({
            video?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            screen?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
            disabledCodecs?: {
                codecs?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
            } | undefined;
            forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
        } & {
            video?: ({
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & { [K_27 in Exclude<keyof I["clientConfiguration"]["video"], "hardwareEncoder">]: never; }) | undefined;
            screen?: ({
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & { [K_28 in Exclude<keyof I["clientConfiguration"]["screen"], "hardwareEncoder">]: never; }) | undefined;
            resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
            disabledCodecs?: ({
                codecs?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
            } & {
                codecs?: ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] & ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & { [K_29 in Exclude<keyof I["clientConfiguration"]["disabledCodecs"]["codecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_30 in Exclude<keyof I["clientConfiguration"]["disabledCodecs"]["codecs"], keyof {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_31 in Exclude<keyof I["clientConfiguration"]["disabledCodecs"], "codecs">]: never; }) | undefined;
            forceRelay?: import("./livekit_models").ClientConfigSetting | undefined;
        } & { [K_32 in Exclude<keyof I["clientConfiguration"], keyof ClientConfiguration>]: never; }) | undefined;
        serverRegion?: string | undefined;
        pingTimeout?: number | undefined;
        pingInterval?: number | undefined;
        serverInfo?: ({
            edition?: import("./livekit_models").ServerInfo_Edition | undefined;
            version?: string | undefined;
            protocol?: number | undefined;
            region?: string | undefined;
            nodeId?: string | undefined;
            debugInfo?: string | undefined;
        } & {
            edition?: import("./livekit_models").ServerInfo_Edition | undefined;
            version?: string | undefined;
            protocol?: number | undefined;
            region?: string | undefined;
            nodeId?: string | undefined;
            debugInfo?: string | undefined;
        } & { [K_33 in Exclude<keyof I["serverInfo"], keyof ServerInfo>]: never; }) | undefined;
    } & { [K_34 in Exclude<keyof I, keyof JoinResponse>]: never; }>(object: I): JoinResponse;
};
export declare const TrackPublishedResponse: {
    encode(message: TrackPublishedResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TrackPublishedResponse;
    fromJSON(object: any): TrackPublishedResponse;
    toJSON(message: TrackPublishedResponse): unknown;
    fromPartial<I extends {
        cid?: string | undefined;
        track?: {
            sid?: string | undefined;
            type?: TrackType | undefined;
            name?: string | undefined;
            muted?: boolean | undefined;
            width?: number | undefined;
            height?: number | undefined;
            simulcast?: boolean | undefined;
            disableDtx?: boolean | undefined;
            source?: TrackSource | undefined;
            layers?: {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[] | undefined;
            mimeType?: string | undefined;
            mid?: string | undefined;
            codecs?: {
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            }[] | undefined;
        } | undefined;
    } & {
        cid?: string | undefined;
        track?: ({
            sid?: string | undefined;
            type?: TrackType | undefined;
            name?: string | undefined;
            muted?: boolean | undefined;
            width?: number | undefined;
            height?: number | undefined;
            simulcast?: boolean | undefined;
            disableDtx?: boolean | undefined;
            source?: TrackSource | undefined;
            layers?: {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[] | undefined;
            mimeType?: string | undefined;
            mid?: string | undefined;
            codecs?: {
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            }[] | undefined;
        } & {
            sid?: string | undefined;
            type?: TrackType | undefined;
            name?: string | undefined;
            muted?: boolean | undefined;
            width?: number | undefined;
            height?: number | undefined;
            simulcast?: boolean | undefined;
            disableDtx?: boolean | undefined;
            source?: TrackSource | undefined;
            layers?: ({
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[] & ({
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            } & {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            } & { [K in Exclude<keyof I["track"]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_1 in Exclude<keyof I["track"]["layers"], keyof {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[]>]: never; }) | undefined;
            mimeType?: string | undefined;
            mid?: string | undefined;
            codecs?: ({
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            }[] & ({
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            } & {
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & { [K_2 in Exclude<keyof I["track"]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_3 in Exclude<keyof I["track"]["codecs"][number]["layers"], keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_4 in Exclude<keyof I["track"]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_5 in Exclude<keyof I["track"]["codecs"], keyof {
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_6 in Exclude<keyof I["track"], keyof TrackInfo>]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I, keyof TrackPublishedResponse>]: never; }>(object: I): TrackPublishedResponse;
};
export declare const TrackUnpublishedResponse: {
    encode(message: TrackUnpublishedResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TrackUnpublishedResponse;
    fromJSON(object: any): TrackUnpublishedResponse;
    toJSON(message: TrackUnpublishedResponse): unknown;
    fromPartial<I extends {
        trackSid?: string | undefined;
    } & {
        trackSid?: string | undefined;
    } & { [K in Exclude<keyof I, "trackSid">]: never; }>(object: I): TrackUnpublishedResponse;
};
export declare const SessionDescription: {
    encode(message: SessionDescription, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SessionDescription;
    fromJSON(object: any): SessionDescription;
    toJSON(message: SessionDescription): unknown;
    fromPartial<I extends {
        type?: string | undefined;
        sdp?: string | undefined;
    } & {
        type?: string | undefined;
        sdp?: string | undefined;
    } & { [K in Exclude<keyof I, keyof SessionDescription>]: never; }>(object: I): SessionDescription;
};
export declare const ParticipantUpdate: {
    encode(message: ParticipantUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ParticipantUpdate;
    fromJSON(object: any): ParticipantUpdate;
    toJSON(message: ParticipantUpdate): unknown;
    fromPartial<I extends {
        participants?: {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[] | undefined;
    } & {
        participants?: ({
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[] & ({
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] & ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            } & {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & { [K in Exclude<keyof I["participants"][number]["tracks"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_1 in Exclude<keyof I["participants"][number]["tracks"][number]["layers"], keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>]: never; }) | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] & ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                } & {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & { [K_2 in Exclude<keyof I["participants"][number]["tracks"][number]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_3 in Exclude<keyof I["participants"][number]["tracks"][number]["codecs"][number]["layers"], keyof {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_4 in Exclude<keyof I["participants"][number]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_5 in Exclude<keyof I["participants"][number]["tracks"][number]["codecs"], keyof {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_6 in Exclude<keyof I["participants"][number]["tracks"][number], keyof TrackInfo>]: never; })[] & { [K_7 in Exclude<keyof I["participants"][number]["tracks"], keyof {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: ({
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } & {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } & { [K_8 in Exclude<keyof I["participants"][number]["permission"], keyof import("./livekit_models").ParticipantPermission>]: never; }) | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & { [K_9 in Exclude<keyof I["participants"][number], keyof ParticipantInfo>]: never; })[] & { [K_10 in Exclude<keyof I["participants"], keyof {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_11 in Exclude<keyof I, "participants">]: never; }>(object: I): ParticipantUpdate;
};
export declare const UpdateSubscription: {
    encode(message: UpdateSubscription, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UpdateSubscription;
    fromJSON(object: any): UpdateSubscription;
    toJSON(message: UpdateSubscription): unknown;
    fromPartial<I extends {
        trackSids?: string[] | undefined;
        subscribe?: boolean | undefined;
        participantTracks?: {
            participantSid?: string | undefined;
            trackSids?: string[] | undefined;
        }[] | undefined;
    } & {
        trackSids?: (string[] & string[] & { [K in Exclude<keyof I["trackSids"], keyof string[]>]: never; }) | undefined;
        subscribe?: boolean | undefined;
        participantTracks?: ({
            participantSid?: string | undefined;
            trackSids?: string[] | undefined;
        }[] & ({
            participantSid?: string | undefined;
            trackSids?: string[] | undefined;
        } & {
            participantSid?: string | undefined;
            trackSids?: (string[] & string[] & { [K_1 in Exclude<keyof I["participantTracks"][number]["trackSids"], keyof string[]>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["participantTracks"][number], keyof ParticipantTracks>]: never; })[] & { [K_3 in Exclude<keyof I["participantTracks"], keyof {
            participantSid?: string | undefined;
            trackSids?: string[] | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, keyof UpdateSubscription>]: never; }>(object: I): UpdateSubscription;
};
export declare const UpdateTrackSettings: {
    encode(message: UpdateTrackSettings, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UpdateTrackSettings;
    fromJSON(object: any): UpdateTrackSettings;
    toJSON(message: UpdateTrackSettings): unknown;
    fromPartial<I extends {
        trackSids?: string[] | undefined;
        disabled?: boolean | undefined;
        quality?: VideoQuality | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } & {
        trackSids?: (string[] & string[] & { [K in Exclude<keyof I["trackSids"], keyof string[]>]: never; }) | undefined;
        disabled?: boolean | undefined;
        quality?: VideoQuality | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } & { [K_1 in Exclude<keyof I, keyof UpdateTrackSettings>]: never; }>(object: I): UpdateTrackSettings;
};
export declare const LeaveRequest: {
    encode(message: LeaveRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LeaveRequest;
    fromJSON(object: any): LeaveRequest;
    toJSON(message: LeaveRequest): unknown;
    fromPartial<I extends {
        canReconnect?: boolean | undefined;
        reason?: DisconnectReason | undefined;
    } & {
        canReconnect?: boolean | undefined;
        reason?: DisconnectReason | undefined;
    } & { [K in Exclude<keyof I, keyof LeaveRequest>]: never; }>(object: I): LeaveRequest;
};
export declare const UpdateVideoLayers: {
    encode(message: UpdateVideoLayers, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UpdateVideoLayers;
    fromJSON(object: any): UpdateVideoLayers;
    toJSON(message: UpdateVideoLayers): unknown;
    fromPartial<I extends {
        trackSid?: string | undefined;
        layers?: {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[] | undefined;
    } & {
        trackSid?: string | undefined;
        layers?: ({
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[] & ({
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        } & {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        } & { [K in Exclude<keyof I["layers"][number], keyof VideoLayer>]: never; })[] & { [K_1 in Exclude<keyof I["layers"], keyof {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof UpdateVideoLayers>]: never; }>(object: I): UpdateVideoLayers;
};
export declare const ICEServer: {
    encode(message: ICEServer, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ICEServer;
    fromJSON(object: any): ICEServer;
    toJSON(message: ICEServer): unknown;
    fromPartial<I extends {
        urls?: string[] | undefined;
        username?: string | undefined;
        credential?: string | undefined;
    } & {
        urls?: (string[] & string[] & { [K in Exclude<keyof I["urls"], keyof string[]>]: never; }) | undefined;
        username?: string | undefined;
        credential?: string | undefined;
    } & { [K_1 in Exclude<keyof I, keyof ICEServer>]: never; }>(object: I): ICEServer;
};
export declare const SpeakersChanged: {
    encode(message: SpeakersChanged, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SpeakersChanged;
    fromJSON(object: any): SpeakersChanged;
    toJSON(message: SpeakersChanged): unknown;
    fromPartial<I extends {
        speakers?: {
            sid?: string | undefined;
            level?: number | undefined;
            active?: boolean | undefined;
        }[] | undefined;
    } & {
        speakers?: ({
            sid?: string | undefined;
            level?: number | undefined;
            active?: boolean | undefined;
        }[] & ({
            sid?: string | undefined;
            level?: number | undefined;
            active?: boolean | undefined;
        } & {
            sid?: string | undefined;
            level?: number | undefined;
            active?: boolean | undefined;
        } & { [K in Exclude<keyof I["speakers"][number], keyof SpeakerInfo>]: never; })[] & { [K_1 in Exclude<keyof I["speakers"], keyof {
            sid?: string | undefined;
            level?: number | undefined;
            active?: boolean | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "speakers">]: never; }>(object: I): SpeakersChanged;
};
export declare const RoomUpdate: {
    encode(message: RoomUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RoomUpdate;
    fromJSON(object: any): RoomUpdate;
    toJSON(message: RoomUpdate): unknown;
    fromPartial<I extends {
        room?: {
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            activeRecording?: boolean | undefined;
        } | undefined;
    } & {
        room?: ({
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            activeRecording?: boolean | undefined;
        } & {
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: ({
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] & ({
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            } & {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            } & { [K in Exclude<keyof I["room"]["enabledCodecs"][number], keyof import("./livekit_models").Codec>]: never; })[] & { [K_1 in Exclude<keyof I["room"]["enabledCodecs"], keyof {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[]>]: never; }) | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            activeRecording?: boolean | undefined;
        } & { [K_2 in Exclude<keyof I["room"], keyof Room>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "room">]: never; }>(object: I): RoomUpdate;
};
export declare const ConnectionQualityInfo: {
    encode(message: ConnectionQualityInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ConnectionQualityInfo;
    fromJSON(object: any): ConnectionQualityInfo;
    toJSON(message: ConnectionQualityInfo): unknown;
    fromPartial<I extends {
        participantSid?: string | undefined;
        quality?: ConnectionQuality | undefined;
        score?: number | undefined;
    } & {
        participantSid?: string | undefined;
        quality?: ConnectionQuality | undefined;
        score?: number | undefined;
    } & { [K in Exclude<keyof I, keyof ConnectionQualityInfo>]: never; }>(object: I): ConnectionQualityInfo;
};
export declare const ConnectionQualityUpdate: {
    encode(message: ConnectionQualityUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ConnectionQualityUpdate;
    fromJSON(object: any): ConnectionQualityUpdate;
    toJSON(message: ConnectionQualityUpdate): unknown;
    fromPartial<I extends {
        updates?: {
            participantSid?: string | undefined;
            quality?: ConnectionQuality | undefined;
            score?: number | undefined;
        }[] | undefined;
    } & {
        updates?: ({
            participantSid?: string | undefined;
            quality?: ConnectionQuality | undefined;
            score?: number | undefined;
        }[] & ({
            participantSid?: string | undefined;
            quality?: ConnectionQuality | undefined;
            score?: number | undefined;
        } & {
            participantSid?: string | undefined;
            quality?: ConnectionQuality | undefined;
            score?: number | undefined;
        } & { [K in Exclude<keyof I["updates"][number], keyof ConnectionQualityInfo>]: never; })[] & { [K_1 in Exclude<keyof I["updates"], keyof {
            participantSid?: string | undefined;
            quality?: ConnectionQuality | undefined;
            score?: number | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "updates">]: never; }>(object: I): ConnectionQualityUpdate;
};
export declare const StreamStateInfo: {
    encode(message: StreamStateInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StreamStateInfo;
    fromJSON(object: any): StreamStateInfo;
    toJSON(message: StreamStateInfo): unknown;
    fromPartial<I extends {
        participantSid?: string | undefined;
        trackSid?: string | undefined;
        state?: StreamState | undefined;
    } & {
        participantSid?: string | undefined;
        trackSid?: string | undefined;
        state?: StreamState | undefined;
    } & { [K in Exclude<keyof I, keyof StreamStateInfo>]: never; }>(object: I): StreamStateInfo;
};
export declare const StreamStateUpdate: {
    encode(message: StreamStateUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StreamStateUpdate;
    fromJSON(object: any): StreamStateUpdate;
    toJSON(message: StreamStateUpdate): unknown;
    fromPartial<I extends {
        streamStates?: {
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            state?: StreamState | undefined;
        }[] | undefined;
    } & {
        streamStates?: ({
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            state?: StreamState | undefined;
        }[] & ({
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            state?: StreamState | undefined;
        } & {
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            state?: StreamState | undefined;
        } & { [K in Exclude<keyof I["streamStates"][number], keyof StreamStateInfo>]: never; })[] & { [K_1 in Exclude<keyof I["streamStates"], keyof {
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            state?: StreamState | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "streamStates">]: never; }>(object: I): StreamStateUpdate;
};
export declare const SubscribedQuality: {
    encode(message: SubscribedQuality, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SubscribedQuality;
    fromJSON(object: any): SubscribedQuality;
    toJSON(message: SubscribedQuality): unknown;
    fromPartial<I extends {
        quality?: VideoQuality | undefined;
        enabled?: boolean | undefined;
    } & {
        quality?: VideoQuality | undefined;
        enabled?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof SubscribedQuality>]: never; }>(object: I): SubscribedQuality;
};
export declare const SubscribedCodec: {
    encode(message: SubscribedCodec, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SubscribedCodec;
    fromJSON(object: any): SubscribedCodec;
    toJSON(message: SubscribedCodec): unknown;
    fromPartial<I extends {
        codec?: string | undefined;
        qualities?: {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
    } & {
        codec?: string | undefined;
        qualities?: ({
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[] & ({
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        } & {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        } & { [K in Exclude<keyof I["qualities"][number], keyof SubscribedQuality>]: never; })[] & { [K_1 in Exclude<keyof I["qualities"], keyof {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof SubscribedCodec>]: never; }>(object: I): SubscribedCodec;
};
export declare const SubscribedQualityUpdate: {
    encode(message: SubscribedQualityUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SubscribedQualityUpdate;
    fromJSON(object: any): SubscribedQualityUpdate;
    toJSON(message: SubscribedQualityUpdate): unknown;
    fromPartial<I extends {
        trackSid?: string | undefined;
        subscribedQualities?: {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
        subscribedCodecs?: {
            codec?: string | undefined;
            qualities?: {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
        }[] | undefined;
    } & {
        trackSid?: string | undefined;
        subscribedQualities?: ({
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[] & ({
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        } & {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        } & { [K in Exclude<keyof I["subscribedQualities"][number], keyof SubscribedQuality>]: never; })[] & { [K_1 in Exclude<keyof I["subscribedQualities"], keyof {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[]>]: never; }) | undefined;
        subscribedCodecs?: ({
            codec?: string | undefined;
            qualities?: {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
        }[] & ({
            codec?: string | undefined;
            qualities?: {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
        } & {
            codec?: string | undefined;
            qualities?: ({
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] & ({
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            } & {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            } & { [K_2 in Exclude<keyof I["subscribedCodecs"][number]["qualities"][number], keyof SubscribedQuality>]: never; })[] & { [K_3 in Exclude<keyof I["subscribedCodecs"][number]["qualities"], keyof {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I["subscribedCodecs"][number], keyof SubscribedCodec>]: never; })[] & { [K_5 in Exclude<keyof I["subscribedCodecs"], keyof {
            codec?: string | undefined;
            qualities?: {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, keyof SubscribedQualityUpdate>]: never; }>(object: I): SubscribedQualityUpdate;
};
export declare const TrackPermission: {
    encode(message: TrackPermission, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TrackPermission;
    fromJSON(object: any): TrackPermission;
    toJSON(message: TrackPermission): unknown;
    fromPartial<I extends {
        participantSid?: string | undefined;
        allTracks?: boolean | undefined;
        trackSids?: string[] | undefined;
        participantIdentity?: string | undefined;
    } & {
        participantSid?: string | undefined;
        allTracks?: boolean | undefined;
        trackSids?: (string[] & string[] & { [K in Exclude<keyof I["trackSids"], keyof string[]>]: never; }) | undefined;
        participantIdentity?: string | undefined;
    } & { [K_1 in Exclude<keyof I, keyof TrackPermission>]: never; }>(object: I): TrackPermission;
};
export declare const SubscriptionPermission: {
    encode(message: SubscriptionPermission, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionPermission;
    fromJSON(object: any): SubscriptionPermission;
    toJSON(message: SubscriptionPermission): unknown;
    fromPartial<I extends {
        allParticipants?: boolean | undefined;
        trackPermissions?: {
            participantSid?: string | undefined;
            allTracks?: boolean | undefined;
            trackSids?: string[] | undefined;
            participantIdentity?: string | undefined;
        }[] | undefined;
    } & {
        allParticipants?: boolean | undefined;
        trackPermissions?: ({
            participantSid?: string | undefined;
            allTracks?: boolean | undefined;
            trackSids?: string[] | undefined;
            participantIdentity?: string | undefined;
        }[] & ({
            participantSid?: string | undefined;
            allTracks?: boolean | undefined;
            trackSids?: string[] | undefined;
            participantIdentity?: string | undefined;
        } & {
            participantSid?: string | undefined;
            allTracks?: boolean | undefined;
            trackSids?: (string[] & string[] & { [K in Exclude<keyof I["trackPermissions"][number]["trackSids"], keyof string[]>]: never; }) | undefined;
            participantIdentity?: string | undefined;
        } & { [K_1 in Exclude<keyof I["trackPermissions"][number], keyof TrackPermission>]: never; })[] & { [K_2 in Exclude<keyof I["trackPermissions"], keyof {
            participantSid?: string | undefined;
            allTracks?: boolean | undefined;
            trackSids?: string[] | undefined;
            participantIdentity?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, keyof SubscriptionPermission>]: never; }>(object: I): SubscriptionPermission;
};
export declare const SubscriptionPermissionUpdate: {
    encode(message: SubscriptionPermissionUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionPermissionUpdate;
    fromJSON(object: any): SubscriptionPermissionUpdate;
    toJSON(message: SubscriptionPermissionUpdate): unknown;
    fromPartial<I extends {
        participantSid?: string | undefined;
        trackSid?: string | undefined;
        allowed?: boolean | undefined;
    } & {
        participantSid?: string | undefined;
        trackSid?: string | undefined;
        allowed?: boolean | undefined;
    } & { [K in Exclude<keyof I, keyof SubscriptionPermissionUpdate>]: never; }>(object: I): SubscriptionPermissionUpdate;
};
export declare const SyncState: {
    encode(message: SyncState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SyncState;
    fromJSON(object: any): SyncState;
    toJSON(message: SyncState): unknown;
    fromPartial<I extends {
        answer?: {
            type?: string | undefined;
            sdp?: string | undefined;
        } | undefined;
        subscription?: {
            trackSids?: string[] | undefined;
            subscribe?: boolean | undefined;
            participantTracks?: {
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            }[] | undefined;
        } | undefined;
        publishTracks?: {
            cid?: string | undefined;
            track?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            } | undefined;
        }[] | undefined;
        dataChannels?: {
            label?: string | undefined;
            id?: number | undefined;
            target?: SignalTarget | undefined;
        }[] | undefined;
        offer?: {
            type?: string | undefined;
            sdp?: string | undefined;
        } | undefined;
    } & {
        answer?: ({
            type?: string | undefined;
            sdp?: string | undefined;
        } & {
            type?: string | undefined;
            sdp?: string | undefined;
        } & { [K in Exclude<keyof I["answer"], keyof SessionDescription>]: never; }) | undefined;
        subscription?: ({
            trackSids?: string[] | undefined;
            subscribe?: boolean | undefined;
            participantTracks?: {
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            }[] | undefined;
        } & {
            trackSids?: (string[] & string[] & { [K_1 in Exclude<keyof I["subscription"]["trackSids"], keyof string[]>]: never; }) | undefined;
            subscribe?: boolean | undefined;
            participantTracks?: ({
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            }[] & ({
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            } & {
                participantSid?: string | undefined;
                trackSids?: (string[] & string[] & { [K_2 in Exclude<keyof I["subscription"]["participantTracks"][number]["trackSids"], keyof string[]>]: never; }) | undefined;
            } & { [K_3 in Exclude<keyof I["subscription"]["participantTracks"][number], keyof ParticipantTracks>]: never; })[] & { [K_4 in Exclude<keyof I["subscription"]["participantTracks"], keyof {
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_5 in Exclude<keyof I["subscription"], keyof UpdateSubscription>]: never; }) | undefined;
        publishTracks?: ({
            cid?: string | undefined;
            track?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            } | undefined;
        }[] & ({
            cid?: string | undefined;
            track?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            cid?: string | undefined;
            track?: ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            } & {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & { [K_6 in Exclude<keyof I["publishTracks"][number]["track"]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_7 in Exclude<keyof I["publishTracks"][number]["track"]["layers"], keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>]: never; }) | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] & ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                } & {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & { [K_8 in Exclude<keyof I["publishTracks"][number]["track"]["codecs"][number]["layers"][number], keyof VideoLayer>]: never; })[] & { [K_9 in Exclude<keyof I["publishTracks"][number]["track"]["codecs"][number]["layers"], keyof {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_10 in Exclude<keyof I["publishTracks"][number]["track"]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>]: never; })[] & { [K_11 in Exclude<keyof I["publishTracks"][number]["track"]["codecs"], keyof {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_12 in Exclude<keyof I["publishTracks"][number]["track"], keyof TrackInfo>]: never; }) | undefined;
        } & { [K_13 in Exclude<keyof I["publishTracks"][number], keyof TrackPublishedResponse>]: never; })[] & { [K_14 in Exclude<keyof I["publishTracks"], keyof {
            cid?: string | undefined;
            track?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
        dataChannels?: ({
            label?: string | undefined;
            id?: number | undefined;
            target?: SignalTarget | undefined;
        }[] & ({
            label?: string | undefined;
            id?: number | undefined;
            target?: SignalTarget | undefined;
        } & {
            label?: string | undefined;
            id?: number | undefined;
            target?: SignalTarget | undefined;
        } & { [K_15 in Exclude<keyof I["dataChannels"][number], keyof DataChannelInfo>]: never; })[] & { [K_16 in Exclude<keyof I["dataChannels"], keyof {
            label?: string | undefined;
            id?: number | undefined;
            target?: SignalTarget | undefined;
        }[]>]: never; }) | undefined;
        offer?: ({
            type?: string | undefined;
            sdp?: string | undefined;
        } & {
            type?: string | undefined;
            sdp?: string | undefined;
        } & { [K_17 in Exclude<keyof I["offer"], keyof SessionDescription>]: never; }) | undefined;
    } & { [K_18 in Exclude<keyof I, keyof SyncState>]: never; }>(object: I): SyncState;
};
export declare const DataChannelInfo: {
    encode(message: DataChannelInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DataChannelInfo;
    fromJSON(object: any): DataChannelInfo;
    toJSON(message: DataChannelInfo): unknown;
    fromPartial<I extends {
        label?: string | undefined;
        id?: number | undefined;
        target?: SignalTarget | undefined;
    } & {
        label?: string | undefined;
        id?: number | undefined;
        target?: SignalTarget | undefined;
    } & { [K in Exclude<keyof I, keyof DataChannelInfo>]: never; }>(object: I): DataChannelInfo;
};
export declare const SimulateScenario: {
    encode(message: SimulateScenario, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SimulateScenario;
    fromJSON(object: any): SimulateScenario;
    toJSON(message: SimulateScenario): unknown;
    fromPartial<I extends {
        scenario?: ({
            speakerUpdate?: number | undefined;
        } & {
            $case: "speakerUpdate";
        }) | ({
            nodeFailure?: boolean | undefined;
        } & {
            $case: "nodeFailure";
        }) | ({
            migration?: boolean | undefined;
        } & {
            $case: "migration";
        }) | ({
            serverLeave?: boolean | undefined;
        } & {
            $case: "serverLeave";
        }) | ({
            switchCandidateProtocol?: CandidateProtocol | undefined;
        } & {
            $case: "switchCandidateProtocol";
        }) | undefined;
    } & {
        scenario?: ({
            speakerUpdate?: number | undefined;
        } & {
            $case: "speakerUpdate";
        } & {
            speakerUpdate?: number | undefined;
            $case: "speakerUpdate";
        } & { [K in Exclude<keyof I["scenario"], "speakerUpdate" | "$case">]: never; }) | ({
            nodeFailure?: boolean | undefined;
        } & {
            $case: "nodeFailure";
        } & {
            nodeFailure?: boolean | undefined;
            $case: "nodeFailure";
        } & { [K_1 in Exclude<keyof I["scenario"], "nodeFailure" | "$case">]: never; }) | ({
            migration?: boolean | undefined;
        } & {
            $case: "migration";
        } & {
            migration?: boolean | undefined;
            $case: "migration";
        } & { [K_2 in Exclude<keyof I["scenario"], "migration" | "$case">]: never; }) | ({
            serverLeave?: boolean | undefined;
        } & {
            $case: "serverLeave";
        } & {
            serverLeave?: boolean | undefined;
            $case: "serverLeave";
        } & { [K_3 in Exclude<keyof I["scenario"], "serverLeave" | "$case">]: never; }) | ({
            switchCandidateProtocol?: CandidateProtocol | undefined;
        } & {
            $case: "switchCandidateProtocol";
        } & {
            switchCandidateProtocol?: CandidateProtocol | undefined;
            $case: "switchCandidateProtocol";
        } & { [K_4 in Exclude<keyof I["scenario"], "switchCandidateProtocol" | "$case">]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I, "scenario">]: never; }>(object: I): SimulateScenario;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {
    $case: string;
} ? {
    [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]>;
} & {
    $case: T["$case"];
} : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
//# sourceMappingURL=livekit_rtc.d.ts.map