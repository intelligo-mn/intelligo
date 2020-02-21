import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as StompJS from 'stompjs';
import { ConfigService } from './config.service'
import { DataService, ChatCustomerInfo } from '../data/data.service'
import { parse } from 'date-fns';
import { EventType, ANAChatMessage } from 'app/shared/model/ana-chat.models';

@Injectable()
export class StompService {
    public config: StompConfig;
    private client: StompJS.Client;
    private sockInstance: any;
    public count = 0;
    private timer: NodeJS.Timer;
    private stompHeaders: any = {};
    public liveMsgStorage: {};
    public networkConnectivityLog: ErrorLogResponse[] = [];
    public errorLogCount = 0;
    connectionStatus: StompConnectionStatus;
    disconnectionType: DisconnectionType;


    constructor(private _config: ConfigService, private _data: DataService) { }

    public connect(config?: StompConfig) {
        this.configure(config);
        if (!this.client)
            throw Error('Client not configured!');
        this.debug('Connecting...');
        this.connectionStatus = StompConnectionStatus.Connecting;
        this.stompHeaders = { user_id: this._config.profile.userId };
        this.client.connect(this.stompHeaders, this.onConnect, this.onError);
    }
    private clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
    public disconnect() {
        this.clearTimer();
        this.storeNetworkConnectivityLogs(DisconnectionType.Manual, StompConnectionStatus.Disconnected);
        if (this.client && this.client.connected) {
            this.client.disconnect(() => {
                this.debug("WebSocket Disconnected");
                this.disconnectionType = DisconnectionType.Manual;
                this.connectionStatus = StompConnectionStatus.Disconnected;
            });
            delete this.client;
            delete this.sockInstance;
        }
    }

    private debug = (...args: any[]) => {
        if (console && console.log && console.log.apply && this.config && this.config.debug)
            console.log.apply(console, args);
    }

    configure(config?: StompConfig) {
        if (config === null && this.config === null)
            throw Error('No configuration provided!');

        if (config != null)
            this.config = config;

        this.sockInstance = new SockJS(this._config.app.webSocketEndPoint + "/chatagents-websocket?access-token=" + this._config.profile.accessToken);
        this.client = StompJS.over(this.sockInstance);
        this.connectionStatus = StompConnectionStatus.Disconnected;
        this.client.debug = (this.config.debug || this.config.debug == null ? this.debug : null);
    }

    //Should be an arrow function to follow class context
    private onConnect = (frame: StompJS.Frame) => {
        console.log("Socket Connected");
        this.storeNetworkConnectivityLogs(DisconnectionType.Network, StompConnectionStatus.Connected);
        this.errorLogCount = 0;
        if (this.connectionStatus == StompConnectionStatus.Connected)
            return;
        try {
            this.subscribe();
            if (this.handleConnect)
                this.handleConnect();

            this.connectionStatus = StompConnectionStatus.Connected;
        } catch (e) {
            this.debug(e);
            this.connectionStatus = StompConnectionStatus.Disconnected;
        }
    }

    private subscribe = () => {
        this.stompHeaders['user_id'] = this._config.profile.userId;
        let userId = this._config.profile.userId;
        this.stompHeaders['id'] = this.count++;
        this.client.subscribe('/topic/presence', (message) => {
            this.client.send("/app/presence", this.stompHeaders, JSON.stringify({ user_id: userId }));
        }, this.stompHeaders);

        this.stompHeaders['id'] = this.count++;
        this.client.subscribe('/queue/events/user/' + this._config.profile.userId, (message) => {
            var eventMsg = JSON.parse(message.body) as ANAChatMessage;
            for (var i = 0; i < eventMsg.events.length; i++) {
                var eventType = eventMsg.events[i].type;
                if (eventType == EventType.CHAT_ALLOCATION) {
                    this.stompHeaders['id'] = this.count++;
                    this.client.subscribe(eventMsg.events[i].channel, (message) => {
                        this.onMessage(JSON.parse(message.body));
                    }, this.stompHeaders);
                    console.log(eventMsg);
                    if (this.handleNewChat)
                        this.handleNewChat({
                            agentId: '',
                            assignedAt: eventMsg.meta.timestamp,
                            businessId: eventMsg.meta.recipient.id,
                            flowId: eventMsg.meta.flowId,
                            customerId: eventMsg.meta.sender.id,
                            id: eventMsg.meta.id,
                            unreadCount: 0,
                            createdAt: eventMsg.meta.timestamp,
                            lastMessageTime: eventMsg.meta.timestamp,
                            messages: null,
                            sessionId: eventMsg.meta.sessionId,
                            status: ""
                        });
                } else if (eventType == EventType.CHAT_DEALLOCATION) {
                    if (this.handleChatDeallocation) {
                        this.handleChatDeallocation({
                            agentId: '',
                            assignedAt: 0,
                            businessId: '',
                            flowId: '',
                            customerId: eventMsg.meta.sender.id,
                            id: "",
                            status: "",
                            unreadCount: 0,
                            createdAt: 0,
                            lastMessageTime: 0,
                            messages: null,
                            sessionId: eventMsg.meta.sessionId
                        });
                    }
                } else if (eventType == EventType.TYPING) {
                    if (this.handleTyping)
                        this.handleTyping(eventMsg.meta.recipient.id);
                } else if (eventType == EventType.ACK) {
                    if (this.handleAck)
                        this.handleAck(eventMsg.meta.recipient.id, message.headers['tid'], false);
                }
            }
        }, this.stompHeaders);
    }

