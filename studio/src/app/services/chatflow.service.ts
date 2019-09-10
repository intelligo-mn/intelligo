import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as models from '../models/chatflow.models'
import { ChatServerConnection, ChatBotProject } from '../models/app.models';

@Injectable()
export class ChatFlowService {
	constructor(private http: Http) { }

	private publishChatBotAPI: string = "bot/business";

	private normalizeBaseUrl(baseUrl: string) {
		baseUrl = baseUrl.replace(/\\$/, '');//Remove ending \ char if any
		if (!baseUrl.endsWith('/'))
			baseUrl += '/';
		return baseUrl;
	}

	publishProject(conn: ChatServerConnection, proj: ChatBotProject, pack: models.ChatFlowPack) {
		let chatNodes = this.normalizeChatNodes(pack.ChatNodes);

		return this.http.post(this.normalizeBaseUrl(conn.ServerUrl) + this.publishChatBotAPI, {
			business_id: proj.Id,
			flow: chatNodes,
			business_name: proj.Name
		}).map(res => res.json());
	}

	chatProjectExists(conn: ChatServerConnection, proj: ChatBotProject) {
		return this.http.get(this.normalizeBaseUrl(conn.ServerUrl) + this.publishChatBotAPI + "?business_id=" + proj.Id).map(res => res.json());
	}

	normalizeChatNodes(chatNodes: models.ChatNode[]) {
		chatNodes.forEach(x => {
			x.IsStartNode = x.IsStartNode ? true : false //This field should exist even if it's false
		});
		return chatNodes;
	}
}