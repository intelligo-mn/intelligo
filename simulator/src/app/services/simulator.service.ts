import { Injectable } from '@angular/core';
import * as models from '../models/ana-chat.models';
import * as vm from '../models/ana-chat-vm.models';
import * as jsonpath from 'jsonpath';

import { Http, Headers, URLSearchParams } from '@angular/http';
import { UtilitiesService } from '../services/utilities.service';
@Injectable()
export class SimulatorService {

	private debug: boolean = true;

	constructor(private http: Http, private utils: UtilitiesService) {
		window.onmessage = (event) => {
			this.logDebug('On message received from studio:');
			this.logDebug(event.data);
			let msg = event.data as SimulatorMessage;
			if (msg.type == SimulatorMessageType.AnaChatMessage) {
				let cfMsg = (msg as AnaChatSimulatorMessage);
				if (this.handleMessageReceived)
					this.handleMessageReceived(new models.ANAChatMessage(cfMsg.data));
			} else if (msg.type == SimulatorMessageType.AnaChatReset) {
				if (this.handleResetSignal)
					this.handleResetSignal();
			}
		}
	}
	private logDebug(msg: any) {
		if (this.debug)
			console.log(msg);
	}
	sendMessage(message: models.ANAChatMessage, threadMsgRef: vm.ChatMessageVM) {
		window.parent.postMessage({
			data: message,
			type: SimulatorMessageType.AnaChatMessage
		}, "*");
		if (threadMsgRef)
			threadMsgRef.status = vm.MessageStatus.ReceivedAtServer;
	}
	handleMessageReceived: (message: models.ANAChatMessage) => any;
	handleResetSignal: () => void;
}

export enum SimulatorMessageType {
	AnaChatMessage = 'AnaChatMessage', AnaChatReset = 'AnaChatReset'
}
export interface SimulatorMessage {
	type: SimulatorMessageType;
	data: any;
}

export interface AnaChatSimulatorMessage extends SimulatorMessage {
	data: models.IANAChatMessage;
}
