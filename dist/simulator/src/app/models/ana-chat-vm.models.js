"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const complex_input_component_1 = require("../components/complex-input/complex-input.component");
const utilities_service_1 = require("../services/utilities.service");
const models = require("./ana-chat.models");
var Direction;
(function (Direction) {
    Direction[Direction["Incoming"] = 0] = "Incoming";
    Direction[Direction["Outgoing"] = 1] = "Outgoing";
})(Direction = exports.Direction || (exports.Direction = {}));
var MessageStatus;
(function (MessageStatus) {
    MessageStatus[MessageStatus["None"] = 0] = "None";
    MessageStatus[MessageStatus["SentToServer"] = 1] = "SentToServer";
    MessageStatus[MessageStatus["ReceivedAtServer"] = 2] = "ReceivedAtServer";
    MessageStatus[MessageStatus["SentTimeout"] = 3] = "SentTimeout";
    MessageStatus[MessageStatus["DelieveredToTarget"] = 4] = "DelieveredToTarget";
})(MessageStatus = exports.MessageStatus || (exports.MessageStatus = {}));
class ChatMessageVM {
    constructor(chatMessage, direction, ackId, status) {
        this.direction = direction;
        this.time = new Date(chatMessage.meta.timestamp);
        this.meta = chatMessage.meta;
        this.messageData = chatMessage.data;
        this.status = status || MessageStatus.None;
        this.messageAckId = ackId;
    }
    startTimeoutTimer() {
        this.timeoutTimer = setTimeout(() => {
            if (this.status == MessageStatus.SentToServer)
                this.status = MessageStatus.SentTimeout;
        }, 2000);
    }
    clearTimeoutTimer() {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = undefined;
    }
    executeRetry() {
        if (this.retrySending)
            this.retrySending();
    }
    simpleMessageData() {
        return this.messageData;
    }
    carouselMessageData() {
        return this.messageData;
    }
    getMessageContentType() {
        if (this.messageData.type == models.MessageType.SIMPLE) {
            var simple = this.simpleMessageData();
            if (simple.content.typing)
                return models.MessageContentType.Typing;
            if (simple.content.media)
                return models.MessageContentType.Media;
            else if (simple.content.text)
                return models.MessageContentType.Text;
            else
                return null;
        }
        return null;
    }
    isToday() {
        return this.time.toDateString() == (new Date()).toDateString();
    }
}
exports.ChatMessageVM = ChatMessageVM;
class ChatThreadVM {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.messages = [];
    }
    addTextIncoming(text, ackId) {
        let msg = new ChatMessageVM(new models.ANAChatMessage({
            "meta": {
                "timestamp": new Date().getTime(),
            },
            "data": {
                "type": models.MessageType.SIMPLE,
                "content": {
                    "text": text,
                }
            }
        }), Direction.Incoming, ackId);
        this.addMessage(msg);
        return msg;
    }
    addTextReply(text, ackId, timestamp, insert = false) {
        if (!text)
            return null;
        let msg = new ChatMessageVM(new models.ANAChatMessage({
            "meta": {
                "timestamp": timestamp || new Date().getTime(),
            },
            "data": {
                "type": models.MessageType.SIMPLE,
                "content": {
                    "text": text,
                }
            }
        }), Direction.Outgoing, ackId);
        this.addMessage(msg, insert);
        return msg;
    }
    setTyping(autohide) {
        if (this.typingTimerId)
            clearTimeout(this.typingTimerId);
        this.removeTyping();
        let msg = new ChatMessageVM(new models.ANAChatMessage({
            "meta": {
                "timestamp": new Date().getTime(),
            },
            "data": {
                "type": models.MessageType.SIMPLE,
                "content": {
                    "typing": true
                }
            }
        }), Direction.Incoming, '');
        this.addMessage(msg);
        if (autohide) {
            this.typingTimerId = setTimeout(() => {
                this.removeTyping();
            }, 1000);
        }
    }
    removeTyping() {
        let index = this.messages.findIndex(x => x.getMessageContentType() == models.MessageContentType.Typing);
        if (index != -1) {
            this.messages.splice(index, 1);
            if (this.typingTimerId)
                clearTimeout(this.typingTimerId);
        }
    }
    addMediaReply(media, text = '', ackId, timestamp, insert = false) {
        let msg = new ChatMessageVM(new models.ANAChatMessage({
            "meta": {
                "timestamp": timestamp || new Date().getTime(),
            },
            "data": {
                "type": models.MessageType.SIMPLE,
                "content": {
                    "text": text,
                    "media": media,
                }
            }
        }), Direction.Outgoing, ackId);
        this.addMessage(msg, insert);
        return msg;
    }
    addMessage(chatMsgVM, insert = false) {
        if (utilities_service_1.UtilitiesService.settings.simulatorMode) {
            let simpleData = chatMsgVM.simpleMessageData();
            if (simpleData.content.media && simpleData.content.media.url)
                simpleData.content.media.url = this.sanitizer.bypassSecurityTrustUrl(simpleData.content.media.url);
        }
        if (!insert)
            this.removeTyping();
        if (!chatMsgVM.meta.id || this.messages.findIndex(x => x.meta.id == chatMsgVM.meta.id) == -1) {
            if (insert)
                this.messages.unshift(chatMsgVM);
            else
                this.messages.push(chatMsgVM);
        }
        if (!insert)
            this.scrollLastIntoView();
    }
    scrollLastIntoView(t = 100) {
        if (this.chatThreadView)
            setTimeout(() => this.chatThreadView.children.item(this.chatThreadView.children.length - 1).scrollIntoView({ behavior: 'smooth' }), t);
    }
    scrollToLast() {
        if (this.chatThreadView)
            window.requestAnimationFrame(() => this.chatThreadView.scrollTo({ top: this.chatThreadView.scrollHeight, behavior: 'smooth' }));
    }
}
exports.ChatThreadVM = ChatThreadVM;
class ChatInputItemVM {
    constructor(message) {
        this.data = message.data;
        this.content = message.inputData().content;
        if (!this.content.input)
            this.content.input = {};
        this.meta = message.meta;
        this.disabled = false;
    }
    textInputContent() {
        return this.content;
    }
}
exports.ChatInputItemVM = ChatInputItemVM;
class ChatInputVM {
    constructor(dialog, chatThread, apiService, stomp, chatThreadComponent, sanitizer) {
        this.dialog = dialog;
        this.chatThread = chatThread;
        this.apiService = apiService;
        this.stomp = stomp;
        this.chatThreadComponent = chatThreadComponent;
        this.sanitizer = sanitizer;
        this.textInput = undefined;
        this.clickInput = undefined;
    }
    insertThreadMessageForInput(inputVM) {
        let ackId = "";
        let timestamp = inputVM.meta.timestamp;
        switch (inputVM.content.inputType) {
            case models.InputType.TEXT:
            case models.InputType.EMAIL:
            case models.InputType.PHONE:
            case models.InputType.NUMERIC:
                {
                    let modifieldInputContent = inputVM.content;
                    return this.chatThread.addTextReply(modifieldInputContent.input.val, ackId, timestamp, true);
                }
            case models.InputType.ADDRESS:
                {
                    let modifieldInputContent = inputVM.content;
                    let userAddressInput = modifieldInputContent.input.address;
                    return this.chatThread.addTextReply(`${[userAddressInput.line1, userAddressInput.area, userAddressInput.city, userAddressInput.state, userAddressInput.country, userAddressInput.pin].filter(x => x).join(", ")}`, ackId, timestamp, true);
                }
            case models.InputType.LOCATION:
                {
                    let locInputData = inputVM.content;
                    let gMapUrl = utilities_service_1.UtilitiesService.googleMapsStaticLink(locInputData.input.location);
                    return this.chatThread.addMediaReply({
                        previewUrl: gMapUrl,
                        type: models.MediaType.IMAGE,
                        url: gMapUrl
                    }, "Location", ackId, timestamp, true);
                }
            case models.InputType.MEDIA:
                {
                    let mediaInputContent = inputVM.content;
                    if (mediaInputContent && mediaInputContent.input.media) {
                        let asset = mediaInputContent.input.media[0];
                        let media = {
                            previewUrl: asset.previewUrl,
                            type: asset.type,
                            url: asset.url
                        };
                        return this.chatThread.addMediaReply(media, '', ackId, timestamp, true);
                    }
                    return null;
                }
            case models.InputType.LIST:
                {
                    let listInputContent = inputVM.content;
                    let selectedValues = listInputContent.input.val.split(',');
                    let selectedListItems = listInputContent.values.filter(x => selectedValues.indexOf(x.value) != -1);
                    return this.chatThread.addTextReply(selectedListItems.map(x => x.text).join(', '), ackId, timestamp, true);
                }
            case models.InputType.TIME:
                {
                    let timeContent = inputVM.content;
                    let displayTime = utilities_service_1.UtilitiesService.anaTimeDisplay(timeContent.input.time);
                    return this.chatThread.addTextReply(displayTime, ackId, timestamp, true);
                }
            case models.InputType.DATE:
                {
                    let dateContent = inputVM.content;
                    let displayDate = utilities_service_1.UtilitiesService.anaDateDisplay(dateContent.input.date);
                    return this.chatThread.addTextReply(displayDate, ackId, timestamp, true);
                }
            case models.InputType.OPTIONS:
                {
                    let optionInputContent = inputVM.content;
                    let selectedOption = optionInputContent.options.find(x => x.value == optionInputContent.input.val);
                    if (selectedOption)
                        return this.chatThread.addTextReply(selectedOption.title, ackId, timestamp, true);
                    return null;
                }
            default:
                console.log(`Unsupported button type: ${inputVM.content.inputType}`);
                break;
        }
    }
    setInput(chatInputItemVM) {
        if (this.textInput)
            this.textInput.disabled = true;
        if (this.inputCategory(chatInputItemVM) == models.InputCategory.Text) {
            let a = chatInputItemVM.content;
            if (a.textInputAttr && a.textInputAttr.defaultText)
                a.input.val = a.textInputAttr.defaultText;
            this.textInput = chatInputItemVM;
        }
        else if (this.inputCategory(chatInputItemVM) == models.InputCategory.Click) {
            this.clickInput = chatInputItemVM;
            if (chatInputItemVM.content.mandatory == models.Bool.FALSE) {
                this.textInput = this.textInputForNonMandatoryCase(chatInputItemVM.meta);
            }
            else
                this.textInput = undefined;
        }
        this.chatThread.scrollLastIntoView(300);
    }
    textInputForNonMandatoryCase(srcMeta) {
        let anaMeta = {
            id: "",
            sender: {
                id: utilities_service_1.UtilitiesService.settings.stompConfig ? utilities_service_1.UtilitiesService.settings.stompConfig.businessId : utilities_service_1.Config.simulatorBusinessId,
                medium: 3,
            },
            recipient: {
                id: utilities_service_1.UtilitiesService.settings.stompConfig ? utilities_service_1.UtilitiesService.settings.stompConfig.customerId : utilities_service_1.Config.simulatorCustomerId,
                medium: 3
            },
            responseTo: srcMeta ? srcMeta.id : '',
            senderType: models.SenderType.USER,
            sessionId: srcMeta ? srcMeta.sessionId : '',
            flowId: srcMeta.flowId,
            currentFlowId: srcMeta.currentFlowId,
            previousFlowId: srcMeta.previousFlowId,
            timestamp: srcMeta ? srcMeta.timestamp : new Date().getTime()
        };
        let input = new ChatInputItemVM(new models.ANAChatMessage({
            meta: anaMeta,
            data: {
                type: models.MessageType.INPUT,
                content: {
                    inputType: 0,
                    mandatory: 1,
                    textInputAttr: {
                        multiLine: 1,
                        minLength: 0,
                        maxLength: 400,
                        defaultText: "",
                        placeHolder: "Type a message..."
                    },
                    input: {
                        val: "",
                    }
                }
            }
        }));
        return input;
    }
    clickInputTitle() {
        if (this.clickInput) {
            try {
                if (this.clickInput.content.inputType == models.InputType.MEDIA)
                    return 'Choose ' + models.MediaType[this.clickInput.content.mediaType].toLowerCase();
                if (this.clickInput.content.inputType == models.InputType.LIST) {
                    if (this.clickInput.content.multiple)
                        return 'Choose';
                    else
                        return 'Choose an option';
                }
                return 'Choose ' + models.InputType[this.clickInput.content.inputType].toLowerCase();
            }
            catch (e) {
                return 'Choose';
            }
        }
        else
            return "Choose";
    }
    inputCategory(inputVM) {
        switch (inputVM.content.inputType) {
            case models.InputType.TEXT:
            case models.InputType.EMAIL:
            case models.InputType.NUMERIC:
            case models.InputType.PHONE:
                return models.InputCategory.Text;
            default:
                return models.InputCategory.Click;
        }
    }
    handleClick(inputVM) {
        if (!this.isInputValid(inputVM)) {
            let errorMsg = this.inputErrorMsg(inputVM);
            let lastMsg = this.chatThread.messages[this.chatThread.messages.length - 1];
            if (lastMsg.direction == Direction.Incoming && lastMsg.messageAckId == "ERROR_MSG" && lastMsg.simpleMessageData().content.text == errorMsg)
                return;
            switch (inputVM.content.inputType) {
                case models.InputType.TEXT:
                case models.InputType.EMAIL:
                case models.InputType.PHONE:
                case models.InputType.NUMERIC:
                    {
                        let modifieldInputContent = inputVM.content;
                        this.chatThread.addTextReply(modifieldInputContent.input.val, "");
                        break;
                    }
            }
            this.chatThread.addTextIncoming(errorMsg, "ERROR_MSG");
            return;
        }
        let ackId = utilities_service_1.UtilitiesService.uuidv4();
        switch (inputVM.content.inputType) {
            case models.InputType.TEXT:
            case models.InputType.EMAIL:
            case models.InputType.PHONE:
            case models.InputType.NUMERIC:
                {
                    this.resetInputs();
                    let modifieldInputContent = inputVM.content;
                    let msg = this.chatThread.addTextReply(modifieldInputContent.input.val, ackId);
                    this.chatThreadComponent._sendMessageDelegate(new models.ANAChatMessage({
                        meta: utilities_service_1.UtilitiesService.getReplyMeta(inputVM.meta),
                        data: { type: inputVM.data.type, content: modifieldInputContent }
                    }), msg);
                    break;
                }
            case models.InputType.ADDRESS:
                {
                    let modifieldInputContent = inputVM.content;
                    let dialogRef = this.dialog.open(complex_input_component_1.ComplexInputComponent, {
                        width: 'auto',
                        data: {
                            Type: complex_input_component_1.ComplexType.Address
                        }
                    });
                    dialogRef.afterClosed().subscribe(result => {
                        if (result != true)
                            return;
                        let userAddressInput = dialogRef.componentInstance.givenAddress;
                        let msg = this.chatThread.addTextReply(`${utilities_service_1.UtilitiesService.anaAddressDisplay(userAddressInput)}`, ackId);
                        modifieldInputContent.input = {
                            address: userAddressInput
                        };
                        this.resetInputs();
                        this.chatThreadComponent._sendMessageDelegate(new models.ANAChatMessage({
                            meta: utilities_service_1.UtilitiesService.getReplyMeta(inputVM.meta),
                            data: { type: inputVM.data.type, content: modifieldInputContent }
                        }), msg);
                    });
                    break;
                }
            case models.InputType.LOCATION:
                {
                    let locInputData = inputVM.content;
                    let geoLoc = locInputData.defaultLocation;
                    if (!geoLoc) {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition((pos) => {
                                let loc = {
                                    lat: pos.coords.latitude,
                                    lng: pos.coords.longitude
                                };
                                this.showLocationPickerDialog(locInputData, inputVM.meta, inputVM.data.type, ackId, loc);
                            }, err => {
                                this.showLocationPickerDialog(locInputData, inputVM.meta, inputVM.data.type, ackId);
                            });
                        }
                    }
                    else
                        this.showLocationPickerDialog(locInputData, inputVM.meta, inputVM.data.type, ackId, geoLoc);
                    break;
                }
            case models.InputType.MEDIA:
                {
                    let mediaInputContent = inputVM.content;
                    let input = document.createElement('input');
                    input.type = 'file';
                    if (mediaInputContent.mediaType != models.MediaType.FILE)
                        input.accept = `${models.MediaType[mediaInputContent.mediaType]}/*`;
                    input.multiple = false;
                    input.onchange = () => {
                        if (input.files) {
                            let f = input.files[0];
                            if (!utilities_service_1.UtilitiesService.settings.simulatorMode) {
                                this.apiService.uploadFile(f).subscribe(resp => {
                                    if (resp.links)
                                        this.sendReplyAfterFileUpload(resp.links[0].href, f.type, mediaInputContent, ackId, inputVM);
                                    else
                                        alert("Error occurred while sending the file!");
                                }, err => {
                                    alert("Unable to send file!");
                                });
                            }
                            else {
                                let mediaBlob = new Blob([f], {
                                    type: f.type
                                });
                                let mediaBlobUrl = URL.createObjectURL(mediaBlob);
                                this.sendReplyAfterFileUpload(mediaBlobUrl, f.type, mediaInputContent, ackId, inputVM);
                            }
                        }
                    };
                    input.click();
                    break;
                }
            case models.InputType.LIST:
                {
                    let listInputContent = inputVM.content;
                    let dialogRef = this.dialog.open(complex_input_component_1.ComplexInputComponent, {
                        width: 'auto',
                        data: {
                            Type: complex_input_component_1.ComplexType.List,
                            ListValues: listInputContent.values,
                            ListMultiple: listInputContent.multiple
                        }
                    });
                    dialogRef.afterClosed().subscribe(result => {
                        if (result != true)
                            return;
                        this.resetInputs();
                        let selectedListItems = dialogRef.componentInstance.choosenListValues();
                        let msg = this.chatThread.addTextReply(selectedListItems.map(x => x.text).join(', '), ackId);
                        listInputContent.input.val = selectedListItems.map(x => x.value).join(',');
                        this.chatThreadComponent._sendMessageDelegate(new models.ANAChatMessage({
                            meta: utilities_service_1.UtilitiesService.getReplyMeta(inputVM.meta),
                            data: { type: inputVM.data.type, content: listInputContent }
                        }), msg);
                    });
                    break;
                }
            case models.InputType.TIME:
                {
                    let timeContent = inputVM.content;
                    let dialogRef = this.dialog.open(complex_input_component_1.ComplexInputComponent, {
                        width: 'auto',
                        data: {
                            Type: complex_input_component_1.ComplexType.Time
                        }
                    });
                    dialogRef.afterClosed().subscribe(result => {
                        if (result != true)
                            return;
                        this.resetInputs();
                        let userInputTime = dialogRef.componentInstance.getChoosenANATime();
                        let displayTime = utilities_service_1.UtilitiesService.anaTimeDisplay(userInputTime);
                        let msg = this.chatThread.addTextReply(displayTime, ackId);
                        timeContent.input = { time: userInputTime };
                        this.chatThreadComponent._sendMessageDelegate(new models.ANAChatMessage({
                            meta: utilities_service_1.UtilitiesService.getReplyMeta(inputVM.meta),
                            data: { type: inputVM.data.type, content: timeContent }
                        }), msg);
                    });
                    break;
                }
            case models.InputType.DATE:
                {
                    let dateContent = inputVM.content;
                    let dialogRef = this.dialog.open(complex_input_component_1.ComplexInputComponent, {
                        width: 'auto',
                        data: {
                            Type: complex_input_component_1.ComplexType.Date
                        }
                    });
                    dialogRef.afterClosed().subscribe(result => {
                        if (result != true)
                            return;
                        this.resetInputs();
                        let userInputDate = dialogRef.componentInstance.getChoosenANADate();
                        let displayDate = utilities_service_1.UtilitiesService.anaDateDisplay(userInputDate);
                        let msg = this.chatThread.addTextReply(displayDate, ackId);
                        dateContent.input = { date: userInputDate };
                        this.chatThreadComponent._sendMessageDelegate(new models.ANAChatMessage({
                            meta: utilities_service_1.UtilitiesService.getReplyMeta(inputVM.meta),
                            data: { type: inputVM.data.type, content: dateContent }
                        }), msg);
                    });
                    break;
                }
            case models.InputType.OPTIONS:
                {
                    this.resetInputs();
                    let optionInputContent = inputVM.content;
                    let msg = this.chatThread.addTextReply(optionInputContent.input.title, ackId);
                    this.chatThreadComponent._sendMessageDelegate(new models.ANAChatMessage({
                        meta: utilities_service_1.UtilitiesService.getReplyMeta(inputVM.meta),
                        data: { type: inputVM.data.type, content: optionInputContent }
                    }), msg);
                    break;
                }
            default:
                console.log(`Unsupported button type: ${inputVM.content.inputType}`);
                break;
        }
    }
    handleKeyPress(inputVM, event) {
        if (event.keyCode == 13) {
            if (this.inputCategory(inputVM) == models.InputCategory.Text) {
                if (inputVM.textInputContent().input.val)
                    this.handleClick(inputVM);
            }
            else
                this.handleClick(inputVM);
        }
        else {
            this.stomp.sendTypingMessage(inputVM.meta);
        }
    }
    handleBtnOptionClick(inputVM, optionVal) {
        if (inputVM.content.inputType == models.InputType.OPTIONS) {
            let x = inputVM.content;
            let option = x.options.find(y => y.value == optionVal);
            if (!option) {
                alert('Invalid option!');
                return;
            }
            if (option.type == models.ButtonType.URL) {
                let v = JSON.parse(option.value);
                x.input.val = v.value;
                window.open(v.url, '_blank');
            }
            if (option.type == models.ButtonType.DEEPLINK) {
                let v = JSON.parse(option.value);
                x.input.val = v.value;
                try {
                    if (window.parent && window.parent.postMessage) {
                        window.parent.postMessage({
                            type: "DEEPLINK",
                            payload: v.url
                        }, "*");
                    }
                }
                catch (e) {
                    console.error(e);
                }
            }
            else
                x.input.val = option.value;
            x.input.title = option.title;
        }
        this.handleClick(inputVM);
    }
    htmlInputType(inputVM) {
        switch (inputVM.content.inputType) {
            case models.InputType.TEXT:
            case models.InputType.PHONE:
                return 'text';
            case models.InputType.EMAIL:
                return 'email';
            case models.InputType.NUMERIC:
                return 'number';
            default:
                return 'text';
        }
    }
    isInputValid(inputVM) {
        switch (inputVM.content.inputType) {
            case models.InputType.TEXT:
                {
                    let x = inputVM.content;
                    if (!x.input.val)
                        return false;
                    if (x.textInputAttr) {
                        if (x.textInputAttr.minLength > 0 && x.input.val.length < x.textInputAttr.minLength)
                            return false;
                        if (x.textInputAttr.maxLength > 0 && x.input.val.length > x.textInputAttr.maxLength)
                            return false;
                    }
                    return true;
                }
            case models.InputType.EMAIL:
                {
                    let x = inputVM.content;
                    return x.input.val && x.input.val.match(utilities_service_1.Config.emailRegex);
                }
            case models.InputType.PHONE:
                {
                    let x = inputVM.content;
                    return x.input.val && x.input.val.match(utilities_service_1.Config.phoneRegex);
                }
            case models.InputType.NUMERIC:
                {
                    let x = inputVM.content;
                    return x.input.val && x.input.val.match(utilities_service_1.Config.numberRegex);
                }
            case models.InputType.ADDRESS:
            case models.InputType.LOCATION:
            case models.InputType.MEDIA:
            case models.InputType.LIST:
            case models.InputType.TIME:
            case models.InputType.DATE:
                {
                    return true;
                }
            case models.InputType.OPTIONS:
                {
                    let x = inputVM.content;
                    return x.input.val;
                }
            default:
                console.log(`Unsupported button type: ${inputVM.content.inputType}`);
                break;
        }
    }
    inputErrorMsg(inputVM) {
        switch (inputVM.content.inputType) {
            case models.InputType.EMAIL:
                return 'Please give a valid email address';
            case models.InputType.NUMERIC:
                return 'Please give a valid number';
            case models.InputType.PHONE:
                return 'Please give a valid phone number';
            case models.InputType.TEXT:
                {
                    let c = inputVM.textInputContent();
                    if (!c.input.val)
                        return "The value cannot be empty";
                    if (c.input.val && c.input.val.length < c.textInputAttr.minLength)
                        return `Minimum ${c.textInputAttr.minLength} characters required.`;
                    else if (c.input.val && c.input.val.length > c.textInputAttr.maxLength)
                        return `Maximum ${c.textInputAttr.maxLength} characters allowed.`;
                }
            default:
                return 'The value cannot be empty!';
        }
    }
    resetInputs() {
        this.textInput = undefined;
        this.clickInput = undefined;
    }
    showLocationPickerDialog(locInputContent, inputMeta, inputMessageType, ackId, defaultLoc) {
        let dialogRef = this.dialog.open(complex_input_component_1.ComplexInputComponent, {
            width: 'auto',
            data: {
                Type: complex_input_component_1.ComplexType.Location,
                DefaultGeoLoc: defaultLoc
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result != true)
                return;
            this.resetInputs();
            let userInputLoc = dialogRef.componentInstance.geoLoc;
            let gMapUrl = utilities_service_1.UtilitiesService.googleMapsStaticLink(userInputLoc);
            let msg = this.chatThread.addMediaReply({
                previewUrl: gMapUrl,
                type: models.MediaType.IMAGE,
                url: gMapUrl
            }, "Location", ackId);
            locInputContent.input = { location: userInputLoc };
            this.chatThreadComponent._sendMessageDelegate(new models.ANAChatMessage({
                meta: utilities_service_1.UtilitiesService.getReplyMeta(inputMeta),
                data: { type: inputMessageType, content: locInputContent }
            }), msg);
        });
    }
    sendReplyAfterFileUpload(assetUrl, assetType, mediaInputContent, ackId, inputVM) {
        let media = {
            previewUrl: assetUrl,
            type: utilities_service_1.UtilitiesService.getAnaMediaTypeFromMIMEType(assetType),
            url: assetUrl
        };
        let msg = this.chatThread.addMediaReply(media, '', ackId);
        mediaInputContent.input = { media: [media] };
        this.resetInputs();
        this.chatThreadComponent._sendMessageDelegate(new models.ANAChatMessage({
            meta: utilities_service_1.UtilitiesService.getReplyMeta(inputVM.meta),
            data: { type: inputVM.data.type, content: mediaInputContent }
        }), msg);
    }
}
exports.ChatInputVM = ChatInputVM;
//# sourceMappingURL=ana-chat-vm.models.js.map