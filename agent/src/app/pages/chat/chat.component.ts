import {
	Component,
	OnInit,
	trigger,
	state,
	style,
	AfterViewChecked,
	transition,
	animate,
	ElementRef,
	HostListener,
	HostBinding,
	ViewChild,
	Input,
	TemplateRef,
	NgZone, DoCheck
} from "@angular/core";
import { Inject, OnDestroy } from "@angular/core"
import { DOCUMENT } from "@angular/platform-browser"
import { StompService, StompConfig, ChatsResponse, StompConnectionStatus, DisconnectionType } from "../../shared/services/config/stomp.service"
import { GlobalState } from "../../app.state";
import { ConfigService, UserProfile } from "../../shared/services/config/config.service";
import { ChatCustomerInfo } from '../../shared/services/data/data.service';
import { MdSidenav, MdDialog } from "@angular/material";
import { Observable } from "rxjs";
import { DataService } from "../../shared/services/data/data.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { timestamp } from "rxjs/operator/timestamp";
import { currentId } from "async_hooks";
import { Router } from "@angular/router";
import * as models from '../../shared/model/ana-chat.models';
import { setTimeout } from "timers";
import { InfoDialogService } from "app/shared/services/helpers/info-dialog.service";
import { EndChatComponent } from "app/shared/components/end-chat/end-chat.component";

@Component({
	selector: ".content_inner_wrapper",
	templateUrl: "./chat.component.html",
	styleUrls: ["./chat.component.scss"]
})

export class ChatComponent implements OnInit, OnDestroy {
	connect: boolean = true;
	chatConnected = true;

	@ViewChild("leftSidenav2") leftSidenav2: MdSidenav;
	@ViewChild("chatProfile") chatProfile: TemplateRef<any>;
	navMode = "side";
	@Input() chatId;
	chat: any;
	recipientMedium: number
	threadId: any;
	threads: any;
	messages: any;
	term: any;
	isFocused: any;
	activeThread: any;
	activeProfile: any;
	userEmail: any;
	public newMessage: string;
	value: boolean
	closeResult: string;
	JSON = JSON;
	timestamp: any;
	activeSearch: boolean = false
	textArea: boolean = false;
	chatData = {
		content: [
			{
				customerId: "",
				businessId: ""
			}
		]
	} as ChatsResponse;
	tempData = {};
	chatThreads: {
		[custId: string]: models.ANAChatMessage[]
	} = {};

	selectedCustomer: ChatCustomerInfo;
	customersList: ChatCustomerInfo[];

	statusText: any
	lastTimeStamp: string;
	public navIsFixed: boolean = false;
	public scrollbarOptions = { axis: "yx", theme: "minimal-dark" };

	settings: AppSettings = {};

	saveSettings() {
		localStorage.setItem('appSettings', JSON.stringify(this.settings));
	}

	loadSettings() {
		this.settings = JSON.parse(localStorage.getItem('appSettings')) as AppSettings;
		if (!this.settings) {
			//Default
			this.settings = {
				disableSounds: false
			};
		}
	}

	@ViewChild("scrollMe") private myScrollContainer: ElementRef;

