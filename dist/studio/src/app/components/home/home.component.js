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
const material_1 = require("@angular/material");
const router_1 = require("@angular/router");
const data_service_1 = require("../../services/data.service");
const info_dialog_service_1 = require("../../services/info-dialog.service");
const login_service_1 = require("../../services/login.service");
const business_picker_component_1 = require("../shared/business-picker/business-picker.component");
let HomeComponent = class HomeComponent {
    constructor(router, loginService, infoDialog, dialog, dataService) {
        this.router = router;
        this.loginService = loginService;
        this.infoDialog = infoDialog;
        this.dialog = dialog;
        this.dataService = dataService;
    }
    studio() {
        this.router.navigateByUrl('/studio');
    }
    userManagement() {
        this.loginService.performLogin(true, "/", true, (done) => {
            if (!done) {
                this.infoDialog.alert("Login Required", "You must be logged in to your Chatbots.mn chat server to manage users");
                return;
            }
            if (this.dataService.loggedInUser) {
                if (this.dataService.isSuperAdmin()) {
                    this.router.navigateByUrl('/manage-users');
                }
                else if (this.dataService.isBizAdmin() && this.dataService.loggedInUser.businessId) {
                    this.router.navigateByUrl('/manage-users/users?bizId=' + this.dataService.loggedInUser.businessId);
                }
                else {
                    this.infoDialog.alert("Unauthorized!", "Only a super admin or a business admin can login into user management");
                }
            }
        });
    }
    analytics() {
        this.loginService.performLogin(true, null, true, (done) => {
            if (!done) {
                this.infoDialog.alert("Login Required", "You must be logged in to your Chatbots.mn chat server to view analytics");
                return;
            }
            if (this.dataService.loggedInUser) {
                if (this.dataService.isSuperAdmin()) {
                    this.openAnalyticsPicker({ askFlowId: true });
                }
                else if ((this.dataService.isBizAdmin() || this.dataService.isFlowManager()) && this.dataService.loggedInUser.businessId) {
                    this.openAnalyticsPicker({
                        askFlowId: true,
                        businessId: this.dataService.loggedInUser.businessId
                    });
                }
                else {
                    this.infoDialog.alert("Unauthorized!", "Only a super admin, a business admin or a flow manager can login into user management");
                }
            }
        });
    }
    deploy() {
        this.loginService.performLogin(true, null, true, (done) => {
            if (!done) {
                this.infoDialog.alert("Login Required", "You must be logged in to your Chatbots.mn chat server to deploy your chatbot");
                return;
            }
            if (this.dataService.loggedInUser) {
                if (this.dataService.isSuperAdmin()) {
                    this.openDeployPage({ askFlowId: true });
                }
                else if ((this.dataService.isBizAdmin() || this.dataService.isFlowManager()) && this.dataService.loggedInUser.businessId) {
                    this.openDeployPage({
                        askFlowId: true,
                        businessId: this.dataService.loggedInUser.businessId
                    });
                }
                else {
                    this.infoDialog.alert("Unauthorized!", "Only a super admin, a business admin or a flow manager can login into user management");
                }
            }
        });
    }
    openAnalyticsPicker(params) {
        let d = this.dialog.open(business_picker_component_1.BusinessPickerComponent, {
            width: '30%',
            data: params
        });
        d.afterClosed().subscribe((x) => {
            if (x && x.bizAccount && x.chatProj) {
                this.infoDialog.prompt("Analytics Server Url", "Please enter the analytics server url", (result) => {
                    if (result) {
                        localStorage.setItem('analyticsApiBase', result);
                        let url = `/analytics?apiBase=${result}&businessId=${x.bizAccount.id}&businessName=${x.bizAccount.name}&chatFlowId=${x.chatProj.id}`;
                        this.router.navigateByUrl(url);
                    }
                }, localStorage.getItem('analyticsApiBase'));
            }
        });
    }
    openDeployPage(params) {
        let d = this.dialog.open(business_picker_component_1.BusinessPickerComponent, {
            width: '30%',
            data: params
        });
        d.afterClosed().subscribe((x) => {
            if (x && x.bizAccount && x.chatProj) {
                let url = `/deploy?businessId=${x.bizAccount.id}&chatFlowId=${x.chatProj.id}`;
                this.router.navigateByUrl(url);
            }
        });
    }
};
HomeComponent = __decorate([
    core_1.Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.scss']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        login_service_1.LoginService,
        info_dialog_service_1.InfoDialogService,
        material_1.MatDialog,
        data_service_1.DataService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map