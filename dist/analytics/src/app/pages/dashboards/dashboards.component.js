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
let DashboardsComponent = class DashboardsComponent {
    constructor(_data) {
        this._data = _data;
        this.node = true;
        this.loading = true;
        this.errorMsg1 = true;
        this.active = false;
        this.data = {
            "totalUsers": 0,
            "totalSessions": 0,
            "totalInteractions": 0,
            "channelwiseTotalUsers": {
                "WEB": 0
            },
            "activeUsers": 0,
            "channelwiseRecentUsers": {
                "WEB": 0
            }
        };
        this.nodeChannels = [];
        this.activeChannels = [];
    }
    ngOnInit() {
        if (localStorage.getItem('totalDetails')) {
            this.loading = true;
            this.data = JSON.parse(localStorage.getItem('totalDetails'));
            if (this.data) {
                this.checkForChannels(this.data);
            }
        }
        this.apiCall();
    }
    refresh() {
        this.loading = true;
        this.apiCall();
    }
    checkForChannels(data) {
        if (this.data.channelwiseTotalUsers) {
            this.nodeChannels = Object.keys(this.data.channelwiseTotalUsers);
            this.node = true;
        }
        else {
            this.node = false;
        }
        if (this.data.channelwiseRecentUsers) {
            this.activeChannels = Object.keys(this.data.channelwiseRecentUsers);
            this.active = true;
        }
        else {
            this.active = false;
        }
    }
    apiCall() {
        this._data.getDetails().subscribe(resData => {
            if (resData == null || Object.keys(resData).length == 0 || resData.length == 0) {
                this.loading = false;
                this.errorMsg1 = false;
                return;
            }
            else {
                this.errorMsg1 = true;
                localStorage.setItem("totalDetails", JSON.stringify(resData));
                this.data = (resData);
                this.checkForChannels(this.data);
                this.loading = false;
            }
        }, error => {
            if (localStorage.getItem('totalDetails')) {
                this.data = JSON.parse(localStorage.getItem('totalDetails'));
                this.loading = false;
                this.active = true;
                this.node = true;
            }
            else {
                this.loading = false;
                this.active = false;
                this.node = false;
            }
        });
    }
};
DashboardsComponent = __decorate([
    core_1.Component({
        selector: ".content_inner_wrapper",
        templateUrl: "./dashboards.component.html",
        styleUrls: ["./dashboards.component.scss"],
        encapsulation: core_1.ViewEncapsulation.Emulated
    }),
    __metadata("design:paramtypes", [data_service_1.DataService])
], DashboardsComponent);
exports.DashboardsComponent = DashboardsComponent;
//# sourceMappingURL=dashboards.component.js.map