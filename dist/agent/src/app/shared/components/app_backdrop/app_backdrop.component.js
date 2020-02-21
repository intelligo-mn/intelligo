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
const app_state_1 = require("../../../app.state");
const config_service_1 = require("../../services/config/config.service");
let AppBackdropComponent = class AppBackdropComponent {
    constructor(config, _state) {
        this.config = config;
        this._state = _state;
        this.isApp_BackdropVisible = false;
        this._state.subscribe('app.isApp_BackdropVisible', (isApp_BackdropVisible) => {
            this.isApp_BackdropVisible = this.config.appLayout.isApp_BackdropVisible;
        });
    }
    ngOnInit() {
    }
    appBackdropClose() {
        this.config.appLayout.isApp_BackdropVisible = false;
        this._state.notifyDataChanged('app.isApp_BackdropVisible', this.config.appLayout.isApp_BackdropVisible);
        if (this.config.appLayout.isApp_BackdropVisible === false) {
            this.config.appLayout.isApp_MobileSidebarLeftOpen = false;
            this._state.notifyDataChanged('app.isApp_MobileSidebarLeftOpen', this.config.appLayout.isApp_MobileSidebarLeftOpen);
            this.config.appLayout.isApp_SidebarRightOpen = false;
            this._state.notifyDataChanged('app.isApp_SidebarRightOpen', this.config.appLayout.isApp_SidebarRightOpen);
        }
    }
};
AppBackdropComponent = __decorate([
    core_1.Component({
        selector: 'appBackdrop',
        templateUrl: './app_backdrop.component.html',
        styleUrls: ['./app_backdrop.component.scss']
    }),
    __metadata("design:paramtypes", [config_service_1.ConfigService, app_state_1.GlobalState])
], AppBackdropComponent);
exports.AppBackdropComponent = AppBackdropComponent;
//# sourceMappingURL=app_backdrop.component.js.map