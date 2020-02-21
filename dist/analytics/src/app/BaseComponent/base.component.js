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
var _a, _b, _c;
const core_1 = require("@angular/core");
const data_service_1 = require("../shared/services/data/data.service");
const router_1 = require("@angular/router");
const material_1 = require("@angular/material");
const basic_details_component_1 = require("app/shared/components/basic-details/basic-details.component");
let BaseComponent = class BaseComponent {
    constructor(_data, route, router, dialog) {
        this._data = _data;
        this.route = route;
        this.router = router;
        this.dialog = dialog;
        console.log(this.router.routerState.root.queryParams);
        this.route.queryParams.subscribe(params => {
            console.log(params);
            if (params['businessId'] && params['businessName'] && params['chatFlowId'] && params['apiBase']) {
                if (params['apiBase'].slice(-1) == "/")
                    this._data.apiBase = params['apiBase'].slice(0, -1);
                else
                    this._data.apiBase = params['apiBase'];
                this._data.businessId = params['businessId'];
                this._data.businessName = params['businessName'];
                this._data.chatFlowId = params['chatFlowId'];
                console.log(this._data.apiBase);
                console.log(this._data.businessId);
                console.log(this._data.businessName);
                console.log(this._data.chatFlowId);
                if ((localStorage.getItem('businessId') && localStorage.getItem('businessId') != this._data.businessId)
                    || (localStorage.getItem('chatFlowId') && localStorage.getItem('chatFlowId') != this._data.chatFlowId)) {
                    localStorage.removeItem('businessId');
                    localStorage.removeItem('chatFlowId');
                    localStorage.removeItem('analyticsData');
                    localStorage.removeItem('chatSessionsData');
                    localStorage.removeItem('agentApiData');
                    localStorage.removeItem('activeStats');
                    localStorage.removeItem('activeChatDetails');
                    localStorage.removeItem('goalNodes');
                    localStorage.removeItem('goalNodeName');
                    localStorage.removeItem('goalNodeData');
                    localStorage.removeItem('goalNodeId');
                    localStorage.removeItem('graphData');
                    localStorage.removeItem('totalDetails');
                    localStorage.removeItem('rowsData');
                }
                localStorage.setItem('chatFlowId', this._data.chatFlowId);
                localStorage.setItem('businessId', this._data.businessId);
                this.router.navigateByUrl("/dashboards");
            }
            else {
                let l = this.dialog.open(basic_details_component_1.BasicDetailsComponent, {
                    width: 'auto'
                });
                l.afterClosed().subscribe(x => {
                    if (x == true) {
                        this.router.navigateByUrl("/dashboards");
                    }
                });
            }
        });
    }
    ngOnInit() {
    }
};
BaseComponent = __decorate([
    core_1.Component({
        selector: "app-base",
        templateUrl: "./base.component.html",
        styleUrls: ["./base.component.scss"]
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, typeof (_a = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" ? _a : Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" ? _b : Object, typeof (_c = typeof material_1.MatDialog !== "undefined" && material_1.MatDialog) === "function" ? _c : Object])
], BaseComponent);
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=base.component.js.map