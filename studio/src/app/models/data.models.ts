export interface ErrorDetail {
	field: string;
	message: string;
}

export interface ErrorItem {
	code: string;
	status: number;
	message: string;
	timestamp: number;
	errors: ErrorDetail[];
}

export interface APIResponse<TData> {
	data?: TData;
	error?: ErrorItem;
	success: boolean;
	links: Link[];
}

export interface Link {
	href: string;
	rel: string;
	templated: boolean;
}
export interface Role {
	id: number;
	role: string;
	description: string;
	label: string;
	enabled: boolean;
}

export interface LoginData {
	userId: string;
	username: string;
	accessToken: string;
	name: string;
	businessId: string;
	roles: Role[];
}

export interface Color {
	id?: string;
	name: string;
	value: string;
}

export interface BusinessAccount {
	colors?: Color[];
	createdAt?: number;
	email: string;
	id?: string;
	logoUrl?: string;
	modifiedAt?: number;
	name: string;
	phone: string;
	status?: string;
}

export interface Sort {
}

export interface ListContent<TItem> {
	content: TItem[];
	first: boolean;
	last: boolean;
	number: number;
	numberOfElements: number;
	size: number;
	sort: Sort;
	totalElements: number;
	totalPages: number;
}

export interface ListData<TItem> {
	data: TItem[];
	success: boolean;
}

export enum BusinessAccountStatus {
	INACTIVE = 0,
	ACTIVE = 1,
	EXPIRED = 2,
	BLOCKED = 3,
	DELETED = 4
}

export enum DevicePlatform {
	ANDROID = 'ANDROID',
	IOS = 'IOS',
	WINDOWS = 'WINDOWS',
	FACEBOOK = 'FACEBOOK'
}

export enum DeviceStatus {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
	BLOCKED = 'BLOCKED'
}

export interface Device {
	createdAt: Date;
	deviceId: string;
	devicePlatform: DevicePlatform;
	id: number;
	status: DeviceStatus;
	version: string;
}

export interface User {
	businessId: string;
	createdAt?: number;
	device?: Device;
	email: string;
	id: string;
	name: string;
	phone: string;
	roles: Role[];
	userName: string;
}

export interface UserRegisterModel {
	businessId?: string,
	email: string,
	name: string,
	password: string,
	phone: string,
	roleIds: number[]
}

export interface ChatProject {
	businessId: string;
	businessName?: string;
	createdAt?: number;
	flow?: any;
	id: string;
	name: string;
	source?: any;
	status?: string;
	updatedAt?: number;
	userId?: string;
}

export interface RegisterOnAnaCloudDetails {
	business: BusinessAccount;
	user: UserRegisterModel;
}
