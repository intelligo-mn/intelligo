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
    responseTo: string;
    flowId: string;
    previousFlowId: string;
    currentFlowId: string;
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
export declare enum EventType {
    DISCONNECTED = 0,
    CONNECTED = 1,
    IDLE = 2,
    SESSION_STARTED = 3,
    SESSION_CLOSED = 4,
    CHAT_ALLOCATION = 5,
    CHAT_DEALLOCATION = 6,
    MESSAGE_COUNT = 7,
    RESPONSE_NEEDED = 8,
    ACTIVE = 9,
    INACTIVE = 10,
    TYPING = 11,
    AWAY = 12,
    ACK = 13,
    NO_AGENT_FOUND = 14,
    INTENT_TO_HANDOVER = 15,
    INTERACTION = 16,
    QUEUED = 17,
    PRIORITY_QUEUED = 18,
    ALLOCATION_REQUEST = 19,
    OUT_OF_BUSINESS_HOURS = 20,
    SET_SESSION_DATA = 21,
    HANDOVER = 22
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
    isSelected?: boolean;
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
    input?: TextInput;
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
    dateRange?: ANADateRange;
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
export interface ANAEvent {
    type: EventType;
    data?: any;
    channel?: string;
}
export interface ANAChatMessage {
    meta: ANAMeta;
    data: ANAMessageData;
    events?: ANAEvent[];
    customData?: CustomData;
}
export interface CustomData {
    ackId?: string;
    status?: 'pending' | 'sent' | 'delivered';
}
