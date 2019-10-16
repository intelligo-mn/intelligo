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
const material_1 = require("@angular/material");
const platform_browser_1 = require("@angular/platform-browser");
const hammer = require("hammerjs");
const vm = require("../../models/ana-chat-vm.models");
const models = require("../../models/ana-chat.models");
const api_service_1 = require("../../services/api.service");
const chain_delay_service_1 = require("../../services/chain-delay.service");
const info_dialog_service_1 = require("../../services/info-dialog.service");
const simulator_service_1 = require("../../services/simulator.service");
const stomp_service_1 = require("../../services/stomp.service");
const utilities_service_1 = require("../../services/utilities.service");
let ChatThreadComponent = class ChatThreadComponent {
    constructor(stompService, apiService, dialog, simulator, sanitizer, infoDialog, chainDelayService) {
        this.stompService = stompService;
        this.apiService = apiService;
        this.dialog = dialog;
        this.simulator = simulator;
        this.sanitizer = sanitizer;
        this.infoDialog = infoDialog;
        this.chainDelayService = chainDelayService;
        this.isMin = false;
        this.isMute = false;
        this.carItemWidth = 245;
        this.fetchingHistory = false;
        this.lastScrollTop = 0;
        this._handleMessageReceivedDelegate = message => {
            if (this.settings &&
                this.settings.stompConfig &&
                this.settings.stompConfig.debug) {
                console.log("Socket Message Received: ");
                console.log(message);
            }
            switch (message.data.type) {
                case models.MessageType.INPUT: {
                    this.chainDelayService.delay(queueLength => {
                        this.chatInput.resetInputs();
                        this.chatInput.setInput(new vm.ChatInputItemVM(message));
                        this.chatThread.removeTyping();
                        this.textInputFocus();
                    }, 0);
                    break;
                }
                case models.MessageType.SIMPLE:
                case models.MessageType.CAROUSEL: {
                    this.chatThread.setTyping();
                    this.chainDelayService.delay(queueLength => {
                        let msg = new vm.ChatMessageVM(message, vm.Direction.Incoming, "");
                        this.chatThread.addMessage(msg);
                        this.notifyNewMsg();
                        if (message.data.type == models.MessageType.CAROUSEL) {
                            let carItemsWithOptions = msg
                                .carouselMessageData()
                                .content.items.filter(x => x.options && x.options.length > 0)
                                .length;
                            if (carItemsWithOptions > 0)
                                this.chatInput.resetInputs();
                        }
                        if (queueLength > 0)
                            this.chatThread.setTyping();
                    }, 2000);
                    break;
                }
                default:
                    console.log(`Unsupported message type: ${models.MessageType[message.data.type]}`);
            }
        };
        this.MH = new ModelHelpers();
        this.chatThread = new vm.ChatThreadVM(this.sanitizer);
        this.chatInput = new vm.ChatInputVM(this.dialog, this.chatThread, this.apiService, this.stompService, this, this.sanitizer);
    }
    ngAfterViewInit() {
        if (this.chatThreadView)
            this.chatThread.chatThreadView = this.chatThreadView.nativeElement;
    }
    connectionStatusMessage() {
        if (!this.stompService)
            return "";
        switch (this.stompService.connectionStatus) {
            case stomp_service_1.StompConnectionStatus.Connected:
                return "Available";
            case stomp_service_1.StompConnectionStatus.Connecting:
                return "Trying to connect...";
            case stomp_service_1.StompConnectionStatus.Disconnected:
                return "Not available";
            default:
                return "";
        }
    }
    setMin(min) {
        this.isMin = min;
    }
    scrollCarousel(carId, direction) {
        if (this.carouselContainers && this.carouselContainers.length > 0) {
            let carousels = this.carouselContainers
                .map(x => x.nativeElement)
                .filter(x => x.classList.contains(carId));
            if (carousels) {
                let car = carousels[0];
                if (direction == "right") {
                    if (car.scrollBy) {
                        car.scrollBy({ behavior: "smooth", left: this.carItemWidth });
                    }
                    else {
                        car.scrollLeft += this.carItemWidth;
                    }
                }
                else if (direction == "left") {
                    if (car.scrollBy) {
                        car.scrollBy({ behavior: "smooth", left: -this.carItemWidth });
                    }
                    else {
                        car.scrollLeft -= this.carItemWidth;
                    }
                }
            }
        }
    }
    canScrollCarousel(carId, direction) {
        return true;
    }
    isLastInMessageGroup(msg) {
        let msgsOnly = this.chatThread.messages.filter(x => x.getMessageContentType() != models.MessageContentType.Typing);
        let index = msgsOnly.indexOf(msg);
        if (index != -1) {
            if (index >= msgsOnly.length - 1)
                return true;
            if (msgsOnly[index].direction != msgsOnly[index + 1].direction)
                return true;
        }
        return false;
    }
    isLastMessage(msg) {
        let msgsOnly = this.chatThread.messages.filter(x => x.getMessageContentType() != models.MessageContentType.Typing);
        let index = msgsOnly.indexOf(msg);
        return index == msgsOnly.length - 1;
    }
    handleCarouselClick(chatMessage, carOption) {
        let carMsg = chatMessage.carouselMessageData();
        if (!carMsg.content.input)
            carMsg.content.input = {
                val: ""
            };
        if (carOption.type == models.ButtonType.URL) {
            let v = JSON.parse(carOption.value);
            carMsg.content.input.val = v.value;
            window.open(v.url, "_blank");
        }
        else
            carMsg.content.input.val = carOption.value;
        let msg = this.chatThread.addTextReply(carOption.title, utilities_service_1.UtilitiesService.uuidv4());
        this._sendMessageDelegate(new models.ANAChatMessage({
            meta: utilities_service_1.UtilitiesService.getReplyMeta(chatMessage.meta),
            data: carMsg
        }), msg);
        this.chatInput.resetInputs();
    }
    insertThreadMessageForCarouselInput(chatMessage) {
        try {
            let carMsg = chatMessage.carouselMessageData();
            let msg = null;
            carMsg.content.items.forEach(x => {
                try {
                    x.options.forEach(y => {
                        try {
                            let value = "";
                            if (y.type == models.ButtonType.URL) {
                                let v = JSON.parse(y.value);
                                value = v.value;
                            }
                            else
                                value = y.value;
                            if (value == carMsg.content.input.val)
                                msg = this.chatThread.addTextReply(y.title, "", chatMessage.meta.timestamp, true);
                        }
                        catch (e) {
                            console.log(e);
                        }
                    });
                }
                catch (e) {
                    console.log(e);
                }
            });
            return msg;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    chatThreadOnScroll(event) {
        if (!this.chatThread.chatThreadView)
            return;
        if (!this.settings || this.settings.simulatorMode)
            return;
        let currentScrollTop = this.chatThread.chatThreadView.scrollTop;
        if (currentScrollTop < this.lastScrollTop) {
            if (this.fetchingHistory)
                return;
            if (this.chatThread.chatThreadView) {
                if (this.chatThread.chatThreadView.scrollTop <= 2) {
                    this.fetchingHistory = true;
                    this.loadHistory(() => (this.fetchingHistory = false));
                }
            }
        }
        this.lastScrollTop = currentScrollTop;
    }
    chatTextInputOnFocus() {
        this.chatThread.scrollLastIntoView(1000);
    }
    textInputFocus() {
        let ele = this.inputContainerRef.nativeElement;
        if (ele) {
            setTimeout(() => {
                let inputEle = ele.querySelector("#chat-text");
                if (inputEle)
                    inputEle.focus();
            }, 100);
        }
    }
    loadHistory(next) {
        if (!this.settings || this.settings.simulatorMode)
            return;
        let oldMsgTimestamp = this.chatThread.messages && this.chatThread.messages.length > 0
            ? this.chatThread.messages[0].meta.timestamp
            : null;
        let oldScrollHeight = null;
        if (this.chatThread.chatThreadView)
            oldScrollHeight = this.chatThread.chatThreadView.scrollHeight;
        this.apiService.fetchHistory(oldMsgTimestamp).subscribe(resp => {
            try {
                let chatMsgs = resp.content.map(x => new models.ANAChatMessage(x));
                for (let i = 0; i < chatMsgs.length; i++) {
                    let chatMsg = chatMsgs[i];
                    let direction = chatMsg.meta.recipient.id == this.stompService.config.businessId
                        ? vm.Direction.Outgoing
                        : vm.Direction.Incoming;
                    switch (chatMsg.data.type) {
                        case models.MessageType.CAROUSEL:
                            if (direction == vm.Direction.Incoming)
                                this.chatThread.addMessage(new vm.ChatMessageVM(chatMsg, direction, ""), true);
                            else if (direction == vm.Direction.Outgoing)
                                this.insertThreadMessageForCarouselInput(new vm.ChatMessageVM(chatMsg, direction, ""));
                            break;
                        case models.MessageType.SIMPLE:
                            if (direction == vm.Direction.Incoming)
                                this.chatThread.addMessage(new vm.ChatMessageVM(chatMsg, direction, ""), true);
                            break;
                        case models.MessageType.INPUT:
                            if (direction == vm.Direction.Outgoing) {
                                this.chatInput.insertThreadMessageForInput(new vm.ChatInputItemVM(chatMsg));
                            }
                            break;
                        default:
                            break;
                    }
                }
                if (!oldMsgTimestamp) {
                    if (chatMsgs[0] &&
                        chatMsgs[0].data.type == models.MessageType.INPUT) {
                        let inputContent = chatMsgs[0].data
                            .content;
                        if (!inputContent.input ||
                            Object.keys(inputContent.input).length <= 0)
                            this.chatInput.setInput(new vm.ChatInputItemVM(chatMsgs[0]));
                    }
                    this.chatThread.scrollToLast();
                }
                else {
                    if (oldScrollHeight && this.chatThread.chatThreadView) {
                        window.requestAnimationFrame(() => {
                            this.chatThread.chatThreadView.scrollTop =
                                this.chatThread.chatThreadView.scrollHeight - oldScrollHeight;
                        });
                    }
                }
            }
            catch (e) {
                console.log(e);
            }
            if (next)
                next();
        }, err => {
            if (next)
                next();
        });
    }
    removeConsecutiveErrorsMessage() {
        let oldMsgIdx = this.chatThread.messages.findIndex(x => x.messageAckId == utilities_service_1.Config.consecutiveErrorsMessageAckId);
        if (oldMsgIdx != -1)
            this.chatThread.messages.splice(oldMsgIdx, 1);
    }
    notifyNewMsg() {
        if (this.settings.appConfig.msgSounds &&
            document.visibilityState != "visible" &&
            !this.isMute) {
            let audio = new Audio("assets/sounds/new-msg.mp3");
            audio.play();
        }
    }
    openWindow(url) {
        if (typeof url == "string")
            window.open(url);
        else if (typeof url == "object") {
            window.open(url.changingThisBreaksApplicationSecurity);
        }
    }
    viewImage(url) {
        this.fullScreenImage = url;
        let imgContainer = document.querySelector("div.img-container");
        let image = document.querySelector("div.img-container>img");
        if (imgContainer && image) {
            image.alt = "";
            image.style.transform = "";
            imgContainer.style.transform = "";
            this.setupImageViewerGestures(imgContainer, image);
        }
    }
    viewVideo(url) {
        this.fullScreenVideo = url;
    }
    closeImageViewer() {
        this.fullScreenImage = null;
        this.destroyHammer();
    }
    closeVideoViewer() {
        this.fullScreenVideo = null;
    }
    destroyHammer() {
        if (this.hammerManager) {
            this.hammerManager.destroy();
            delete this.hammerManager;
        }
    }
    setupImageViewerGestures(imgContainer, image) {
        this.destroyHammer();
        if (!utilities_service_1.UtilitiesService.isMobile()) {
            return;
        }
        this.hammerManager = new hammer.Manager(image);
        let pinch = new hammer.Pinch();
        let pan = new hammer.Pan();
        pinch.recognizeWith(pan);
        this.hammerManager.add([pinch, pan]);
        let adjustScale = 1;
        let adjustDeltaX = 0;
        let adjustDeltaY = 0;
        let currentScale = null;
        let currentDeltaX = null;
        let currentDeltaY = null;
        imgContainer.ontouchstart = function (e) {
            e.preventDefault();
        };
        this.hammerManager.on("pinch pan", function (ev) {
            let transforms = [];
            currentScale = adjustScale * ev.scale;
            currentDeltaX = adjustDeltaX + ev.deltaX / currentScale;
            currentDeltaY = adjustDeltaY + ev.deltaY / currentScale;
            transforms.push(`scale(${currentScale})`);
            transforms.push(`translate(${currentDeltaX}px,${currentDeltaY}px)`);
            imgContainer.style.transform = transforms.join(" ");
        });
        this.hammerManager.on("panend pinchend", function (ev) {
            adjustScale = currentScale;
            adjustDeltaX = currentDeltaX;
            adjustDeltaY = currentDeltaY;
        });
    }
    getStarted(clearThread, askConfirmation) {
        if (askConfirmation) {
            this.infoDialog.confirm("Start a fresh chat?", "Restarting the chat will clear current chat messages. Are you sure?", ok => {
                if (ok) {
                    this.getStarted(true, false);
                }
            }, "Yes", "No");
            return;
        }
        if (clearThread) {
            this.fetchingHistory = true;
            setTimeout(() => (this.fetchingHistory = false), 1000);
            this.chatThread.messages = [];
            this.chatInput.resetInputs();
        }
        let firstMsg = new models.ANAChatMessage({
            meta: {
                sender: {
                    id: this.stompService.config.businessId,
                    medium: 3
                },
                recipient: {
                    id: this.stompService.config.customerId,
                    medium: 3
                },
                senderType: models.SenderType.USER,
                flowId: this.stompService.config.flowId,
                previousFlowId: this.stompService.config.flowId,
                currentFlowId: this.stompService.config.flowId,
                timestamp: new Date().getTime()
            },
            data: {
                type: 2,
                content: {
                    inputType: models.InputType.OPTIONS,
                    mandatory: 1,
                    options: [
                        {
                            title: "Get Started",
                            value: "GetStarted"
                        }
                    ],
                    input: {
                        val: ""
                    }
                }
            },
            events: [
                {
                    type: models.EventType.SET_SESSION_DATA,
                    data: JSON.stringify(utilities_service_1.UtilitiesService.settings.appConfig.initVerbs)
                }
            ]
        });
        let msg = new vm.ChatMessageVM(firstMsg, vm.Direction.Outgoing, utilities_service_1.UtilitiesService.uuidv4());
        this._sendMessageDelegate(new models.ANAChatMessage({
            meta: utilities_service_1.UtilitiesService.getReplyMeta(firstMsg.meta),
            data: firstMsg.data,
            events: firstMsg.events
        }), msg);
    }
    ngOnInit() {
        this.settings = utilities_service_1.UtilitiesService.settings;
        if (this.settings && this.settings.stompConfig) {
            this._sendMessageDelegate = (a, b) => this.stompService.sendMessage(a, b);
            this.stompService.handleMessageReceived = this._handleMessageReceivedDelegate;
            this.stompService.handleConnect = () => {
                if (this.chatThread.messages.length <= 0) {
                    this.getStarted(false, false);
                }
                else {
                    this.removeConsecutiveErrorsMessage();
                    let pendingMsgs = this.chatThread.messages.filter(x => x.status == vm.MessageStatus.SentTimeout ||
                        (x.status == vm.MessageStatus.SentToServer && x.retrySending));
                    pendingMsgs.forEach(x => x.retrySending());
                }
            };
            this.stompService.handleAck = (messageAckId, deliveredAck) => {
                if (deliveredAck) {
                    let msg = this.chatThread.messages.find(x => x.meta.id == messageAckId);
                    if (msg) {
                        msg.status = vm.MessageStatus.DelieveredToTarget;
                        msg.clearTimeoutTimer();
                    }
                }
                else {
                    let msg = this.chatThread.messages.find(x => x.messageAckId == messageAckId);
                    if (msg) {
                        msg.status = vm.MessageStatus.ReceivedAtServer;
                        msg.clearTimeoutTimer();
                    }
                }
            };
            this.stompService.handleTyping = () => {
                this.chatThread.setTyping();
            };
            this.stompService.handleConsecutiveErrorsState = () => {
                this.removeConsecutiveErrorsMessage();
                this.chatThread.addTextIncoming(utilities_service_1.Config.consecutiveErrorsMessageText, utilities_service_1.Config.consecutiveErrorsMessageAckId);
            };
            this.loadHistory(() => {
                try {
                    if (window.parent && window.parent.postMessage) {
                        window.parent.postMessage({
                            type: "LOADED"
                        }, "*");
                    }
                }
                catch (e) { }
                this.stompService.connect();
            });
        }
        if (this.settings.simulatorMode) {
            this.fetchingHistory = false;
            this.simulator.handleMessageReceived = this._handleMessageReceivedDelegate;
            this.simulator.handleResetSignal = () => {
                this.chatThread.messages = [];
                this.chatInput.resetInputs();
            };
            this._sendMessageDelegate = (a, b) => this.simulator.sendMessage(a, b);
        }
    }
    carouselItemHasMedia(carItem) {
        return (carItem.media &&
            (carItem.media.type != null || carItem.media.type != undefined) &&
            carItem.media.url);
    }
};
__decorate([
    core_1.ViewChild("inputContainer", { static: true }),
    __metadata("design:type", core_1.ElementRef)
], ChatThreadComponent.prototype, "inputContainerRef", void 0);
__decorate([
    core_1.ViewChild("chatThreadView", { static: true }),
    __metadata("design:type", core_1.ElementRef)
], ChatThreadComponent.prototype, "chatThreadView", void 0);
__decorate([
    core_1.ViewChildren("carouselContainer"),
    __metadata("design:type", Array)
], ChatThreadComponent.prototype, "carouselContainers", void 0);
ChatThreadComponent = __decorate([
    core_1.Component({
        selector: "app-chat-thread",
        templateUrl: "./chat-thread.component.html",
        styleUrls: ["./chat-thread.component.scss"]
    }),
    __metadata("design:paramtypes", [stomp_service_1.StompService,
        api_service_1.APIService,
        material_1.MatDialog,
        simulator_service_1.SimulatorService,
        platform_browser_1.DomSanitizer,
        info_dialog_service_1.InfoDialogService,
        chain_delay_service_1.ChainDelayService])
], ChatThreadComponent);
exports.ChatThreadComponent = ChatThreadComponent;
class ModelHelpers {
    constructor() {
        this.Direction = vm.Direction;
        this.MessageStatus = vm.MessageStatus;
        this.MessageType = models.MessageType;
        this.MessageContentType = models.MessageContentType;
        this.MediaType = models.MediaType;
        this.InputType = models.InputType;
        this.StompConnectionStatus = stomp_service_1.StompConnectionStatus;
    }
}
exports.ModelHelpers = ModelHelpers;
//# sourceMappingURL=chat-thread.component.js.map