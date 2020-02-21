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
var _a, _b;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const app_state_1 = require("./app.state");
const config_service_1 = require("./shared/services/config/config.service");
const preloader_service_1 = require("./shared/services/preloader/preloader.service");
const spinner_service_1 = require("./shared/services/spinner/spinner.service");
const themes_service_1 = require("./shared/services/themes/themes.service");
const data_service_1 = require("./shared/services/data/data.service");
let AppComponent = class AppComponent {
    constructor(_data, _state, config, viewContainerRef, _spinner, titleService, themesService) {
        this._data = _data;
        this._state = _state;
        this.config = config;
        this.viewContainerRef = viewContainerRef;
        this._spinner = _spinner;
        this.titleService = titleService;
        this.themesService = themesService;
    }
    get isApp_SidebarLeftCollapsed() {
        return this.config.appLayout.isApp_SidebarLeftCollapsed;
    }
    get isApp_MobileSidebarLeftOpen() {
        return this.config.appLayout.isApp_MobileSidebarLeftOpen;
    }
    get isApp_SidebarRightOpen() {
        return this.config.appLayout.isApp_SidebarRightOpen;
    }
    setTitle(newTitle) {
        this.titleService.setTitle(newTitle);
    }
    ngOnInit() {
    }
    onWindowResize() {
        if (this._shouldMenuReset()) {
            this.config.appLayout.isApp_SidebarLeftCollapsed = false;
        }
    }
    _shouldMenuReset() {
        return window.innerWidth <= this.config.breakpoint.desktopLG;
    }
    ngAfterViewInit() {
        preloader_service_1.PreloaderService.load().then(values => {
            this._spinner.hide();
        });
    }
};
__decorate([
    core_1.HostBinding("class.app_sidebar-menu-collapsed"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], AppComponent.prototype, "isApp_SidebarLeftCollapsed", null);
__decorate([
    core_1.HostBinding("class.app_sidebar-left-open"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], AppComponent.prototype, "isApp_MobileSidebarLeftOpen", null);
__decorate([
    core_1.HostBinding("class.sidebar-overlay-open"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], AppComponent.prototype, "isApp_SidebarRightOpen", null);
__decorate([
    core_1.HostListener("window:resize"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppComponent.prototype, "onWindowResize", null);
AppComponent = __decorate([
    core_1.Component({
        selector: "app-root",
        template: "<router-outlet></router-outlet>",
        styleUrls: ["./app.component.scss"]
    }),
    __metadata("design:paramtypes", [data_service_1.DataService,
        app_state_1.GlobalState,
        config_service_1.ConfigService, typeof (_a = typeof core_1.ViewContainerRef !== "undefined" && core_1.ViewContainerRef) === "function" ? _a : Object, spinner_service_1.SpinnerService, typeof (_b = typeof platform_browser_1.Title !== "undefined" && platform_browser_1.Title) === "function" ? _b : Object, themes_service_1.ThemesService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map