	constructor(
		private state: GlobalState,
		public configService: ConfigService,
		private elementRef: ElementRef,
		private dataService: DataService,
		private modalService: NgbModal,
		private stompService: StompService,
		private router: Router,
		private dialog: MdDialog,
		private infoDialog: InfoDialogService,
		@Inject(DOCUMENT) private _doc: Document
	) {
		this.loadSettings();

		this.stompService.handleMessageReceived = (msg) => {
			if (msg.data && Object.keys(msg.data).length > 0 && msg.meta.senderType != models.SenderType.AGENT) {
				this.newMessageNotifyUser();
				let custs = this.customersList.filter(x => x.customerId == msg.meta.sender.id);
				if (custs && custs.length <= 0) {
					this.customersList.unshift({
						agentId: "",
						assignedAt: 0,
						businessId: msg.meta.recipient.id,
						createdAt: msg.meta.timestamp,
						customerId: msg.meta.sender.id,
						flowId: msg.meta.flowId,
						id: msg.meta.id,
						lastMessageTime: msg.meta.timestamp,
						messages: null,
						sessionId: msg.meta.sessionId,
						status: "",
						unreadCount: 1
					});
				}

				this.addMsgToThread(msg.meta.sender.id, msg);

				if (!this.selectedCustomer || this.selectedCustomer.customerId != msg.meta.sender.id) {
					if (custs && custs.length > 0) {
						custs[0].unreadCount++;
						this.customersList = this.customersList.sort((a, b) => {
							return b.unreadCount - a.unreadCount;
						});
					}
				}

				if (this.selectedCustomer && this.selectedCustomer.customerId == msg.meta.sender.id) {
					this.scrollActiveChatToBottom();
				}
			};
		}

		this.stompService.handleNewChat = (custInfo) => {
			this.customersList.unshift(custInfo);
			this.loadHistoryOfCustomer(custInfo, () => {
				this.scrollActiveChatToBottom();
			});
			this.newChatNotifyUser("New chat", "Customer: " + custInfo.customerId);
		};
		this.stompService.handleChatDeallocation = (custInfo) => {
			this.customersList.splice(this.customersList.findIndex(x => x.customerId == custInfo.customerId), 1);
			if (this.customersList.length > 0) {
				this.selectedCustomer = this.customersList[0];
			} else {
				this.selectedCustomer = null;
			}
		};

		this.stompService.handleConnect = () => {
			this.dataService.getChatDetails(0, 10000, null, this.configService.profile.loginData.businessId, 0).subscribe((resData) => {
				if (resData.error) {
					this.infoDialog.alert('Unable to get the chats', resData.error.message);
				} else {
					this.stompService.allChatsSubscription(resData.data.content);
				}
				this.loadChats();

			});
		};

		this.stompService.handleAck = (custId: string, ackId: string, delivered?: boolean) => {
			try {
				if (this.chatThreads[custId]) {
					if (delivered) {
						let filteredMsgs = this.chatThreads[custId].filter(x => x.meta.id == ackId) || this.chatThreads[custId].filter(x => x.meta.responseTo == ackId);
						if (filteredMsgs && filteredMsgs.length > 0) {
							filteredMsgs[0].customData.status = 'delivered';
						}
					} else {
						let filteredMsgs = this.chatThreads[custId].filter(x => x.customData && x.customData.ackId == ackId);
						if (filteredMsgs && filteredMsgs.length > 0) {
							if (filteredMsgs[0].customData.status != 'delivered')
								filteredMsgs[0].customData.status = 'sent';
						}
					}
				}
			} catch (e) {
				console.error(e);
			}
		};

		this.stompService.handleTyping = (custId: string) => {
			if (this.typingTimer) {
				clearTimeout(this.typingTimer);
				delete this.typingTimer;
			}
			this.usersTyping[custId] = true;
			this.typingTimer = setTimeout(() => {
				this.usersTyping[custId] = false;
			}, 5000);
		};

		try {
			this.agentName = this.configService.profile.loginData.name;
			this.agentRole = this.configService.profile.loginData.roles.map(x => x.label).join(', ');
		} catch (e) {
			console.log(e);
		}
	}

	getConnectionStatus() {
		if (this.stompService && this.stompService.connectionStatus) {
			switch (this.stompService.connectionStatus) {
				case StompConnectionStatus.Connected: return false;
				case StompConnectionStatus.Disconnected: return (this.stompService.disconnectionType === DisconnectionType.Network) ? true : false;
			}
		}
	}

	stompServiceConnected() {
		if (this.stompService && this.stompService.connectionStatus == StompConnectionStatus.Connected)
			return true;
		return false;
	}

	//cust[0].customerId, this.msgPreviewText(msg)
	newMessageNotifyUser(title: string = "", msg: string = "") {
		if (this.settings.disableSounds) {
			return;
		}
		let audio = new Audio('assets/mp3/new-msg.mp3');
		audio.play();
		// this.notifyUser(title, msg);
	}

	newChatNotifyUser(title: string = "", msg: string = "") {
		if (this.settings.disableSounds) {
			return;
		}
		let audio = new Audio('assets/mp3/new-chat.mp3');
		audio.play();
		// this.notifyUser(title, msg);
	}

