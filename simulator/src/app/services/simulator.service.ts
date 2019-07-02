import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as vm from "../models/chat-vm.models";
import * as models from "../models/chat.models";
import { UtilitiesService } from "../services/utilities.service";

@Injectable({ providedIn: "root" })
export class SimulatorService {
  private debug: boolean = true;

  constructor(private http: HttpClient, private utils: UtilitiesService) {
    window.onmessage = event => {
      this.logDebug("On message received from studio:");
      this.logDebug(event.data);
      let msg = event.data as SimulatorMessage;
      if (msg.type == SimulatorMessageType.IntelligoChatMessage) {
        let cfMsg = msg as IntelligoChatSimulatorMessage;
        if (this.handleMessageReceived)
          this.handleMessageReceived(
            new models.IntelligoChatMessage(cfMsg.data)
          );
      } else if (msg.type == SimulatorMessageType.IntelligoChatReset) {
        if (this.handleResetSignal) this.handleResetSignal();
      }
    };
  }
  private logDebug(msg: any) {
    if (this.debug) console.log(msg);
  }
  sendMessage(
    message: models.IntelligoChatMessage,
    threadMsgRef: vm.ChatMessageVM
  ) {
    window.parent.postMessage(
      {
        data: message,
        type: SimulatorMessageType.IntelligoChatMessage
      },
      "*"
    );
    if (threadMsgRef) threadMsgRef.status = vm.MessageStatus.ReceivedAtServer;
  }
  handleMessageReceived: (message: models.IntelligoChatMessage) => any;
  handleResetSignal: () => void;
}

export enum SimulatorMessageType {
  IntelligoChatMessage = "IntelligoChatMessage",
  IntelligoChatReset = "IntelligoChatReset"
}
export interface SimulatorMessage {
  type: SimulatorMessageType;
  data: any;
}

export interface IntelligoChatSimulatorMessage extends SimulatorMessage {
  data: models.IIntelligoChatMessage;
}
