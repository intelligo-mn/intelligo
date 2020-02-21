"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const SockJS = require("sockjs-client");
const StompJS = require("stompjs");
const config_service_1 = require("./config.service");
const data_service_1 = require("../data/data.service");
const ana_chat_models_1 = require("app/shared/model/ana-chat.models");
let StompService = class StompService {
    constructor(_config, _data) {
        this._config = _config;
        this._data = _data;
        this.count = 0;
        this.stompHeaders = {};
        this.networkConnectivityLog = [];
        this.errorLogCount = 0;
        this.debug = (...args) => {
            if (console && console.log && console.log.apply && this.config && this.config.debug)
                console.log.apply(console, args);
        };
        this.onConnect = (frame) => {
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
            }
            catch (e) {
                this.debug(e);
                this.connectionStatus = StompConnectionStatus.Disconnected;
            }
        };
        this.subscribe = () => {
            this.stompHeaders['user_id'] = this._config.profile.userId;
            let userId = this._config.profile.userId;
            this.stompHeaders['id'] = this.count++;
            this.client.subscribe('/topic/presence', (message) => {
                this.client.send("/app/presence", this.stompHeaders, JSON.stringify({ user_id: userId }));
            }, this.stompHeaders);
            this.stompHeaders['id'] = this.count++;
            this.client.subscribe('/queue/events/user/' + this._config.profile.userId, (message) => {
                var eventMsg = JSON.parse(message.body);
                for (var i = 0; i < eventMsg.events.length; i++) {
                    var eventType = eventMsg.events[i].type;
                    if (eventType == ana_chat_models_1.EventType.CHAT_ALLOCATION) {
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
                    }
                    else if (eventType == ana_chat_models_1.EventType.CHAT_DEALLOCATION) {
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
                    }
                    else if (eventType == ana_chat_models_1.EventType.TYPING) {
                        if (this.handleTyping)
                            this.handleTyping(eventMsg.meta.recipient.id);
                    }
                    else if (eventType == ana_chat_models_1.EventType.ACK) {
                        if (this.handleAck)
                            this.handleAck(eventMsg.meta.recipient.id, message.headers['tid'], false);
                    }
                }
            }, this.stompHeaders);
        };
        this.onError = (error) => {
            this.connectionStatus = StompConnectionStatus.Disconnected;
            if (typeof error === 'object')
                error = error.body;
            if (this.config && this.config.debug)
                this.debug('Socket Error: ' + JSON.stringify(error));
            this.debug(`Error: ${error}`);
            if (error.indexOf('Lost connection') !== -1) {
                this.disconnectionType = DisconnectionType.Network;
                this.delayReconnect(5000);
                if (this.errorLogCount < 1) {
                    this.errorLogCount += 1;
                    this.storeNetworkConnectivityLogs(DisconnectionType.Network, StompConnectionStatus.Disconnected);
                }
            }
        };
        this.msgsIds = [];
        this.onMessage = (messageBody) => {
            try {
                var msg = messageBody;
                for (var i = 0; i < msg.events.length; i++) {
                    var eventType = msg.events[i].type;
                    if (eventType == ana_chat_models_1.EventType.TYPING) {
                        if (this.handleTyping)
                            this.handleTyping(msg.meta.sender.id);
                    }
                    else if (eventType == ana_chat_models_1.EventType.ACK) {
                        if (this.handleAck)
                            this.handleAck(msg.meta.sender.id, msg.meta.responseTo, true);
                    }
                }
            }
            catch (e) {
                console.error(e);
            }
            if (this.handleMessageReceived)
                this.handleMessageReceived(messageBody);
        };
    }
    connect(config) {
        this.configure(config);
        if (!this.client)
            throw Error('Client not configured!');
        this.debug('Connecting...');
        this.connectionStatus = StompConnectionStatus.Connecting;
        this.stompHeaders = { user_id: this._config.profile.userId };
        this.client.connect(this.stompHeaders, this.onConnect, this.onError);
    }
    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
    disconnect() {
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
    configure(config) {
        if (config === null && this.config === null)
            throw Error('No configuration provided!');
        if (config != null)
            this.config = config;
        this.sockInstance = new SockJS(this._config.app.webSocketEndPoint + "/chatagents-websocket?access-token=" + this._config.profile.accessToken);
        this.client = StompJS.over(this.sockInstance);
        this.connectionStatus = StompConnectionStatus.Disconnected;
        this.client.debug = (this.config.debug || this.config.debug == null ? this.debug : null);
    }
    allChatsSubscription(custChats) {
        custChats.forEach(custChat => {
            this.stompHeaders['id'] = this.count++;
            let channel = (custChat.flowId ? `/topic/chat/customer/${custChat.customerId}/business/${custChat.businessId}/flow/${custChat.flowId}` : `/topic/chat/customer/${custChat.customerId}/business/${custChat.businessId}`);
            this.client.subscribe(channel, (message) => {
                this.onMessage(JSON.parse(message.body));
            }, this.stompHeaders);
        });
    }
    storeNetworkConnectivityLogs(disconnectType, status) {
        if (localStorage.getItem("NetworkConnectivityLog")) {
            this.networkConnectivityLog = JSON.parse(localStorage.getItem("NetworkConnectivityLog"));
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
        localStorage.setItem("NetworkConnectivityLog", JSON.stringify(this.networkConnectivityLog));
    }
    delayReconnect(t) {
        this.debug(`Reconnecting in ${t / 1000} second(s)...`);
        this.timer = setTimeout(() => {
            this.connect();
        }, t);
    }
    sendMessage(msg) {
        let headers = this.stompHeaders;
        headers['tid'] = msg.customData.ackId;
        this.client.send(`/app/message`, headers, JSON.stringify(msg));
    }
};
StompService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService, data_service_1.DataService])
], StompService);
exports.StompService = StompService;
var StompConnectionStatus;
(function (StompConnectionStatus) {
    StompConnectionStatus["None"] = "None";
    StompConnectionStatus["Connected"] = "Connected";
    StompConnectionStatus["Disconnected"] = "Disconnected";
    StompConnectionStatus["Connecting"] = "Connecting";
})(StompConnectionStatus = exports.StompConnectionStatus || (exports.StompConnectionStatus = {}));
;
;
var DisconnectionType;
(function (DisconnectionType) {
    DisconnectionType["Manual"] = "Manual";
    DisconnectionType["Network"] = "Network";
})(DisconnectionType = exports.DisconnectionType || (exports.DisconnectionType = {}));
//# sourceMappingURL=stomp.service.js.map