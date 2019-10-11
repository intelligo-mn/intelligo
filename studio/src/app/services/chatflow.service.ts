import { Injectable } from '@angular/core';
import { ChatBotProject, ChatServerConnection } from '../models/app.models';
import * as models from '../models/chatflow.models';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChatFlowService {
	constructor(private http: HttpClient) { }

	private publishChatBotAPI: string = "bot/business";

	private normalizeBaseUrl(baseUrl: string) {
		baseUrl = baseUrl.replace(/\\Ï$/, '');//Remove ending \ char if any
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
		});
	}

	chatProjectExists(conn: ChatServerConnection, proj: ChatBotProject) {
		return this.http.get(this.normalizeBaseUrl(conn.ServerUrl) + this.publishChatBotAPI + "?business_id=" + proj.Id);
	}

	normalizeChatNodes(chatNodes: models.ChatNode[]) {
		chatNodes.forEach(x => {
			x.IsStartNode = x.IsStartNode ? true : false //This field should exist even if it's false
		});
		return chatNodes;
	}
}