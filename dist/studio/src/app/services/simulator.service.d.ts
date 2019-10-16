import { SimulatorFrameComponent } from '../components/studio/simulator-frame/simulator-frame.component';
import * as models from '../models/chatflow.models';
import * as chatModels from '../models/intelligo-chat.models';
import { GlobalsService } from '../services/globals.service';
import { InfoDialogService } from '../services/info-dialog.service';
import { HttpClient } from '@angular/common/http';
export declare class SimulatorService {
    private http;
    private globals;
    private infoDialog;
    private debug;
    private chatFlow;
    private state;
    private simulatorFrame;
    simulatorBusinessId: string;
    simulatorCustomerId: string;
    constructor(http: HttpClient, globals: GlobalsService, infoDialog: InfoDialogService);
    init(chatFlow: models.ChatNode[], simulatorFrame: SimulatorFrameComponent): void;
    handleIncomingMessage(message: chatModels.IntelligoChatMessage): void;
    pushMessageToClient(message: chatModels.IntelligoChatMessage): void;
    pushResetToClient(): void;
    private processIncomingMessage;
    private gotoNextNode;
    private getNodeById;
    private getNodeButtonById;
    private getNodeButtonByType;
    private getCarouselButtonById;
    private saveVariable;
    private logDebug;
    private processVerbsForChatNode;
    private replaceTxt;
    private jsonEscape;
    private processVerbs;
    private processNode;
    private prepareReplyAndSend;
    private convertSection;
    private convertButtons;
    private convertButtonTypeToInputType;
    private convertCarouselButtonType;
    private convertButtonType;
    private processConditionNode;
    private match;
}
export interface SimulatorState {
    currentNode?: models.ChatNode;
    currentSection?: models.Section;
    variables?: {
        [key: string]: string;
    };
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
    data: chatModels.IntelligoChatMessage;
}
