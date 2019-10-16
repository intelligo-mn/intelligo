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
const data_service_1 = require("../../../services/data.service");
const info_dialog_service_1 = require("../../../services/info-dialog.service");
const login_service_1 = require("../../../services/login.service");
const change_password_component_1 = require("../change-password/change-password.component");
let AppHeaderBarComponent = class AppHeaderBarComponent {
    constructor(dataService, dialog, router, infoDialog, loginService) {
        this.dataService = dataService;
        this.dialog = dialog;
        this.router = router;
        this.infoDialog = infoDialog;
        this.loginService = loginService;
        this.goBack = () => {
            this.router.navigateByUrl('/');
        };
        this.logoutNavigation = '/';
        this.skipAuth = false;
        this.hideBackButton = false;
        this.title = "";
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.checkAndUpdate();
    }
    checkAndUpdate() {
        Promise.resolve(true).then(() => {
            this.loginService.performLogin(this.skipAuth, "/", true, (done) => {
                if (done) {
                    this.loggedInUser = this.dataService.loggedInUser;
                    if (this.afterInit)
                        this.afterInit();
                }
            });
        });
    }
    loginDialog() {
        this.loginService.performLogin(false, null, true, (done) => {
            if (this.dataService.loggedInUser) {
                this.loggedInUser = this.dataService.loggedInUser;
            }
        });
    }
    logout() {
        this.dataService.logout();
        this.loggedInUser = null;
        if (this.logoutNavigation) {
            this.router.navigateByUrl(this.logoutNavigation);
        }
    }
    changePassword() {
        this.dialog.open(change_password_component_1.ChangePasswordComponent, {
            width: '60%',
        });
    }
    roles() {
        if (this.loggedInUser && this.loggedInUser.roles)
            return this.loggedInUser.roles.map(x => x.label).join(', ');
        return "";
    }
};
__decorate([
    core_1.Input('goBack'),
    __metadata("design:type", Object)
], AppHeaderBarComponent.prototype, "goBack", void 0);
__decorate([
    core_1.Input('logoutNavigation'),
    __metadata("design:type", String)
], AppHeaderBarComponent.prototype, "logoutNavigation", void 0);
__decorate([
    core_1.Input('skipAuth'),
    __metadata("design:type", Boolean)
], AppHeaderBarComponent.prototype, "skipAuth", void 0);
__decorate([
    core_1.Input('hideBackButton'),
    __metadata("design:type", Boolean)
], AppHeaderBarComponent.prototype, "hideBackButton", void 0);
__decorate([
    core_1.Input('title'),
    __metadata("design:type", String)
], AppHeaderBarComponent.prototype, "title", void 0);
AppHeaderBarComponent = __decorate([
    core_1.Component({
        selector: 'app-header-bar',
        templateUrl: './app-header-bar.component.html',
        styleUrls: ['./app-header-bar.component.scss']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService,
        material_1.MatDialog,
        router_1.Router,
        info_dialog_service_1.InfoDialogService,
        login_service_1.LoginService])
], AppHeaderBarComponent);
exports.AppHeaderBarComponent = AppHeaderBarComponent;
//# sourceMappingURL=app-header-bar.component.js.map