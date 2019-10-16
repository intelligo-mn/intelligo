import * as vm from '../models/ana-chat-vm.models';
import * as models from '../models/ana-chat.models';
import { UtilitiesService } from '../services/utilities.service';
import { HttpClient } from '@angular/common/http';
export declare class SimulatorService {
    private http;
    private utils;
    private debug;
    constructor(http: HttpClient, utils: UtilitiesService);
    private logDebug;
    sendMessage(message: models.ANAChatMessage, threadMsgRef: vm.ChatMessageVM): void;
    handleMessageReceived: (message: models.ANAChatMessage) => any;
    handleResetSignal: () => void;
}
export declare enum SimulatorMessageType {
    AnaChatMessage = "AnaChatMessage",
    AnaChatReset = "AnaChatReset"
}
export interface SimulatorMessage {
    type: SimulatorMessageType;
    data: any;
}
export interface AnaChatSimulatorMessage extends SimulatorMessage {
    data: models.IANAChatMessage;
}
