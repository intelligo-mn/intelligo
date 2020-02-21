import { Http, Headers, Response, Jsonp, RequestOptions } from "@angular/http";
import { HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ConfigService } from "../config/config.service"
import "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";
import { timestamp } from "rxjs/operator/timestamp";
import { resetFakeAsyncZone } from "@angular/core/testing";
import { ANAChatMessage } from "app/shared/model/ana-chat.models";

@Injectable()
export class DataService {

    baseURL: string;
	constructor(private http: Http, private config: ConfigService, private router: Router) { }

	private getHeaders() {
		let headers = new Headers();
		if (this.config.profile.accessToken)
			headers.set('access-token', this.config.profile.accessToken);
		return headers;
	}

	getChatDetails(page: number, size: number, search?: string, businessId?: string, historySize: number = 5) {
		let url = this.config.app.webSocketEndPoint + `/api/chats`;
		let params = new URLSearchParams();
		params.append("page", page.toString());
		params.append("size", size.toString());
		params.append("historySize", historySize.toString());
		if (businessId)
			params.append("businessId", businessId);
		if (search)
			params.append("searchText", search);

		return this.http.get(this.config.app.webSocketEndPoint + `/api/chats?` + params, { headers: this.getHeaders() })
			.map(res => res.json() as AgentChatsResponse);
	};

	intentToHandover(sessionId: string) {
		let req: DispositionRequest = {
			handoverToBot: true
		}
		return this.http.post(this.config.app.webSocketEndPoint + `/api/chats/sessions/${sessionId}/dispositions`, req, { headers: this.getHeaders() })
			.map(res => res.json() as DispositionResponse);
	};

	handover(sessionId: string, message: ANAChatMessage) {
		let req: DispositionRequest = {
			handoverToBot: false,
			message: message
		}
		return this.http.post(this.config.app.webSocketEndPoint + `/api/chats/sessions/${sessionId}/dispositions`, req, { headers: this.getHeaders() })
			.map(res => res.json() as DispositionResponse);
	};

	getHistory(customerId, businessId, pageSize, pageNumber, timeStamp?: number, flowId?: string) {
		let myparams = new URLSearchParams();
		myparams.append("userId", customerId);
		myparams.append("businessId", businessId);
		if (flowId) {
			myparams.append("flowId", flowId);
		}
		myparams.append("size", pageSize);

		if (timeStamp)
			myparams.append("lastMessageTimeStamp", timeStamp.toString());
		else
			myparams.append("page", pageNumber);

		this.baseURL = this.config.app.apiGatewayEndPoint;
		return this.http.get(this.baseURL + "/chatdata/messages?" + myparams, { headers: this.getHeaders() })
			.map((res: Response) => res.json());
	};

	login(username, password) {
		return this.http.post(this.config.app.apiGatewayEndPoint + "/auth/login", {
			username: username,
			password: password
		}).map(res => res.json() as LoginResponse)
	}

	isAccessTokenValid(accessToken: string) {
		return this.http.get(this.config.app.apiGatewayEndPoint + "/auth/me", {
			headers: new Headers({
				"access-token": accessToken
			})
		}).map(res => res.json() as LoginResponse);
	}

	logout() {
		try {
			this.http.get(this.config.app.apiGatewayEndPoint + "/auth/logout", { headers: this.getHeaders() }).subscribe(x => {
				console.log('Logout Done: ' + x.text());
			});
		} catch (e) {
			console.log('Logout Error');
			console.log(e);
		}
		localStorage.removeItem("profile");
	}

	returnToHome() {
		this.router.navigateByUrl('/');
	}
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