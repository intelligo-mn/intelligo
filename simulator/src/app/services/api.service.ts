import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'

import { ANATime, ANADate, ANAMeta, SenderType } from '../models/ana-chat.models';
import { StompConfig } from './stomp.service';
import { AppConfig, AppSettings, BrandingConfig, ThirdPartyConfig } from '../models/ana-config.models';
import { UtilitiesService } from '../services/utilities.service';

@Injectable()
export class APIService {
	fileUploadEndpoint: string;
	apiEndpoint: string;
	private chatHistoryEndpoint: string;

	constructor(public http: Http) { }

	setAPIEndpoint(apiEndpoint: string) {
		this.apiEndpoint = apiEndpoint;
		if (this.apiEndpoint && !this.apiEndpoint.endsWith('/'))
			this.apiEndpoint += "/";
		if (!this.fileUploadEndpoint)
			this.fileUploadEndpoint = this.apiEndpoint + "files";
		this.chatHistoryEndpoint = this.apiEndpoint + "chatdata/messages?userId={userId}&businessId={businessId}&flowId={flowId}&size={size}&page=0&ofCurrentSession={ofCurrentSession}";
	}

	uploadFile(file: File) {
		let formData = new FormData();
		formData.append("file", file);
		let headers = new Headers();
		return this.http.post(this.fileUploadEndpoint, formData, { headers }).map(res => res.json() as UploadFileResponse);
	}

	fetchHistory(oldestMsgTimestamp: number, size: number = 20) {
		let businessId = UtilitiesService.settings.stompConfig.businessId;
		let customerId = UtilitiesService.settings.stompConfig.customerId;
		let flowId = UtilitiesService.settings.stompConfig.flowId;
		let currentSessionOnly = UtilitiesService.settings.stompConfig.currentSessionOnly;

		let api = this.chatHistoryEndpoint
			.replace('{userId}', customerId)
			.replace('{businessId}', businessId)
			.replace('{size}', size.toString())
			.replace('{flowId}', flowId)
			.replace('{ofCurrentSession}', currentSessionOnly ? 'true' : 'false');

		if (oldestMsgTimestamp)
			api += "&lastMessageTimeStamp=" + oldestMsgTimestamp.toString();
		return this.http.get(api).map(res => res.json() as ChatHistoryResponse);
	}
}

export interface Link {
	rel: string;
	href: string;
}

export interface UploadFileResponse {
	data: boolean;
	links: Link[];
}

export interface ChatHistoryResponse {
	content: any[];
	number: number;
	numberOfElements: number;
	size: number;
	totalElements: number;
	isFirst: boolean;
	isLast: boolean;
	totalPages: number;
}