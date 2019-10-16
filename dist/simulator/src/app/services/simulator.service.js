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
const vm = require("../models/ana-chat-vm.models");
const models = require("../models/ana-chat.models");
const utilities_service_1 = require("../services/utilities.service");
const http_1 = require("@angular/common/http");
let SimulatorService = class SimulatorService {
    constructor(http, utils) {
        this.http = http;
        this.utils = utils;
        this.debug = true;
        window.onmessage = (event) => {
            this.logDebug('On message received from studio:');
            this.logDebug(event.data);
            let msg = event.data;
            if (msg.type == SimulatorMessageType.AnaChatMessage) {
                let cfMsg = msg;
                if (this.handleMessageReceived)
                    this.handleMessageReceived(new models.ANAChatMessage(cfMsg.data));
            }
            else if (msg.type == SimulatorMessageType.AnaChatReset) {
                if (this.handleResetSignal)
                    this.handleResetSignal();
            }
        };
    }
    logDebug(msg) {
        if (this.debug)
            console.log(msg);
    }
    sendMessage(message, threadMsgRef) {
        window.parent.postMessage({
            data: message,
            type: SimulatorMessageType.AnaChatMessage
        }, "*");
        if (threadMsgRef)
            threadMsgRef.status = vm.MessageStatus.ReceivedAtServer;
    }
};
SimulatorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient, utilities_service_1.UtilitiesService])
], SimulatorService);
exports.SimulatorService = SimulatorService;
var SimulatorMessageType;
(function (SimulatorMessageType) {
    SimulatorMessageType["AnaChatMessage"] = "AnaChatMessage";
    SimulatorMessageType["AnaChatReset"] = "AnaChatReset";
})(SimulatorMessageType = exports.SimulatorMessageType || (exports.SimulatorMessageType = {}));
//# sourceMappingURL=simulator.service.js.map