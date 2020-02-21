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
let AgentDashboardComponent = class AgentDashboardComponent {
    constructor(_data) {
        this._data = _data;
        this.loading = true;
        this.dataLoading = false;
        this.activeChatDetails = {};
        this.activeStats = {};
    }
    ngOnInit() {
        if (localStorage.getItem('activeChatDetails')) {
            this.activeChatDetails = JSON.parse(localStorage.getItem('activeChatDetails'));
            this._data.getActiveUsersAndAgents().subscribe(resData => {
                this.loading = false;
                this.activeChatDetails = (resData);
                localStorage.setItem('activeChatDetails', JSON.stringify(resData));
            }, error => {
                if (localStorage.getItem('activeChatDetails')) {
                    this.activeChatDetails = JSON.parse(localStorage.getItem('activeChatDetails'));
                    this.loading = false;
                    this.errorMsg = true;
                }
                else {
                    this.loading = false;
                    this.errorMsg = false;
                }
            });
        }
        else {
            this._data.getActiveUsersAndAgents().subscribe(resData => {
                if (resData == null || Object.keys(resData).length == 0 || resData.length == 0) {
                    this.errorMsg = false;
                    this.loading = false;
                }
                else {
                    this.loading = false;
                    this.errorMsg = true;
                    this.activeChatDetails = (resData);
                    localStorage.setItem('activeChatDetails', JSON.stringify(resData));
                }
            }, error => {
                if (localStorage.getItem('activeChatDetails')) {
                    this.activeChatDetails = JSON.parse(localStorage.getItem('activeChatDetails'));
                    this.loading = false;
                    this.errorMsg = true;
                }
                else {
                    this.loading = false;
                    this.errorMsg = false;
                }
            });
        }
        if (localStorage.getItem('activeStats')) {
            this.activeStats = JSON.parse(localStorage.getItem('activeStats'));
            this._data.getStatsForChatSession().subscribe(resData => {
                if (resData == null || Object.keys(resData).length == 0 || resData.length == 0) {
                    this.errorMsg = false;
                    this.loading = false;
                }
                else {
                    this.loading = false;
                    this.errorMsg = true;
                    this.activeStats = (resData);
                    localStorage.setItem('activeStats', JSON.stringify(resData));
                }
            }, error => {
                if (localStorage.getItem('activeStats')) {
                    this.activeStats = JSON.parse(localStorage.getItem('activeStats'));
                    this.loading = false;
                    this.errorMsg = true;
                }
                else {
                    this.loading = false;
                    this.errorMsg = false;
                }
            });
        }
        else {
            this._data.getStatsForChatSession().subscribe(resData => {
                if (resData == null || Object.keys(resData).length == 0 || resData.length == 0) {
                    this.errorMsg = false;
                    this.loading = false;
                }
                else {
                    this.loading = false;
                    this.errorMsg = true;
                    this.activeStats = (resData);
                    localStorage.setItem('activeStats', JSON.stringify(resData));
                }
            }, error => {
                if (localStorage.getItem('activeStats')) {
                    this.activeStats = JSON.parse(localStorage.getItem('activeStats'));
                    this.loading = false;
                    this.errorMsg = true;
                }
                else {
                    this.loading = false;
                    this.errorMsg = false;
                }
            });
        }
        this.dataLoading = true;
    }
    refresh() {
        this.loading = true;
        this._data.getStatsForChatSession().subscribe(resData => {
            if (resData == null || Object.keys(resData).length == 0 || resData.length == 0) {
                this.errorMsg = false;
            }
            else {
                this.errorMsg = true;
                this.activeStats = (resData);
                localStorage.setItem('activeStats', JSON.stringify(resData));
            }
        }, error => {
            this.activeStats = JSON.parse(localStorage.getItem('activeStats'));
            this.loading = false;
            this.errorMsg = false;
        });
        this._data.getActiveUsersAndAgents().subscribe(resData => {
            if (resData == null || Object.keys(resData).length == 0 || resData.length == 0) {
                this.errorMsg = false;
                this.loading = false;
            }
            else {
                this.errorMsg = true;
                this.activeChatDetails = (resData);
                localStorage.setItem('activeChatDetails', JSON.stringify(resData));
                this.loading = false;
            }
        }, error => {
            this.activeChatDetails = JSON.parse(localStorage.getItem('activeChatDetails'));
            this.loading = false;
            this.errorMsg = false;
        });
    }
};
AgentDashboardComponent = __decorate([
    core_1.Component({
        selector: "agent-dashboard",
        templateUrl: "./agentdashboard.component.html",
        styleUrls: ["./agentdashboard.component.scss"]
    }),
    __metadata("design:paramtypes", [data_service_1.DataService])
], AgentDashboardComponent);
exports.AgentDashboardComponent = AgentDashboardComponent;
//# sourceMappingURL=agentdashboard.component.js.map