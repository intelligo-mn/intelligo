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
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const utilities_service_1 = require("../services/utilities.service");
let APIService = class APIService {
    constructor(http) {
        this.http = http;
    }
    setAPIEndpoint(apiEndpoint) {
        this.apiEndpoint = apiEndpoint;
        if (this.apiEndpoint && !this.apiEndpoint.endsWith('/'))
            this.apiEndpoint += "/";
        if (!this.fileUploadEndpoint)
            this.fileUploadEndpoint = this.apiEndpoint + "files";
        this.chatHistoryEndpoint = this.apiEndpoint + "chatdata/messages?userId={userId}&businessId={businessId}&flowId={flowId}&size={size}&page=0&ofCurrentSession={ofCurrentSession}";
    }
    uploadFile(file) {
        let formData = new FormData();
        formData.append("file", file);
        return this.http.post(this.fileUploadEndpoint, formData);
    }
    fetchHistory(oldestMsgTimestamp, size = 20) {
        let businessId = utilities_service_1.UtilitiesService.settings.stompConfig.businessId;
        let customerId = utilities_service_1.UtilitiesService.settings.stompConfig.customerId;
        let flowId = utilities_service_1.UtilitiesService.settings.stompConfig.flowId;
        let currentSessionOnly = utilities_service_1.UtilitiesService.settings.stompConfig.currentSessionOnly;
        let api = this.chatHistoryEndpoint
            .replace('{userId}', customerId)
            .replace('{businessId}', businessId)
            .replace('{size}', size.toString())
            .replace('{flowId}', flowId)
            .replace('{ofCurrentSession}', currentSessionOnly ? 'true' : 'false');
        if (oldestMsgTimestamp)
            api += "&lastMessageTimeStamp=" + oldestMsgTimestamp.toString();
        return this.http.get(api);
    }
};
APIService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient])
], APIService);
exports.APIService = APIService;
//# sourceMappingURL=api.service.js.map