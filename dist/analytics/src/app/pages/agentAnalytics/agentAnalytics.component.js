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
const data_service_1 = require("../../shared/services/data/data.service");
let AgentAnalyticsComponent = class AgentAnalyticsComponent {
    constructor(_data) {
        this._data = _data;
        this.apiData = [];
        this.hideChart1 = false;
        this.hideChart2 = false;
        this.xlabel = "";
        this.ylabel = "";
        this.chatSessionData = [];
        this.agentNames = [];
        this.loading = true;
        this.loading1 = true;
        this.dates = [];
        this.dataLoading = false;
        this.numberOfChatSessions = [];
        this.chatSessionsData = [{
                data: this.numberOfChatSessions,
                label: "Number Of Chat Sessions",
                backgroundColor: "#ffb900"
            }];
        this.agentData = [{
                data: [],
                label: "Number of chat sessions",
                backgroundColor: "#ffb900"
            }];
    }
    ngOnInit() {
        if (localStorage.getItem('numberOfChatSessions')) {
            this.chatSessionData = JSON.parse(localStorage.getItem('numberOfChatSessions'));
            for (let i = 0; i < this.chatSessionData.length; i++) {
                this.dates.push(this.chatSessionData[i].date.substring(0, 10));
                this.numberOfChatSessions.push(this.chatSessionData[i].numberOfSessions);
            }
            this.hideChart1 = true;
            this.xlabel = "Date";
            this.ylabel = "Number Of Chats";
            this.chatSessionsData = [{
                    data: this.numberOfChatSessions,
                    label: "Number Of Chat Sessions",
                    backgroundColor: "#ffb900"
                }];
            this.dataLoading = true;
            this.loading = false;
        }
        this.chatSessionsApiCall();
        if (localStorage.getItem('agentData')) {
            this.apiData = JSON.parse(localStorage.getItem('agentData'));
            let numberOfChatSessions = [];
            if (this.apiData) {
                for (let i = 0; i < this.apiData.length; i++) {
                    numberOfChatSessions.push(this.apiData[i].numberOfChatSessions);
                    this.agentNames.push(this.apiData[i].agentName);
                }
                this.hideChart2 = true;
                this.agentData = [{
                        data: numberOfChatSessions,
                        label: "Number of chat sessions",
                        backgroundColor: "#ffb900"
                    }];
            }
        }
        this.agentDataApiCall();
    }
    chatSessionsApiCall() {
        this._data.getNumberOfChatSessions().subscribe(resData => {
            if (resData == null || Object.keys(resData).length == 0 || resData.length == 0) {
                this.errorMsg = false;
            }
            else {
                localStorage.setItem('chatSessionsData', JSON.stringify(resData));
                this.errorMsg = true;
                this.chatSessionData = resData;
                for (let i = 0; i < this.chatSessionData.length; i++) {
                    this.dates.push(this.chatSessionData[i].date.substring(0, 10));
                    this.numberOfChatSessions.push(this.chatSessionData[i].numberOfSessions);
                }
                this.hideChart1 = true;
                this.xlabel = "Date";
                this.ylabel = "Number Of Chats";
                this.chatSessionsData = [{
                        data: this.numberOfChatSessions,
                        label: "Number Of Chat Sessions",
                        backgroundColor: "#ffb900"
                    }];
                this.xlabel = "Date";
                this.ylabel = "Number Of Chats";
            }
            this.loading = false;
        }, error => {
            if (localStorage.getItem('chatSessionsData')) {
                this.loading = false;
                this.chatSessionData = JSON.parse(localStorage.getItem('chatSessionsData'));
                for (let i = 0; i < this.chatSessionData.length; i++) {
                    this.dates.push(this.chatSessionData[i].date.substring(0, 10));
                    this.numberOfChatSessions.push(this.chatSessionData[i].numberOfSessions);
                }
                this.hideChart1 = true;
                this.xlabel = "Date";
                this.ylabel = "Number Of Chats";
                this.chatSessionsData = [{
                        data: this.numberOfChatSessions,
                        label: "Number Of Chat Sessions",
                        backgroundColor: "#ffb900"
                    }];
                this.errorMsg = true;
            }
            else {
                this.loading = false;
                this.errorMsg = false;
            }
        });
    }
    agentDataApiCall() {
        this._data.getNumberOfUsersAndChatSessions().subscribe(resDataNew => {
            localStorage.setItem('agentApiData', JSON.stringify(resDataNew));
            this.apiData = resDataNew;
            let numberOfChatSessions = [];
            this.agentNames = [];
            for (let i = 0; i < this.apiData.length; i++) {
                numberOfChatSessions.push(this.apiData[i].numberOfChatSessions);
                this.agentNames.push(this.apiData[i].agentName);
            }
            this.hideChart2 = true;
            this.loading1 = false;
            this.agentData = [{
                    data: numberOfChatSessions,
                    label: "Number of chat sessions",
                    backgroundColor: "#ffb900"
                }];
        }, error => {
            if (localStorage.getItem('agentApiData')) {
                this.apiData = JSON.parse(localStorage.getItem('agentApiData'));
                let numberOfChatSessions = [];
                this.agentNames = [];
                for (let i = 0; i < this.apiData.length; i++) {
                    numberOfChatSessions.push(this.apiData[i].numberOfChatSessions);
                    this.agentNames.push(this.apiData[i].agentName);
                }
                this.hideChart2 = true;
                this.loading1 = false;
                this.agentData = [{
                        data: numberOfChatSessions,
                        label: "Number of chat sessions",
                        backgroundColor: "#ffb900"
                    }];
            }
            else {
                this.hideChart2 = false;
                this.loading1 = false;
            }
        });
    }
    refresh1() {
        this.loading = true;
        this.dates = [];
        this.numberOfChatSessions = [];
        this.chatSessionsApiCall();
    }
    refresh2() {
        this.loading1 = true;
        this.agentDataApiCall();
    }
};
AgentAnalyticsComponent = __decorate([
    core_1.Component({
        selector: 'agent-analytics',
        templateUrl: './agentAnalytics.component.html',
        styleUrls: ['./agentAnalytics.component.scss']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService])
], AgentAnalyticsComponent);
exports.AgentAnalyticsComponent = AgentAnalyticsComponent;
//# sourceMappingURL=agentAnalytics.component.js.map