    allChatsSubscription(custChats: ChatCustomerInfo[]) {
        custChats.forEach(custChat => {
            this.stompHeaders['id'] = this.count++;
            let channel = (custChat.flowId ? `/topic/chat/customer/${custChat.customerId}/business/${custChat.businessId}/flow/${custChat.flowId}` : `/topic/chat/customer/${custChat.customerId}/business/${custChat.businessId}`);
            this.client.subscribe(channel, (message) => {
                this.onMessage(JSON.parse(message.body));
            }, this.stompHeaders);
        });
    }

    private onError = (error: string | StompJS.Message) => {
        this.connectionStatus = StompConnectionStatus.Disconnected;

        if (typeof error === 'object')
            error = error.body;

        if (this.config && this.config.debug)
            this.debug('Socket Error: ' + JSON.stringify(error));

        this.debug(`Error: ${error}`);
        if (error.indexOf('Lost connection') !== -1) {
            this.disconnectionType = DisconnectionType.Network
            this.delayReconnect(5000);
            if (this.errorLogCount < 1) {
                this.errorLogCount += 1;
                this.storeNetworkConnectivityLogs(DisconnectionType.Network, StompConnectionStatus.Disconnected);
            }
        }
    }

    public storeNetworkConnectivityLogs(disconnectType: DisconnectionType, status: StompConnectionStatus) {
        if (localStorage.getItem("NetworkConnectivityLog")) {
            this.networkConnectivityLog = JSON.parse(localStorage.getItem("NetworkConnectivityLog")) as ErrorLogResponse[];
            this.networkConnectivityLog.push({ status: status, type: disconnectType, timeStamp: new Date().toISOString() });
        }
        else {
            if (this.networkConnectivityLog.length <= 20)
                this.networkConnectivityLog.push({ status: status, type: disconnectType, timeStamp: new Date().toISOString() });
            else {
                this.networkConnectivityLog.shift();
                this.networkConnectivityLog.push({ status: status, type: disconnectType, timeStamp: new Date().toISOString() });
            }
        }
        localStorage.setItem("NetworkConnectivityLog", JSON.stringify(this.networkConnectivityLog))
    }

    private delayReconnect(t: number) {
        this.debug(`Reconnecting in ${t / 1000} second(s)...`);
        this.timer = setTimeout(() => {
            this.connect();
        }, t);
    }

    private msgsIds: string[] = [];
    private onMessage = (messageBody: any) => {
        try {
            var msg = messageBody as ANAChatMessage;
            for (var i = 0; i < msg.events.length; i++) {
                var eventType = msg.events[i].type;
                if (eventType == EventType.TYPING) {
                    if (this.handleTyping)
                        this.handleTyping(msg.meta.sender.id);
                } else if (eventType == EventType.ACK) {
                    if (this.handleAck)
                        this.handleAck(msg.meta.sender.id, msg.meta.responseTo, true);
                }
            }
        } catch (e) {
            console.error(e);
        }
        if (this.handleMessageReceived)
            this.handleMessageReceived(messageBody);
    }

    sendMessage(msg: ANAChatMessage) {
        let headers = this.stompHeaders;
        headers['tid'] = msg.customData.ackId;
        this.client.send(`/app/message`, headers, JSON.stringify(msg));
    }

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

export enum StompConnectionStatus {
    None = 'None',
    Connected = 'Connected',
    Disconnected = 'Disconnected',
    Connecting = 'Connecting'
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
};

export interface ErrorLogResponse {
    status: StompConnectionStatus
    type: DisconnectionType,
    timeStamp: string
};

export enum DisconnectionType {
    Manual = 'Manual',
    Network = 'Network'
}
