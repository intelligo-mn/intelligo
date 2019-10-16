export interface ANAClientInfo {
    id: string;
    medium: number;
}
export interface ANAMeta {
    id: string;
    sender: ANAClientInfo;
    recipient: ANAClientInfo;
    senderType: SenderType;
    timestamp: number;
    sessionId: string;
    flowId: string;
    previousFlowId: string;
    currentFlowId: string;
    responseTo: string;
}
export interface ANAEvent {
    type: EventType;
    data: any;
}
export declare enum InputType {
    LOCATION = 7,
    DATE = 5,
    TIME = 6,
    ADDRESS = 4,
    MEDIA = 8,
    OPTIONS = 10,
    LIST = 9,
    PHONE = 3,
    EMAIL = 2,
    NUMERIC = 1,
    TEXT = 0
}
export declare enum EventType {
    SET_SESSION_DATA = 21,
    TYPING = 11,
    ACK = 13
}
export declare enum SenderType {
    AGENT = 3,
    ANA = 1,
    AI = 2,
    USER = 0
}
export declare enum MediaType {
    IMAGE = 0,
    VIDEO = 2,
    FILE = 3,
    AUDIO = 1
}
export declare enum ButtonType {
    DEEPLINK = 3,
    ACTION = 2,
    QUICK_REPLY = 1,
    URL = 0
}
export declare enum MessageType {
    CAROUSEL = 1,
    INPUT = 2,
    EXTERNAL = 3,
    SIMPLE = 0
}
export declare enum Bool {
    TRUE = 1,
    FALSE = 0
}
export interface BaseContent {
    mandatory?: Bool;
}
export interface SimpleMessageData extends ANAMessageData {
    content: SimpleContent;
}
export interface CarouselMessageData extends ANAMessageData {
    content: CarouselContent;
}
export interface InputMessageData extends ANAMessageData {
    content: InputContent;
}
export interface ANAMessageData {
    type: MessageType;
    content: BaseContent;
}
export interface InputContent extends BaseContent {
    inputType: InputType;
    input?: any;
}
export interface TextInputContent extends InputContent {
    textInputAttr?: TextInputAttr;
    input?: TextInput;
}
export interface ListItem {
    text: string;
    value: string;
    isSelected: boolean;
}
export interface OptionItem {
    title: string;
    value: string;
    type?: ButtonType;
}
export interface OptionsInputContent extends InputContent {
    options: OptionItem[];
    input?: TextInput;
}
export interface ListInputContent extends InputContent {
    values: ListItem[];
    input: TextInput;
    multiple: boolean;
}
export interface AddressInput {
    line1: string;
    area: string;
    city: string;
    state: string;
    country: string;
    pin: string;
}
export interface AddressInputField {
    address: AddressInput;
}
export interface AddressInputContent extends InputContent {
    requiredFields: string[];
    input: AddressInputField;
}
export interface GeoLoc {
    lat: number;
    lng: number;
}
export interface LocationInput {
    location: GeoLoc;
}
export interface LocationInputContent extends InputContent {
    defaultLocation: GeoLoc;
    textInputAttr: TextInputAttr;
    input: LocationInput;
}
export interface ANADate {
    year: string;
    month: string;
    mday: string;
}
export interface ANADateRange {
    min: ANADate;
    max: ANADate;
    interval: string;
}
export interface DateInput {
    date: ANADate;
}
export interface DateInputContent extends InputContent {
    dateRange: ANADateRange;
    input: DateInput;
}
export interface ANATime {
    hour: string;
    minute: string;
    second: string;
}
export interface ANATimeRange {
    min: ANATime;
    max: ANATime;
    interval: string;
}
export interface TimeInput {
    time: ANATime;
}
export interface TimeInputContent extends InputContent {
    dateRange: ANATimeRange;
    input: TimeInput;
}
export interface SimpleMedia {
    url: string;
    type: MediaType;
    previewUrl?: string;
}
export interface SimpleContent extends BaseContent {
    text: string;
    media?: SimpleMedia;
    typing?: boolean;
}
export interface CarouselMedia {
    url: string;
    type: MediaType;
}
export interface CarouselOption {
    title: string;
    value: string;
    type?: ButtonType;
}
export interface CarouselItem {
    title: string;
    desc: string;
    media: CarouselMedia;
    options: CarouselOption[];
    url: string;
}
export interface CarouselContent extends BaseContent {
    items: CarouselItem[];
    mandatory: number;
    input?: TextInput;
}
export interface TextInputAttr {
    multiLine: number;
    minLength: number;
    maxLength: number;
    defaultText: string;
    placeHolder: string;
}
export interface TextInput {
    val?: string;
    input?: string;
    title?: string;
}
export declare enum InputCategory {
    Click = 0,
    Text = 1
}
export declare enum MessageContentType {
    Text = 0,
    Media = 1,
    Typing = 2
}
export interface MediaInput {
    media: SimpleMedia[];
}
export interface MediaInputContent extends InputContent {
    mediaType: MediaType;
    input: MediaInput;
}
export interface IANAChatMessage {
    meta: ANAMeta;
    data: ANAMessageData;
}
export declare class ANAChatMessage implements IANAChatMessage {
    constructor(rawMessage: any);
    private raw;
    meta: ANAMeta;
    data: ANAMessageData;
    events: ANAEvent[];
    simpleData(): SimpleMessageData;
    carouselData(): CarouselMessageData;
    inputData(): InputMessageData;
    extract(): {
        meta: ANAMeta;
        data: ANAMessageData;
        events: ANAEvent[];
    };
}
