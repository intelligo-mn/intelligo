import { Injectable } from '@angular/core';

import * as SockJS from 'sockjs-client';
import * as StompJS from 'stompjs';

import { ChatMessageVM, MessageStatus } from '../models/ana-chat-vm.models';
import { ANAChatMessage, ANAMeta, EventType } from '../models/ana-chat.models';
import { UtilitiesService, Config } from '../services/utilities.service';

@Injectable()
export class StompService {
	public config: StompConfig;
	private client: StompJS.Client;
	private sockInstance: any;
	private timer: NodeJS.Timer;
	private stompHeaders: any = {};
	private consecutiveErrorsCount: number = 0;

	connectionStatus: StompConnectionStatus;

	constructor() { }

	public connect(config?: StompConfig) {
		this.clearTimer();

		this.configure(config);

		if (!this.client)
			throw Error('Client not configured!');

		this.debug('Connecting...');
		this.connectionStatus = StompConnectionStatus.Connecting;
		let headers: any = { user_id: this.config.customerId };
		this.client.connect(headers, this.onConnect, this.onError);
	}
	private clearTimer() {
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
		}
	}
	private disconnect() {
		this.clearTimer();
		if (this.client && this.client.connected) {
			this.client.disconnect(() => this.debug("WebSocket Disconnected"));
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

		this.sockInstance = new SockJS(this.config.endpoint);
		this.client = StompJS.over(this.sockInstance);
		this.connectionStatus = StompConnectionStatus.Disconnected;
		this.client.debug = (this.config.debug || this.config.debug == null ? this.debug : null);
	}
	//Should be an arrow function to follow class context
	private onConnect = (frame: StompJS.Frame) => {
		this.clearTimer();
		this.consecutiveErrorsCount = 0;
		if (this.connectionStatus == StompConnectionStatus.Connected)
			return;

		try {
			this.subscribe();
			this.connectionStatus = StompConnectionStatus.Connected;

			if (this.handleConnect)
				this.handleConnect();
		} catch (e) {
			this.debug(e);
			this.connectionStatus = StompConnectionStatus.Disconnected;
		}
	}

	private subscribe = () => {
		this.stompHeaders['user_id'] = this.config.customerId;
		let custId = this.stompHeaders['user_id'];

		this.stompHeaders['id'] = UtilitiesService.uuidv4();
		this.client.subscribe('/topic/presence', (message) => {
			this.client.send("/app/presence", this.stompHeaders, JSON.stringify({ user_id: custId }));
		}, this.stompHeaders);

		//Header: Id should be different for different subscription
		this.stompHeaders['id'] = UtilitiesService.uuidv4();

		let channel = (this.config.flowId ? '/topic/chat/customer/' + custId + "/business/" + this.config.businessId + "/flow/" + this.config.flowId : '/topic/chat/customer/' + custId + "/business/" + this.config.businessId);
		this.client.subscribe(channel, (message) => {
			this.onMessage(JSON.parse(message.body));
		}, this.stompHeaders);
		this.stompHeaders['id'] = UtilitiesService.uuidv4();
		this.client.subscribe('/queue/events/user/' + custId, (message) => {
			let msg = new ANAChatMessage(JSON.parse(message.body));
			if (msg.events) {
				for (var i = 0; i < msg.events.length; i++) {
					let event = msg.events[i];
					if (event.type == EventType.ACK) {
						this.onAck(message.headers['tid']);
					} else if (event.type == EventType.TYPING) {
						this.onTyping();
					}
				}
			}
		}, this.stompHeaders);
	}

	private onError = (error: string | StompJS.Message) => {
		this.connectionStatus = StompConnectionStatus.Disconnected;
		if (this.consecutiveErrorsCount <= Config.consecutiveErrorsThreshold) {
			this.consecutiveErrorsCount++;
			console.log(this.consecutiveErrorsCount);
			if (this.consecutiveErrorsCount == Config.consecutiveErrorsThreshold)
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
	}

	private delayReconnect(t: number) {
		this.debug(`Reconnecting in ${t / 1000} second(s)...`);
		this.timer = setTimeout(() => {
			this.connect();
		}, t);
	}

	private onAck = (msgAckId: string, delivered?: boolean) => {
		this.debug(`${delivered ? "DeliveredAck:" : "SentAck:"}` + msgAckId);
		if (this.handleAck)
			this.handleAck(msgAckId, delivered);
	};

	private onTyping = () => {
		this.debug("Typing... ");
		if (this.handleTyping)
			this.handleTyping();
	};

	private msgsIds: string[] = [];
	private onMessage = (messageBody: any) => {
		let anaMsg = new ANAChatMessage(messageBody);
		if (anaMsg.data && Object.keys(anaMsg.data).length > 0) {
			this.sendMessageReceivedAck(anaMsg.meta);
		}
		if (anaMsg.events && anaMsg.events.length > 0) {
			for (var i = 0; i < anaMsg.events.length; i++) {
				let event = anaMsg.events[i];
				if (event.type == EventType.ACK) {
					this.onAck(anaMsg.meta.id, true);
				} else if (event.type == EventType.TYPING) {
					this.onTyping();
				}
			}
		}
		if (anaMsg.data && Object.keys(anaMsg.data).length > 0) {
			if (this.handleMessageReceived) {
				if (this.msgsIds.indexOf(anaMsg.meta.id) == -1) { //handle message only if it is not already handled
					this.msgsIds.push(anaMsg.meta.id);
					this.handleMessageReceived(anaMsg);
				}
			}
		}
	}

	sendMessage(message: ANAChatMessage, threadMsgRef: ChatMessageVM) {
		let _sendMessage = () => {
			let msg = message.extract();

			this.debug("Sent Socket Message: ");
			this.debug(msg);

			let headers = this.stompHeaders;
			headers['tid'] = threadMsgRef.messageAckId;
			this.client.send(`/app/message`, headers, JSON.stringify(msg));
			threadMsgRef.status = MessageStatus.SentToServer;
			threadMsgRef.startTimeoutTimer();
		};
		threadMsgRef.retrySending = _sendMessage; //Saving the context to be used for retrying in case of failure
		_sendMessage();
	}

	typingBusy = false;
	sendTypingMessage(meta: ANAMeta) {
		if (this.typingBusy || !this.client) {
			return;
		}
		this.typingBusy = true;
		setTimeout(() => this.typingBusy = false, 1000);
		let msg = new ANAChatMessage({
			meta: UtilitiesService.getReplyMeta(meta),
			events: [{
				type: EventType.TYPING
			}]
		});
		let headers = this.stompHeaders;
		this.client.send(`/app/message`, headers, JSON.stringify(msg.extract()));
	}

	sendMessageReceivedAck(meta: ANAMeta) {
		let msg = new ANAChatMessage({
			meta: UtilitiesService.getReplyMeta(meta, false, true),
			events: [{
				type: EventType.ACK
			}]
		});
		let headers = this.stompHeaders;
		this.client.send(`/app/message`, headers, JSON.stringify(msg.extract()));
	}

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

export enum StompConnectionStatus {
	None,
	Connected,
	Disconnected,
	Connecting
}