	typingTimer: NodeJS.Timer;
	usersTyping: {
		[custId: string]: boolean;
	} = {};

	endChat() {
		if (this.selectedCustomer) {
			this.infoDialog.confirm("Confirmation", `Are you sure you want to end the chat with customer: ${this.selectedCustomer.sessionId}?`, (ok) => {
				if (ok) {
					let d = this.dialog.open(EndChatComponent, {
						width: 'auto',
						data: this.selectedCustomer.sessionId
					});
				}
			});
		}
	}
	chatConnectDisconnect(event) {
		this.stompService.disconnectionType = DisconnectionType.Manual
		if (!this.chatConnected) {
			this.connect = true;
			this.loadChats();
			this.stompService.connect({
				debug: true,
				endpoint: this.configService.app.webSocketEndPoint
			});
			this.stompService.storeNetworkConnectivityLogs(DisconnectionType.Manual, StompConnectionStatus.Connected)
		}
		else {
			this.connect = false;
			this.stompService.disconnect();
		}
	}

	// notifyUser(title, body) {
	// 	if (!("Notification" in window)) {
	// 		return;
	// 	}
	// 	let notify = (title, body, icon = 'https://www.ana.chat/favicon.ico') => {
	// 		var n = new Notification(title, {
	// 			body: body,
	// 			icon: icon
	// 		});			
	// 	};
	// 	if ((<any>Notification).permission === "granted") {
	// 		notify(title, body);
	// 	} else if ((<any>Notification).permission !== "denied") {
	// 		Notification.requestPermission(function (permission) {
	// 			if (permission === "granted") {
	// 				notify(title, body);
	// 			}
	// 		});
	// 	}
	// }

	agentName: string;
	agentRole: string;

	latestMessage(cust: ChatCustomerInfo) {
		let custChatThread = this.chatThreads[cust.customerId];
		if (custChatThread && custChatThread.length > 0) {
			return this.msgPreviewText(custChatThread[custChatThread.length - 1]);
		}
		if (cust && cust.messages && cust.messages.content && cust.messages.content.length > 0) {
			var validMsgsForPreview = cust.messages.content.filter(x => x.data.type == models.MessageType.SIMPLE || (x.data.type == models.MessageType.INPUT && (<models.InputContent>x.data.content).input && (<models.InputContent>x.data.content).input.val))
			return this.msgPreviewText(validMsgsForPreview[0]);
		}
		return "";
	}

	searchText: string;

	addMsgToCurrentThread(msg: any) {
		let thread = this.currentChatThread();
		if (thread.filter(x => x.meta.id == msg.meta.id).length > 0)
			return;
		thread.push(msg);
	}

	addMsgToThread(custId: string, msg: models.ANAChatMessage) {
		if (!this.chatThreads[custId])
			this.chatThreads[custId] = [];
		if (this.chatThreads[custId].filter(x => x.meta.id == msg.meta.id).length > 0)
			return;
		this.chatThreads[custId].push(msg);
	}

	insertMsgToThread(custId: string, msg: any) {
		if (!this.chatThreads[custId])
			this.chatThreads[custId] = [];
		if (this.chatThreads[custId].filter(x => x.meta.id == msg.meta.id).length > 0)
			return;
		this.chatThreads[custId].unshift(msg);
	}

	static uuidv4() {
		return (<any>[1e7] + -1e3 + -4e3 + -8e3 + -1e11).toString().replace(/[018]/g,
			c => (<any>c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> <any>c / 4).toString(16)
		)
	}

	scrollActiveChatToBottom() {

		let scrollEle = this.myScrollContainer.nativeElement as HTMLDivElement;
		// window.requestAnimationFrame(() => {
		// 	scrollEle.children.item(scrollEle.children.length - 1).scrollIntoView({ behavior: 'instant' });
		// });

		// console.log(scrollEle);
		// console.log(scrollEle.scrollTo);
		// console.log(scrollEle.scrollBy);

		window.requestAnimationFrame(() => scrollEle.scrollTop = scrollEle.scrollHeight);
	}

