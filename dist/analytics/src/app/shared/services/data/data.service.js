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
var _a;
const http_1 = require("@angular/http");
const core_1 = require("@angular/core");
require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/catch");
let DataService = class DataService {
    constructor(http) {
        this.http = http;
        this.apiBase = "";
        this.businessId = "";
        this.businessName = "";
        this.chatFlowId = "";
    }
    getDetails() {
        return this.http.get(`${this.apiBase}/api/Analyzer/GetLiveStats?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}`).map(res => res.json());
    }
    getDetailsNew(startDate, endDate) {
        if (startDate && endDate) {
            return this.http.get(`${this.apiBase}/api/Analyzer/GetNodeStats?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}&startDate=${startDate}&endDate=${endDate}`).map(res => res.json());
        }
        else {
            return this.http.get(`${this.apiBase}/api/Analyzer/GetNodeStats?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}`).map(res => res.json());
        }
    }
    ;
    getGoalNodeDetails() {
        return this.http.get(`${this.apiBase}/api/Analyzer/GetGoalNodes?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}`).map(res => res.json());
    }
    getGoalNodeData(goalNode, startDate, endDate) {
        if (startDate && endDate) {
            return this.http.get(`${this.apiBase}/api/Analyzer/GetGoalNodeStats?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}&goalNodeId=${goalNode}&startDate=${startDate}&endDate=${endDate}`).map(res => res.json());
        }
        else {
            return this.http.get(`${this.apiBase}/api/Analyzer/GetGoalNodeStats?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}&goalNodeId=${goalNode}`).map(res => res.json());
        }
    }
    getActiveUsersAndAgents() {
        return this.http.get(`${this.apiBase}/api/AgentAnalyzer/GetActiveUsersAndAgents?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}`).map(res => res.json());
    }
    getStatsForChatSession() {
        return this.http.get(`${this.apiBase}/api/AgentAnalyzer/GetStatsForChatSession?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}`).map(res => res.json());
    }
    getNumberOfUsersAndChatSessions() {
        return this.http.get(`${this.apiBase}/api/AgentAnalyzer/GetNumberOfUsersAndChatSessionsPerAgent?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}`).map(res => res.json());
    }
    getNumberOfChatSessions() {
        return this.http.get(`${this.apiBase}/api/AgentAnalyzer/GetNumberOfChatSessionsPerDay?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}`).map(res => res.json());
    }
    getUsersData(startDate, endDate) {
        if (startDate && endDate)
            return this.http.get(`${this.apiBase}/api/Analyzer/GetUsersData?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}&businessName=${this.businessName}&startDate=${startDate}&endDate=${endDate}`).map(res => res.json());
        else
            return this.http.get(`${this.apiBase}/api/Analyzer/GetUsersData?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}&businessName=${this.businessName}`).map(res => res.json());
    }
    getBehaviourFlow(startDate, endDate) {
        if (startDate && endDate) {
            return this.http.get(`${this.apiBase}/api/Analyzer/GetBehaviorFlow?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}&startDate=${startDate}&endDate=${endDate}`).map(res => res.json());
        }
        else {
            return this.http.get(`${this.apiBase}/api/Analyzer/GetBehaviorFlow?businessId=${this.businessId}&chatFlowId=${this.chatFlowId}`).map(res => res.json());
        }
    }
};
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" ? _a : Object])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map