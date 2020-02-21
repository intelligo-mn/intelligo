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
const data_service_1 = require("../../../shared/services/data/data.service");
const config_service_1 = require("../../../shared/services/config/config.service");
const info_dialog_service_1 = require("../../../shared/services/helpers/info-dialog.service");
const router_1 = require("@angular/router");
let LoginComponent = class LoginComponent {
    constructor(router, config, data, infoDialog) {
        this.router = router;
        this.config = config;
        this.data = data;
        this.infoDialog = infoDialog;
        let serverConfig = localStorage.getItem('serverConfig');
        if (serverConfig) {
            this.config.app = JSON.parse(serverConfig);
            this.socketEndpoint = this.config.app.webSocketEndPoint;
            this.apiGatewayEndpoint = this.config.app.apiGatewayEndPoint;
        }
    }
    signIn() {
        if (!this.socketEndpoint || !this.apiGatewayEndpoint) {
            this.infoDialog.alert('Incomplete Information', 'Please enter the Socket Endpoint and API Gateway Endpoint details. These details will be provided by your IT Administrator');
            return;
        }
        this.config.app.apiGatewayEndPoint = this.apiGatewayEndpoint;
        this.config.app.webSocketEndPoint = this.socketEndpoint;
        localStorage.setItem('serverConfig', JSON.stringify(this.config.app));
        this.data.login(this.username, this.password).subscribe(resData => {
            if (resData.error)
                this.infoDialog.alert('Unable to login', resData.error.message);
            else {
                let userProfile = this.config.getUserProfileFromLoginDetails(resData.data);
                if (userProfile.accessToken) {
                    this.config.profile = userProfile;
                    localStorage.setItem("profile", JSON.stringify(this.config.profile));
                    this.router.navigate(['/chat']);
                }
                else
                    this.router.navigate(['/']);
            }
        }, err => {
            try {
                let resp = JSON.parse(err._body);
                if (resp.error.message)
                    this.infoDialog.alert('Unable to login', resp.error.message);
            }
            catch (e) {
                this.infoDialog.alert(`Oops! Something went wrong!`, err.statusText);
            }
        });
    }
    ngOnInit() {
        let savedProfile = JSON.parse(localStorage.getItem("profile"));
        if (savedProfile && savedProfile.accessToken) {
            this.data.isAccessTokenValid(savedProfile.accessToken).subscribe(resp => {
                if (resp.error) {
                    this.data.logout();
                    this.router.navigateByUrl('/');
                }
                else {
                    this.config.profile = savedProfile;
                    this.router.navigateByUrl('/chat');
                }
            }, err => {
                if (err.status == 401) {
                    this.data.logout();
                    this.router.navigateByUrl('/');
                }
                else
                    this.infoDialog.alert(`Unexpected error occured!`, err.message);
            });
        }
    }
};
LoginComponent = __decorate([
    core_1.Component({
        selector: ".content_inner_wrapper",
        templateUrl: "./login.component.html",
        styleUrls: [
            "./login.component.scss",
            "./login.component.css"
        ]
    }),
    __metadata("design:paramtypes", [router_1.Router, config_service_1.ConfigService, data_service_1.DataService, info_dialog_service_1.InfoDialogService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map