	logout() {
		this.stompService.disconnect();
		this.dataService.logout();
		this.router.navigateByUrl('/');
	}
	onCustomerSelected(cust: ChatCustomerInfo) {
		if (this.selectedCustomer) {
			this.selectedCustomer.draftMsgText = this.newMessage;
		}

		this.newMessage = cust.draftMsgText;
		this.selectedCustomer = cust;
		this.selectedCustomer.unreadCount = 0;

		if (!this.chatThreads[cust.customerId] || this.chatThreads[cust.customerId].length <= 5) {
			this.loadHistoryOfCustomer(cust, () => {
				this.scrollActiveChatToBottom();
			});
		}
		else {
			this.scrollActiveChatToBottom();
		}
	}

	loadHistoryOfCustomer(cust: ChatCustomerInfo, callback?: () => void) {
		this.dataService.getHistory(cust.customerId, cust.businessId, 50, 0, null, cust.flowId).subscribe(resData => {
			try {
				let history: any[] = resData.content.reverse();
				this.chatThreads[cust.customerId] = history.filter(x => (x.data.type == 0) || (x.data.type == 2 && x.data.content.input && x.data.content.input.val));//Filtering only text inputs for now.
				if (callback)
					callback();
			}
			catch (e) {
				console.log(e);
			}
		});
	}

	isCustomerSelected(cust: ChatCustomerInfo) {
		if (this.selectedCustomer && this.selectedCustomer.customerId == cust.customerId)
			return true;
		return false;
	}
	isChatMessageHidden(chatMsg: any) {
		const HIDE = true;

		if (chatMsg.data.type == 2 && (!chatMsg.data.content.input || !chatMsg.data.content.input.val)) {
			return HIDE;
		}
		return !HIDE;
	}

	chatsPrev() {
		this.page--;
		this.loadChats();
	}

	chatsNext() {
		this.page++;
		this.loadChats();
	}

	page: number = 0;
	size: number = 10;
	totalChatPages: number = 0;
	ngOnInit() {
		if (window.innerWidth < 992) {
			this.navMode = "over";
			this.leftSidenav2.opened = false;
		}
		if (window.innerWidth > 992) {
			this.navMode = "side";
			this.leftSidenav2.open();
		}
		if (!this.configService.profile) {
			this.router.navigateByUrl('/');
			return;
		}
		this.stompSetup();
		this.loadChats();
	}

	ngOnDestroy(): void {
		this.logout();
	}

	stompSetup() {
		this.stompService.connect({
			debug: true,
			endpoint: this.configService.app.webSocketEndPoint
		});
	}

	searchChats() {
		this.page = 0;
		this.loadChats();
	}

	loadChats() {
		let selectedCustomerId = this.selectedCustomer ? this.selectedCustomer.customerId : undefined;

		this.dataService.getChatDetails(this.page, this.size, this.searchText, this.configService.profile.loginData.businessId).subscribe((resData) => {
			if (resData.error) {
				this.infoDialog.alert('Unable to get the chats', resData.error.message);
			} else {
				this.customersList = resData.data.content.sort((a, b) => a.lastMessageTime - b.lastMessageTime);
				this.page = resData.data.number;
				this.totalChatPages = resData.data.totalPages;

				this.customersList.forEach(x => {
					this.chatThreads[x.customerId] = [];
				});

				if (selectedCustomerId) {
					let selectedCustList = this.customersList.filter(x => x.customerId == selectedCustomerId);
					if (selectedCustList && selectedCustList.length > 0) {
						this.onCustomerSelected(selectedCustList[0]);
					}
				}
			}
		});
	}

