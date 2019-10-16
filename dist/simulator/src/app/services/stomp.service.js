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
const ana_chat_vm_models_1 = require("../models/ana-chat-vm.models");
const ana_chat_models_1 = require("../models/ana-chat.models");
const utilities_service_1 = require("../services/utilities.service");
let StompService = class StompService {
    constructor() {
        this.stompHeaders = {};
        this.consecutiveErrorsCount = 0;
        this.debug = (...args) => {
            if (console && console.log && console.log.apply && this.config && this.config.debug)
                console.log.apply(console, args);
        };
        this.onConnect = (frame) => {
            this.clearTimer();
            this.consecutiveErrorsCount = 0;
            if (this.connectionStatus == StompConnectionStatus.Connected)
                return;
            try {
                this.subscribe();
                this.connectionStatus = StompConnectionStatus.Connected;
                if (this.handleConnect)
                    this.handleConnect();
            }
            catch (e) {
                this.debug(e);
                this.connectionStatus = StompConnectionStatus.Disconnected;
            }
        };
        this.subscribe = () => {
            this.stompHeaders['user_id'] = this.config.customerId;
            let custId = this.stompHeaders['user_id'];
            this.stompHeaders['id'] = utilities_service_1.UtilitiesService.uuidv4();
            this.client.subscribe('/topic/presence', (message) => {
                this.client.send("/app/presence", this.stompHeaders, JSON.stringify({ user_id: custId }));
            }, this.stompHeaders);
            this.stompHeaders['id'] = utilities_service_1.UtilitiesService.uuidv4();
            let channel = (this.config.flowId ? '/topic/chat/customer/' + custId + "/business/" + this.config.businessId + "/flow/" + this.config.flowId : '/topic/chat/customer/' + custId + "/business/" + this.config.businessId);
            this.client.subscribe(channel, (message) => {
                this.onMessage(JSON.parse(message.body));
            }, this.stompHeaders);
            this.stompHeaders['id'] = utilities_service_1.UtilitiesService.uuidv4();
            this.client.subscribe('/queue/events/user/' + custId, (message) => {
                let msg = new ana_chat_models_1.ANAChatMessage(JSON.parse(message.body));
                if (msg.events) {
                    for (var i = 0; i < msg.events.length; i++) {
                        let event = msg.events[i];
                        if (event.type == ana_chat_models_1.EventType.ACK) {
                            this.onAck(message.headers['tid']);
                        }
                        else if (event.type == ana_chat_models_1.EventType.TYPING) {
                            this.onTyping();
                        }
                    }
                }
            }, this.stompHeaders);
        };
        this.onError = (error) => {
            this.connectionStatus = StompConnectionStatus.Disconnected;
            if (this.consecutiveErrorsCount <= utilities_service_1.Config.consecutiveErrorsThreshold) {
                this.consecutiveErrorsCount++;
                console.log(this.consecutiveErrorsCount);
                if (this.consecutiveErrorsCount == utilities_service_1.Config.consecutiveErrorsThreshold)
                    if (this.handleConsecutiveErrorsState)
                        this.handleConsecutiveErrorsState();
            }
            if (typeof error === 'object')
                error = error.body;
            if (this.config && this.config.debug)
                this.debug('Socket Error: ' + JSON.stringify(error));
            this.debug(`Error: ${error}`);
            if (error.indexOf('Lost connection') !== -1)
                this.delayReconnect(5000);
        };
        this.onAck = (msgAckId, delivered) => {
            this.debug(`${delivered ? "DeliveredAck:" : "SentAck:"}` + msgAckId);
            if (this.handleAck)
                this.handleAck(msgAckId, delivered);
        };
        this.onTyping = () => {
            this.debug("Typing... ");
            if (this.handleTyping)
                this.handleTyping();
        };
        this.msgsIds = [];
        this.onMessage = (messageBody) => {
            let anaMsg = new ana_chat_models_1.ANAChatMessage(messageBody);
            if (anaMsg.data && Object.keys(anaMsg.data).length > 0) {
                this.sendMessageReceivedAck(anaMsg.meta);
            }
            if (anaMsg.events && anaMsg.events.length > 0) {
                for (var i = 0; i < anaMsg.events.length; i++) {
                    let event = anaMsg.events[i];
                    if (event.type == ana_chat_models_1.EventType.ACK) {
                        this.onAck(anaMsg.meta.id, true);
                    }
                    else if (event.type == ana_chat_models_1.EventType.TYPING) {
                        this.onTyping();
                    }
                }
            }
            if (anaMsg.data && Object.keys(anaMsg.data).length > 0) {
                if (this.handleMessageReceived) {
                    if (this.msgsIds.indexOf(anaMsg.meta.id) == -1) {
                        this.msgsIds.push(anaMsg.meta.id);
                        this.handleMessageReceived(anaMsg);
                    }
                }
            }
        };
        this.typingBusy = false;
    }
    connect(config) {
        this.clearTimer();
        this.configure(config);
        if (!this.client)
            throw Error('Client not configured!');
        this.debug('Connecting...');
        this.connectionStatus = StompConnectionStatus.Connecting;
        let headers = { user_id: this.config.customerId };
        this.client.connect(headers, this.onConnect, this.onError);
    }
    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
    disconnect() {
        this.clearTimer();
        if (this.client && this.client.connected) {
            this.client.disconnect(() => this.debug("WebSocket Disconnected"));
        }
    }
    configure(config) {
        if (config === null && this.config === null)
            throw Error('No configuration provided!');
        if (config != null)
            this.config = config;
        this.sockInstance = new SockJS(this.config.endpoint);
        this.client = StompJS.over(this.sockInstance);
        this.connectionStatus = StompConnectionStatus.Disconnected;
        this.client.debug = (this.config.debug || this.config.debug == null ? this.debug : null);
    }
    delayReconnect(t) {
        this.debug(`Reconnecting in ${t / 1000} second(s)...`);
        this.timer = setTimeout(() => {
            this.connect();
        }, t);
    }
    sendMessage(message, threadMsgRef) {
        let _sendMessage = () => {
            let msg = message.extract();
            this.debug("Sent Socket Message: ");
            this.debug(msg);
            let headers = this.stompHeaders;
            headers['tid'] = threadMsgRef.messageAckId;
            this.client.send(`/app/message`, headers, JSON.stringify(msg));
            threadMsgRef.status = ana_chat_vm_models_1.MessageStatus.SentToServer;
            threadMsgRef.startTimeoutTimer();
        };
        threadMsgRef.retrySending = _sendMessage;
        _sendMessage();
    }
    sendTypingMessage(meta) {
        if (this.typingBusy || !this.client) {
            return;
        }
        this.typingBusy = true;
        setTimeout(() => this.typingBusy = false, 1000);
        let msg = new ana_chat_models_1.ANAChatMessage({
            meta: utilities_service_1.UtilitiesService.getReplyMeta(meta),
            events: [{
                    type: ana_chat_models_1.EventType.TYPING
                }]
        });
        let headers = this.stompHeaders;
        this.client.send(`/app/message`, headers, JSON.stringify(msg.extract()));
    }
    sendMessageReceivedAck(meta) {
        let msg = new ana_chat_models_1.ANAChatMessage({
            meta: utilities_service_1.UtilitiesService.getReplyMeta(meta, false, true),
            events: [{
                    type: ana_chat_models_1.EventType.ACK
                }]
        });
        let headers = this.stompHeaders;
        this.client.send(`/app/message`, headers, JSON.stringify(msg.extract()));
    }
};
StompService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], StompService);
exports.StompService = StompService;
var StompConnectionStatus;
(function (StompConnectionStatus) {
    StompConnectionStatus[StompConnectionStatus["None"] = 0] = "None";
    StompConnectionStatus[StompConnectionStatus["Connected"] = 1] = "Connected";
    StompConnectionStatus[StompConnectionStatus["Disconnected"] = 2] = "Disconnected";
    StompConnectionStatus[StompConnectionStatus["Connecting"] = 3] = "Connecting";
})(StompConnectionStatus = exports.StompConnectionStatus || (exports.StompConnectionStatus = {}));
//# sourceMappingURL=stomp.service.js.map