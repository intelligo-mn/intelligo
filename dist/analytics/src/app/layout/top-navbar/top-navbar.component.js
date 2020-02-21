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
const core_1 = require("@angular/core");
const app_state_1 = require("../../app.state");
const config_service_1 = require("../../shared/services/config/config.service");
const themes_service_1 = require("../../shared/services/themes/themes.service");
let TopNavbarComponent = class TopNavbarComponent {
    constructor(config, _elementRef, _state, themes) {
        this.config = config;
        this._elementRef = _elementRef;
        this._state = _state;
        this.themes = themes;
        this._state.subscribe("app.isCollapsed", isCollapsed => {
            this.config.appLayout.isApp_SidebarLeftCollapsed = isCollapsed;
        });
        this._state.subscribe('app.isApp_MobileSidebarLeftOpen', (isApp_MobileSidebarLeftOpen) => {
            this.config.appLayout.isApp_MobileSidebarLeftOpen = isApp_MobileSidebarLeftOpen;
        });
        this._state.subscribe('app.isApp_BackdropVisible', (isApp_BackdropVisible) => {
            this.config.appLayout.isApp_BackdropVisible = isApp_BackdropVisible;
        });
        this._state.subscribe('app.isApp_SidebarRightOpen', (isApp_SidebarRightOpen) => {
            this.config.appLayout.isApp_SidebarRightOpen = isApp_SidebarRightOpen;
        });
    }
    ngOnInit() {
    }
    setTheme() {
        this.themes.setTheme(this.currentTheme);
    }
    toggleProfile() {
        this.config.profile.isProfileVisible = !this.config.profile.isProfileVisible;
        this._state.notifyDataChanged("profile.isProfileVisible", this.config.profile.isProfileVisible);
        return false;
    }
    toggleMenuSideabar() {
        this.config.appLayout.isApp_SidebarLeftCollapsed = !this.config.appLayout.isApp_SidebarLeftCollapsed;
        this._state.notifyDataChanged("app.isCollapsed", this.config.appLayout.isApp_SidebarLeftCollapsed);
        return false;
    }
    toggleAppMobileLeftMenuSidebar() {
        this.config.appLayout.isApp_MobileSidebarLeftOpen = !this.config.appLayout.isApp_MobileSidebarLeftOpen;
        this.config.appLayout.isApp_BackdropVisible = !this.config.appLayout.isApp_BackdropVisible;
        this._state.notifyDataChanged('app.isApp_MobileSidebarLeftOpen', this.config.appLayout.isApp_MobileSidebarLeftOpen);
        this._state.notifyDataChanged('app.isApp_BackdropVisible', this.config.appLayout.isApp_BackdropVisible);
        return false;
    }
    toggleAppRightSidebar() {
        this.config.appLayout.isApp_SidebarRightOpen = !this.config.appLayout.isApp_SidebarRightOpen;
        this.config.appLayout.isApp_BackdropVisible = !this.config.appLayout.isApp_BackdropVisible;
        this._state.notifyDataChanged('app.isApp_SidebarRightOpen', this.config.appLayout.isApp_SidebarRightOpen);
        this._state.notifyDataChanged('app.isApp_BackdropVisible', this.config.appLayout.isApp_BackdropVisible);
        return false;
    }
};
TopNavbarComponent = __decorate([
    core_1.Component({
        selector: "app-header",
        templateUrl: "./top-navbar.component.html",
        styleUrls: ["./top-navbar.component.scss"],
        encapsulation: core_1.ViewEncapsulation.Emulated,
    }),
    __metadata("design:paramtypes", [config_service_1.ConfigService, typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _a : Object, app_state_1.GlobalState, themes_service_1.ThemesService])
], TopNavbarComponent);
exports.TopNavbarComponent = TopNavbarComponent;
//# sourceMappingURL=top-navbar.component.js.map