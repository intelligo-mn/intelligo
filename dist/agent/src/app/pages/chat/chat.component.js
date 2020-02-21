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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ChatComponent_1, _a;
const core_1 = require("@angular/core");
const core_2 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const stomp_service_1 = require("../../shared/services/config/stomp.service");
const app_state_1 = require("../../app.state");
const config_service_1 = require("../../shared/services/config/config.service");
const material_1 = require("@angular/material");
const data_service_1 = require("../../shared/services/data/data.service");
const ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
const router_1 = require("@angular/router");
const models = require("../../shared/model/ana-chat.models");
const timers_1 = require("timers");
const info_dialog_service_1 = require("app/shared/services/helpers/info-dialog.service");
const end_chat_component_1 = require("app/shared/components/end-chat/end-chat.component");
let ChatComponent = ChatComponent_1 = class ChatComponent {
    constructor(state, configService, elementRef, dataService, modalService, stompService, router, dialog, infoDialog, _doc) {
        this.state = state;
        this.configService = configService;
        this.elementRef = elementRef;
        this.dataService = dataService;
        this.modalService = modalService;
        this.stompService = stompService;
        this.router = router;
        this.dialog = dialog;
        this.infoDialog = infoDialog;
        this._doc = _doc;
        this.connect = true;
        this.chatConnected = true;
        this.navMode = "side";
        this.JSON = JSON;
        this.activeSearch = false;
        this.textArea = false;
        this.chatData = {
            content: [
                {
                    customerId: "",
                    businessId: ""
                }
            ]
        };
        this.tempData = {};
        this.chatThreads = {};
        this.navIsFixed = false;
        this.scrollbarOptions = { axis: "yx", theme: "minimal-dark" };
        this.settings = {};
        this.usersTyping = {};
        this.page = 0;
        this.size = 10;
        this.totalChatPages = 0;
        this.loadingHistory = false;
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
            }
            ;
        };
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
            }
            else {
                this.selectedCustomer = null;
            }
        };
        this.stompService.handleConnect = () => {
            this.dataService.getChatDetails(0, 10000, null, this.configService.profile.loginData.businessId, 0).subscribe((resData) => {
                if (resData.error) {
                    this.infoDialog.alert('Unable to get the chats', resData.error.message);
                }
                else {
                    this.stompService.allChatsSubscription(resData.data.content);
                }
                this.loadChats();
            });
        };
        this.stompService.handleAck = (custId, ackId, delivered) => {
            try {
                if (this.chatThreads[custId]) {
                    if (delivered) {
                        let filteredMsgs = this.chatThreads[custId].filter(x => x.meta.id == ackId) || this.chatThreads[custId].filter(x => x.meta.responseTo == ackId);
                        if (filteredMsgs && filteredMsgs.length > 0) {
                            filteredMsgs[0].customData.status = 'delivered';
                        }
                    }
                    else {
                        let filteredMsgs = this.chatThreads[custId].filter(x => x.customData && x.customData.ackId == ackId);
                        if (filteredMsgs && filteredMsgs.length > 0) {
                            if (filteredMsgs[0].customData.status != 'delivered')
                                filteredMsgs[0].customData.status = 'sent';
                        }
                    }
                }
            }
            catch (e) {
                console.error(e);
            }
        };
        this.stompService.handleTyping = (custId) => {
            if (this.typingTimer) {
                clearTimeout(this.typingTimer);
                delete this.typingTimer;
            }
            this.usersTyping[custId] = true;
            this.typingTimer = timers_1.setTimeout(() => {
                this.usersTyping[custId] = false;
            }, 5000);
        };
        try {
            this.agentName = this.configService.profile.loginData.name;
            this.agentRole = this.configService.profile.loginData.roles.map(x => x.label).join(', ');
        }
        catch (e) {
            console.log(e);
        }
    }
    saveSettings() {
        localStorage.setItem('appSettings', JSON.stringify(this.settings));
    }
    loadSettings() {
        this.settings = JSON.parse(localStorage.getItem('appSettings'));
        if (!this.settings) {
            this.settings = {
                disableSounds: false
            };
        }
    }
    getConnectionStatus() {
        if (this.stompService && this.stompService.connectionStatus) {
            switch (this.stompService.connectionStatus) {
                case stomp_service_1.StompConnectionStatus.Connected: return false;
                case stomp_service_1.StompConnectionStatus.Disconnected: return (this.stompService.disconnectionType === stomp_service_1.DisconnectionType.Network) ? true : false;
            }
        }
    }
    stompServiceConnected() {
        if (this.stompService && this.stompService.connectionStatus == stomp_service_1.StompConnectionStatus.Connected)
            return true;
        return false;
    }
    newMessageNotifyUser(title = "", msg = "") {
        if (this.settings.disableSounds) {
            return;
        }
        let audio = new Audio('assets/mp3/new-msg.mp3');
        audio.play();
    }
    newChatNotifyUser(title = "", msg = "") {
        if (this.settings.disableSounds) {
            return;
        }
        let audio = new Audio('assets/mp3/new-chat.mp3');
        audio.play();
    }
    endChat() {
        if (this.selectedCustomer) {
            this.infoDialog.confirm("Confirmation", `Are you sure you want to end the chat with customer: ${this.selectedCustomer.sessionId}?`, (ok) => {
                if (ok) {
                    let d = this.dialog.open(end_chat_component_1.EndChatComponent, {
                        width: 'auto',
                        data: this.selectedCustomer.sessionId
                    });
                }
            });
        }
    }
    chatConnectDisconnect(event) {
        this.stompService.disconnectionType = stomp_service_1.DisconnectionType.Manual;
        if (!this.chatConnected) {
            this.connect = true;
            this.loadChats();
            this.stompService.connect({
                debug: true,
                endpoint: this.configService.app.webSocketEndPoint
            });
            this.stompService.storeNetworkConnectivityLogs(stomp_service_1.DisconnectionType.Manual, stomp_service_1.StompConnectionStatus.Connected);
        }
        else {
            this.connect = false;
            this.stompService.disconnect();
        }
    }
    latestMessage(cust) {
        let custChatThread = this.chatThreads[cust.customerId];
        if (custChatThread && custChatThread.length > 0) {
            return this.msgPreviewText(custChatThread[custChatThread.length - 1]);
        }
        if (cust && cust.messages && cust.messages.content && cust.messages.content.length > 0) {
            var validMsgsForPreview = cust.messages.content.filter(x => x.data.type == models.MessageType.SIMPLE || (x.data.type == models.MessageType.INPUT && x.data.content.input && x.data.content.input.val));
            return this.msgPreviewText(validMsgsForPreview[0]);
        }
        return "";
    }
    addMsgToCurrentThread(msg) {
        let thread = this.currentChatThread();
        if (thread.filter(x => x.meta.id == msg.meta.id).length > 0)
            return;
        thread.push(msg);
    }
    addMsgToThread(custId, msg) {
        if (!this.chatThreads[custId])
            this.chatThreads[custId] = [];
        if (this.chatThreads[custId].filter(x => x.meta.id == msg.meta.id).length > 0)
            return;
        this.chatThreads[custId].push(msg);
    }
    insertMsgToThread(custId, msg) {
        if (!this.chatThreads[custId])
            this.chatThreads[custId] = [];
        if (this.chatThreads[custId].filter(x => x.meta.id == msg.meta.id).length > 0)
            return;
        this.chatThreads[custId].unshift(msg);
    }
    static uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).toString().replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
    }
    scrollActiveChatToBottom() {
        let scrollEle = this.myScrollContainer.nativeElement;
        window.requestAnimationFrame(() => scrollEle.scrollTop = scrollEle.scrollHeight);
    }
    logout() {
        this.stompService.disconnect();
        this.dataService.logout();
        this.router.navigateByUrl('/');
    }
    onCustomerSelected(cust) {
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
    loadHistoryOfCustomer(cust, callback) {
        this.dataService.getHistory(cust.customerId, cust.businessId, 50, 0, null, cust.flowId).subscribe(resData => {
            try {
                let history = resData.content.reverse();
                this.chatThreads[cust.customerId] = history.filter(x => (x.data.type == 0) || (x.data.type == 2 && x.data.content.input && x.data.content.input.val));
                if (callback)
                    callback();
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    isCustomerSelected(cust) {
        if (this.selectedCustomer && this.selectedCustomer.customerId == cust.customerId)
            return true;
        return false;
    }
    isChatMessageHidden(chatMsg) {
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
    ngOnDestroy() {
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
            }
            else {
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
    onScroll(event) {
        if (this.loadingHistory)
            return;
        let scrollEle = this.myScrollContainer.nativeElement;
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
                    }
                    finally {
                        this.loadingHistory = false;
                    }
                });
            }
        }
    }
    isMe(senderType) {
        if (senderType != 0) {
            return true;
        }
        else {
            return false;
        }
    }
    isYou(senderType) {
        if (senderType != 0) {
            return false;
        }
        else {
            return true;
        }
    }
    getMsgImage(senderType) {
        if (senderType == 0) {
            return "assets/img/profiles/avatar.png";
        }
        else {
            return "assets/img/ana.svg";
        }
    }
    sendMessage() {
        let chatThread = this.currentChatThread();
        let lastMsg = chatThread[chatThread.length - 1];
        let msg = {
            data: {
                type: 2,
                content: {
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
                id: ChatComponent_1.uuidv4(),
                sessionId: this.selectedCustomer.sessionId,
                timestamp: new Date().getTime(),
                responseTo: (lastMsg ? lastMsg.meta.id : ""),
                flowId: (lastMsg ? lastMsg.meta.flowId : ""),
                currentFlowId: (lastMsg ? lastMsg.meta.currentFlowId : ""),
                previousFlowId: (lastMsg ? lastMsg.meta.previousFlowId : "")
            },
            customData: {
                ackId: ChatComponent_1.uuidv4(),
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
    optionsText(chatMsg) {
        try {
            let options = chatMsg.data.content.options;
            return options.filter(x => x.value == chatMsg.data.content.input.val)[0].title;
        }
        catch (e) {
            console.log(e);
            return "";
        }
    }
    msgPreviewText(chatMsg) {
        if (!chatMsg)
            return;
        try {
            switch (chatMsg.data.type) {
                case models.MessageType.SIMPLE:
                    return chatMsg.data.content.text;
                case models.MessageType.INPUT:
                    {
                        let inputContent = chatMsg.data.content;
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
        }
        catch (error) {
            console.log(error);
        }
    }
};
__decorate([
    core_1.ViewChild("leftSidenav2"),
    __metadata("design:type", material_1.MdSidenav)
], ChatComponent.prototype, "leftSidenav2", void 0);
__decorate([
    core_1.ViewChild("chatProfile"),
    __metadata("design:type", core_1.TemplateRef)
], ChatComponent.prototype, "chatProfile", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChatComponent.prototype, "chatId", void 0);
__decorate([
    core_1.ViewChild("scrollMe"),
    __metadata("design:type", core_1.ElementRef)
], ChatComponent.prototype, "myScrollContainer", void 0);
__decorate([
    core_1.HostListener("window:resize", ["$event"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatComponent.prototype, "onResize", null);
ChatComponent = ChatComponent_1 = __decorate([
    core_1.Component({
        selector: ".content_inner_wrapper",
        templateUrl: "./chat.component.html",
        styleUrls: ["./chat.component.scss"]
    }),
    __param(9, core_2.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [app_state_1.GlobalState,
        config_service_1.ConfigService,
        core_1.ElementRef,
        data_service_1.DataService,
        ng_bootstrap_1.NgbModal,
        stomp_service_1.StompService,
        router_1.Router,
        material_1.MdDialog, typeof (_a = typeof info_dialog_service_1.InfoDialogService !== "undefined" && info_dialog_service_1.InfoDialogService) === "function" ? _a : Object, Document])
], ChatComponent);
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map