import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ConfigService } from "../config/config.service";
import "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";
import { ANAChatMessage } from "app/shared/model/ana-chat.models";
export declare class DataService {
    private http;
    private config;
    private router;
    baseURL: string;
    constructor(http: Http, config: ConfigService, router: Router);
    private getHeaders;
    getChatDetails(page: number, size: number, search?: string, businessId?: string, historySize?: number): Observable<AgentChatsResponse>;
    intentToHandover(sessionId: string): Observable<DispositionResponse>;
    handover(sessionId: string, message: ANAChatMessage): Observable<DispositionResponse>;
    getHistory(customerId: any, businessId: any, pageSize: any, pageNumber: any, timeStamp?: number, flowId?: string): Observable<any>;
    login(username: any, password: any): Observable<LoginResponse>;
    isAccessTokenValid(accessToken: string): Observable<LoginResponse>;
    logout(): void;
    returnToHome(): void;
}
export interface LoginData {
    userId: string;
    businessId: string;
    username: string;
    accessToken: string;
    name: string;
    roles: UserRole[];
}
export interface ErrorInfo {
    code: string;
    status: number;
    message: string;
    timestamp: number;
    errors: any[];
}
export interface LoginResponse {
    error: ErrorInfo;
    data: LoginData;
}
export interface UserRole {
    id: number;
    role: string;
    description: string;
    label: string;
    enabled: boolean;
}
export interface Messages {
    content: ANAChatMessage[];
    isFirst: boolean;
    isLast: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}
export interface ChatCustomerInfo {
    agentId: string;
    assignedAt: number;
    businessId: string;
    createdAt: number;
    customerId: string;
    flowId: string;
    id: string;
    lastMessageTime: number;
    messages: Messages;
    sessionId: string;
    status: string;
    unreadCount: number;
    draftMsgText?: string;
}
export interface AgentChatsData {
    content: ChatCustomerInfo[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    numberOfElements: number;
    size: number;
    number: number;
}
export interface AgentChatsResponse {
    data: AgentChatsData;
    error: ErrorInfo;
}
export interface DispositionRequest {
    handoverToBot: boolean;
    message?: any;
}
export interface DispositionData {
    handoverToBot: boolean;
    message?: ANAChatMessage;
}
export interface DispositionResponse {
    data?: DispositionData;
    error?: ErrorInfo;
}
