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
const app_state_1 = require("../app.state");
const config_service_1 = require("../shared/services/config/config.service");
let LayoutComponent = class LayoutComponent {
    constructor(config, _elementRef, _state) {
        this.config = config;
        this._elementRef = _elementRef;
        this._state = _state;
    }
    ngOnInit() {
    }
    toggleMenuSideabar() {
        this.config.appLayout.isApp_SidebarLeftCollapsed = !this.config.appLayout.isApp_SidebarLeftCollapsed;
        this._state.notifyDataChanged("app.isCollapsed", this.config.appLayout.isApp_SidebarLeftCollapsed);
        return false;
    }
};
LayoutComponent = __decorate([
    core_1.Component({
        selector: 'app-layout',
        templateUrl: './layout.component.html',
        styleUrls: ['./layout.component.scss'],
        encapsulation: core_1.ViewEncapsulation.Emulated,
    }),
    __metadata("design:paramtypes", [config_service_1.ConfigService, typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _a : Object, app_state_1.GlobalState])
], LayoutComponent);
exports.LayoutComponent = LayoutComponent;
//# sourceMappingURL=layout.component.js.map