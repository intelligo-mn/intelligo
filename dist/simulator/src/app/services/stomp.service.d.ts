import { ChatMessageVM } from '../models/ana-chat-vm.models';
import { ANAChatMessage, ANAMeta } from '../models/ana-chat.models';
export declare class StompService {
    config: StompConfig;
    private client;
    private sockInstance;
    private timer;
    private stompHeaders;
    private consecutiveErrorsCount;
    connectionStatus: StompConnectionStatus;
    constructor();
    connect(config?: StompConfig): void;
    private clearTimer;
    private disconnect;
    private debug;
    configure(config?: StompConfig): void;
    private onConnect;
    private subscribe;
    private onError;
    private delayReconnect;
    private onAck;
    private onTyping;
    private msgsIds;
    private onMessage;
    sendMessage(message: ANAChatMessage, threadMsgRef: ChatMessageVM): void;
    typingBusy: boolean;
    sendTypingMessage(meta: ANAMeta): void;
    sendMessageReceivedAck(meta: ANAMeta): void;
    handleConnect: () => void;
    handleMessageReceived: (message: ANAChatMessage) => any;
    handleAck: (messageAckId: string, delivered?: boolean) => any;
    handleTyping: () => void;
    handleConsecutiveErrorsState: () => void;
}
export interface StompConfig {
    endpoint: string;
    customerId: string;
    businessId: string;
    flowId: string;
    currentSessionOnly: boolean;
    debug: boolean;
}
export declare enum StompConnectionStatus {
    None = 0,
    Connected = 1,
    Disconnected = 2,
    Connecting = 3
}
