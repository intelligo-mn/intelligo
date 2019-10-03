export interface IntelligoClientInfo {
	id: string;
	medium: number;
}

export interface IntelligoMeta {
	id: string;
	sender: IntelligoClientInfo;
	recipient: IntelligoClientInfo;
	senderType: SenderType;
	timestamp: number;
	sessionId: string;
	responseTo: string;
}

export enum InputType {
	LOCATION = 7, //Click, Complex
	DATE = 5, //Click, Complex
	TIME = 6, //Click, Complex
	ADDRESS = 4, //Click, Complex
	MEDIA = 8, //Click, Non Complex
	OPTIONS = 10, //Click, Non Complex
	LIST = 9, //Click, Complex
	PHONE = 3,
	EMAIL = 2,
	NUMERIC = 1,
	TEXT = 0,
}

export enum SenderType {
	AGENT = 3,
	ANA = 1,
	AI = 2,
	USER = 0
}

export enum MediaType {
	IMAGE = 0,
	VIDEO = 2,
	FILE = 3,
	AUDIO = 1
}

export enum ButtonType {
	ACTION = 2,
	QUICK_REPLY = 1,
	URL = 0
}

export enum MessageType {
	CAROUSEL = 1,
	INPUT = 2,
	EXTERNAL = 3,
	SIMPLE = 0
}

export enum Bool {
	TRUE = 1,
	FALSE = 0,
}

export interface BaseContent {
	mandatory?: Bool;
}

export interface SimpleMessageData extends IntelligoMessageData {
	content: SimpleContent;
}

export interface CarouselMessageData extends IntelligoMessageData {
	content: CarouselContent;
}

export interface InputMessageData extends IntelligoMessageData {
	content: InputContent;
}

export interface IntelligoMessageData {
	type: MessageType;
	content: BaseContent;
}

export interface InputContent extends BaseContent {
	inputType: InputType;
	input?: any; //base input
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
	location: GeoLoc
}

export interface LocationInputContent extends InputContent {
	defaultLocation: GeoLoc;
	textInputAttr: TextInputAttr;
	input: LocationInput;
}

export interface IntelligoDate {
	year: string;
	month: string;
	mday: string;
}
export interface IntelligoDateRange {
	min: IntelligoDate;
	max: IntelligoDate;
	interval: string;
}

export interface DateInput {
	date: IntelligoDate;
}

export interface DateInputContent extends InputContent {
	dateRange?: IntelligoDateRange;
	input: DateInput;
}
export interface IntelligoTime {
	hour: string;
	minute: string;
	second: string;
}
export interface IntelligoTimeRange {
	min: IntelligoTime;
	max: IntelligoTime;
	interval: string;
}
export interface TimeInput {
	time: IntelligoTime;
}
export interface TimeInputContent extends InputContent {
	dateRange: IntelligoTimeRange;
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
	//Raw user input
	input?: string;
	title?: string; //Text visible on outgoing thread.
}

export enum InputCategory {
	Click, Text
}

export enum MessageContentType {
	Text,
	Media,
	Typing
}

export interface MediaInput {
	media: SimpleMedia[];
}

export interface MediaInputContent extends InputContent {
	mediaType: MediaType;
	input: MediaInput;
}

export interface IntelligoChatMessage {
	meta: IntelligoMeta;
	data: IntelligoMessageData;
}
