"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InputType;
(function (InputType) {
    InputType[InputType["LOCATION"] = 7] = "LOCATION";
    InputType[InputType["DATE"] = 5] = "DATE";
    InputType[InputType["TIME"] = 6] = "TIME";
    InputType[InputType["ADDRESS"] = 4] = "ADDRESS";
    InputType[InputType["MEDIA"] = 8] = "MEDIA";
    InputType[InputType["OPTIONS"] = 10] = "OPTIONS";
    InputType[InputType["LIST"] = 9] = "LIST";
    InputType[InputType["PHONE"] = 3] = "PHONE";
    InputType[InputType["EMAIL"] = 2] = "EMAIL";
    InputType[InputType["NUMERIC"] = 1] = "NUMERIC";
    InputType[InputType["TEXT"] = 0] = "TEXT";
})(InputType = exports.InputType || (exports.InputType = {}));
var EventType;
(function (EventType) {
    EventType[EventType["SET_SESSION_DATA"] = 21] = "SET_SESSION_DATA";
    EventType[EventType["TYPING"] = 11] = "TYPING";
    EventType[EventType["ACK"] = 13] = "ACK";
})(EventType = exports.EventType || (exports.EventType = {}));
var SenderType;
(function (SenderType) {
    SenderType[SenderType["AGENT"] = 3] = "AGENT";
    SenderType[SenderType["ANA"] = 1] = "ANA";
    SenderType[SenderType["AI"] = 2] = "AI";
    SenderType[SenderType["USER"] = 0] = "USER";
})(SenderType = exports.SenderType || (exports.SenderType = {}));
var MediaType;
(function (MediaType) {
    MediaType[MediaType["IMAGE"] = 0] = "IMAGE";
    MediaType[MediaType["VIDEO"] = 2] = "VIDEO";
    MediaType[MediaType["FILE"] = 3] = "FILE";
    MediaType[MediaType["AUDIO"] = 1] = "AUDIO";
})(MediaType = exports.MediaType || (exports.MediaType = {}));
var ButtonType;
(function (ButtonType) {
    ButtonType[ButtonType["DEEPLINK"] = 3] = "DEEPLINK";
    ButtonType[ButtonType["ACTION"] = 2] = "ACTION";
    ButtonType[ButtonType["QUICK_REPLY"] = 1] = "QUICK_REPLY";
    ButtonType[ButtonType["URL"] = 0] = "URL";
})(ButtonType = exports.ButtonType || (exports.ButtonType = {}));
var MessageType;
(function (MessageType) {
    MessageType[MessageType["CAROUSEL"] = 1] = "CAROUSEL";
    MessageType[MessageType["INPUT"] = 2] = "INPUT";
    MessageType[MessageType["EXTERNAL"] = 3] = "EXTERNAL";
    MessageType[MessageType["SIMPLE"] = 0] = "SIMPLE";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var Bool;
(function (Bool) {
    Bool[Bool["TRUE"] = 1] = "TRUE";
    Bool[Bool["FALSE"] = 0] = "FALSE";
})(Bool = exports.Bool || (exports.Bool = {}));
var InputCategory;
(function (InputCategory) {
    InputCategory[InputCategory["Click"] = 0] = "Click";
    InputCategory[InputCategory["Text"] = 1] = "Text";
})(InputCategory = exports.InputCategory || (exports.InputCategory = {}));
var MessageContentType;
(function (MessageContentType) {
    MessageContentType[MessageContentType["Text"] = 0] = "Text";
    MessageContentType[MessageContentType["Media"] = 1] = "Media";
    MessageContentType[MessageContentType["Typing"] = 2] = "Typing";
})(MessageContentType = exports.MessageContentType || (exports.MessageContentType = {}));
class ANAChatMessage {
    constructor(rawMessage) {
        this.events = [];
        this.raw = rawMessage;
        this.meta = this.raw.meta;
        this.data = this.raw.data;
        this.events = this.raw.events;
    }
    simpleData() {
        return this.data;
    }
    carouselData() {
        return this.data;
    }
    inputData() {
        return this.data;
    }
    extract() {
        return {
            meta: this.meta,
            data: this.data,
            events: this.events
        };
    }
}
exports.ANAChatMessage = ANAChatMessage;
//# sourceMappingURL=ana-chat.models.js.map