"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
let ChatFlowService = class ChatFlowService {
    constructor(http) {
        this.http = http;
        this.publishChatBotAPI = "bot/business";
    }
    normalizeBaseUrl(baseUrl) {
        baseUrl = baseUrl.replace(/\\Ï$/, '');
        if (!baseUrl.endsWith('/'))
            baseUrl += '/';
        return baseUrl;
    }
    publishProject(conn, proj, pack) {
        let chatNodes = this.normalizeChatNodes(pack.ChatNodes);
        return this.http.post(this.normalizeBaseUrl(conn.ServerUrl) + this.publishChatBotAPI, {
            business_id: proj.Id,
            flow: chatNodes,
            business_name: proj.Name
        });
    }
    chatProjectExists(conn, proj) {
        return this.http.get(this.normalizeBaseUrl(conn.ServerUrl) + this.publishChatBotAPI + "?business_id=" + proj.Id);
    }
    normalizeChatNodes(chatNodes) {
        chatNodes.forEach(x => {
            x.IsStartNode = x.IsStartNode ? true : false;
        });
        return chatNodes;
    }
};
ChatFlowService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient])
], ChatFlowService);
exports.ChatFlowService = ChatFlowService;
//# sourceMappingURL=chatflow.service.js.map