	loadingHistory = false;
	onScroll(event: UIEvent) {
		if (this.loadingHistory)
			return;

		let scrollEle = this.myScrollContainer.nativeElement as HTMLDivElement;
		let oldScrollHeight = scrollEle.scrollHeight;
		if (scrollEle.scrollTop <= 2) {
			let thread = this.currentChatThread();
			if (thread && thread.length > 0) {
				this.loadingHistory = true;
				this.dataService.getHistory(this.selectedCustomer.customerId, this.selectedCustomer.businessId, 50, 0, thread[0].meta.timestamp, this.selectedCustomer.flowId).subscribe(resData => {
					try {
						resData.content.forEach(x => {
							if (thread.filter(msg => msg.meta.id == x.meta.id).length > 0)
								return;
							thread.unshift(x);
						});
						window.requestAnimationFrame(() => {
							scrollEle.scrollTop = (scrollEle.scrollHeight - oldScrollHeight);
						});
					} finally {
						this.loadingHistory = false;
					}
				})
			}
		}
	}

	isMe(senderType) {
		if (senderType != 0) {
			return true;
		} else {
			return false;
		}
	}
	isYou(senderType) {
		if (senderType != 0) {
			return false;
		} else {
			return true;
		}
	}
	getMsgImage(senderType) {
		if (senderType == 0) {
			return "assets/img/profiles/avatar.png"
		}
		else {
			return "assets/img/ana.svg"
		}
	}


	sendMessage() {
		let chatThread = this.currentChatThread();
		let lastMsg = chatThread[chatThread.length - 1];

		let msg: models.ANAChatMessage = {
			data: {
				type: 2,
				content: <models.TextInputContent>{
					inputType: models.InputType.TEXT,
					input: {
						val: this.newMessage
					},
					mandatory: 1,
					multiple: 0,
					textInputAttr: {
						multiLine: 0,
						minLength: 0,
						maxLength: 0,
						placeHolder: "",
						defaultText: ""
					}
				}
			},
			meta: {
				sender: {
					id: this.selectedCustomer.businessId,
					medium: 3
				},
				recipient: {
					id: this.selectedCustomer.customerId,
					medium: (lastMsg ? lastMsg.meta.recipient.medium : 3)
				},
				senderType: 3,
				id: ChatComponent.uuidv4(),
				sessionId: this.selectedCustomer.sessionId,
				timestamp: new Date().getTime(),
				responseTo: (lastMsg ? lastMsg.meta.id : ""),
				flowId: (lastMsg ? lastMsg.meta.flowId : ""),
				currentFlowId: (lastMsg ? lastMsg.meta.currentFlowId : ""),
				previousFlowId: (lastMsg ? lastMsg.meta.previousFlowId : "")
			},
			customData: {
				ackId: ChatComponent.uuidv4(),
				status: 'pending'
			}
		};

		this.stompService.sendMessage(msg);
		chatThread.push(msg);
		this.scrollActiveChatToBottom();
		this.newMessage = null;
	}

	currentChatThread() {
		if (this.selectedCustomer)
			return this.chatThreads[this.selectedCustomer.customerId];
		return null;
	}

	@HostListener("window:resize", ["$event"])
	onResize(event) {
		if (event.target.innerWidth < 992) {
			this.navMode = "over";
			this.leftSidenav2.close();
		}
		if (event.target.innerWidth > 992) {
			this.navMode = "side";
			this.leftSidenav2.open();
		}
	}

	optionsText(chatMsg: any) {
		try {
			let options = chatMsg.data.content.options as any[];
			return options.filter(x => x.value == chatMsg.data.content.input.val)[0].title;
		} catch (e) {
			console.log(e);
			return "";
		}
	}

	msgPreviewText(chatMsg: models.ANAChatMessage) {
		if (!chatMsg) return;
		try {
			switch (chatMsg.data.type) {
				case models.MessageType.SIMPLE:
					return (<models.SimpleContent>chatMsg.data.content).text;
				case models.MessageType.INPUT:
					{
						let inputContent = (<models.InputContent>chatMsg.data.content);
						switch (inputContent.inputType) {
							case models.InputType.TEXT:
							case models.InputType.EMAIL:
							case models.InputType.PHONE:
							case models.InputType.NUMERIC:
								return (inputContent.input ? inputContent.input.val : "");
							case models.InputType.OPTIONS:
								return this.optionsText(chatMsg);
						}
						break;
					}
			}
		} catch (error) {
			console.log(error);
		}
	}
}

export interface meta {
	content: {
		text: string,
		mandatory
	}
}

export interface AppSettings {
	disableSounds?: boolean;
}