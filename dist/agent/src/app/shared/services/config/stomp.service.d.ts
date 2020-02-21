import { ConfigService } from './config.service';
import { DataService, ChatCustomerInfo } from '../data/data.service';
import { ANAChatMessage } from 'app/shared/model/ana-chat.models';
export declare class StompService {
    private _config;
    private _data;
    config: StompConfig;
    private client;
    private sockInstance;
    count: number;
    private timer;
    private stompHeaders;
    liveMsgStorage: {};
    networkConnectivityLog: ErrorLogResponse[];
    errorLogCount: number;
    connectionStatus: StompConnectionStatus;
    disconnectionType: DisconnectionType;
    constructor(_config: ConfigService, _data: DataService);
    connect(config?: StompConfig): void;
    private clearTimer;
    disconnect(): void;
    private debug;
    configure(config?: StompConfig): void;
    private onConnect;
    private subscribe;
    allChatsSubscription(custChats: ChatCustomerInfo[]): void;
    private onError;
    storeNetworkConnectivityLogs(disconnectType: DisconnectionType, status: StompConnectionStatus): void;
    private delayReconnect;
    private msgsIds;
    private onMessage;
    sendMessage(msg: ANAChatMessage): void;
    handleMessageReceived: (message: ANAChatMessage) => void;
    handleConnect: () => void;
    handleNewChat: (custInto: ChatCustomerInfo) => void;
    handleChatDeallocation: (custInto: ChatCustomerInfo) => void;
    handleTyping: (custId: string) => void;
    handleAck: (custId: string, msgId: string, delivered?: boolean) => void;
}
export interface StompConfig {
    endpoint: string;
    debug: boolean;
}
export declare enum StompConnectionStatus {
    None = "None",
    Connected = "Connected",
    Disconnected = "Disconnected",
    Connecting = "Connecting"
}
export interface ChatsResponse {
    content: any[];
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    isFirst: boolean;
    isLast: boolean;
    totalPages: number;
}
export interface ErrorLogResponse {
    status: StompConnectionStatus;
    type: DisconnectionType;
    timeStamp: string;
}
export declare enum DisconnectionType {
    Manual = "Manual",
    Network = "Network"
}
