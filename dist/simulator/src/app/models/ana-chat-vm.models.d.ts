/// <reference types="node" />
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ChatThreadComponent } from '../components/chat-thread/chat-thread.component';
import { APIService } from '../services/api.service';
import { StompService } from '../services/stomp.service';
import * as models from './ana-chat.models';
export declare enum Direction {
    Incoming = 0,
    Outgoing = 1
}
export declare enum MessageStatus {
    None = 0,
    SentToServer = 1,
    ReceivedAtServer = 2,
    SentTimeout = 3,
    DelieveredToTarget = 4
}
export declare class ChatMessageVM {
    direction: Direction;
    time: Date;
    messageData: models.ANAMessageData;
    meta: models.ANAMeta;
    messageAckId: string;
    status: MessageStatus;
    private timeoutTimer;
    startTimeoutTimer(): void;
    clearTimeoutTimer(): void;
    executeRetry(): void;
    retrySending: () => void;
    simpleMessageData(): models.SimpleMessageData;
    carouselMessageData(): models.CarouselMessageData;
    getMessageContentType(): models.MessageContentType;
    isToday(): boolean;
    constructor(chatMessage: models.ANAChatMessage, direction: Direction, ackId: string, status?: MessageStatus);
}
export declare class ChatThreadVM {
    private sanitizer;
    constructor(sanitizer: DomSanitizer);
    chatThreadView: HTMLDivElement;
    messages: ChatMessageVM[];
    addTextIncoming(text: string, ackId: string): ChatMessageVM;
    addTextReply(text: string, ackId: string, timestamp?: number, insert?: boolean): ChatMessageVM;
    typingTimerId: NodeJS.Timer;
    setTyping(autohide?: boolean): void;
    removeTyping(): void;
    addMediaReply(media: models.SimpleMedia, text: string, ackId: string, timestamp?: number, insert?: boolean): ChatMessageVM;
    addMessage(chatMsgVM: ChatMessageVM, insert?: boolean): void;
    scrollLastIntoView(t?: number): void;
    scrollToLast(): void;
}
export declare class ChatInputItemVM {
    content: models.InputContent;
    data: models.ANAMessageData;
    meta: models.ANAMeta;
    disabled: boolean;
    textInputContent(): models.TextInputContent;
    constructor(message: models.ANAChatMessage);
}
export declare class ChatInputVM {
    dialog: MatDialog;
    chatThread: ChatThreadVM;
    apiService: APIService;
    stomp: StompService;
    chatThreadComponent: ChatThreadComponent;
    sanitizer: DomSanitizer;
    constructor(dialog: MatDialog, chatThread: ChatThreadVM, apiService: APIService, stomp: StompService, chatThreadComponent: ChatThreadComponent, sanitizer: DomSanitizer);
    insertThreadMessageForInput(inputVM: ChatInputItemVM): ChatMessageVM;
    setInput(chatInputItemVM: ChatInputItemVM): void;
    textInputForNonMandatoryCase(srcMeta: models.ANAMeta): ChatInputItemVM;
    textInput: ChatInputItemVM;
    clickInput: ChatInputItemVM;
    clickInputTitle(): string;
    inputCategory(inputVM: ChatInputItemVM): models.InputCategory;
    handleClick(inputVM: ChatInputItemVM): void;
    handleKeyPress(inputVM: ChatInputItemVM, event: KeyboardEvent): void;
    handleBtnOptionClick(inputVM: ChatInputItemVM, optionVal: string): void;
    htmlInputType(inputVM: ChatInputItemVM): string;
    isInputValid(inputVM: ChatInputItemVM): string | boolean | RegExpMatchArray;
    inputErrorMsg(inputVM: ChatInputItemVM): string;
    resetInputs(): void;
    showLocationPickerDialog(locInputContent: models.LocationInputContent, inputMeta: models.ANAMeta, inputMessageType: models.MessageType, ackId: string, defaultLoc?: models.GeoLoc): void;
    sendReplyAfterFileUpload(assetUrl: string, assetType: string, mediaInputContent: models.MediaInputContent, ackId: string, inputVM: ChatInputItemVM): void;
}
