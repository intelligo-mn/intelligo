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
const app_state_1 = require("../../app.state");
const config_service_1 = require("../../shared/services/config/config.service");
let LeftSidebarComponent = class LeftSidebarComponent {
    constructor(config, _elementRef, _state) {
        this.config = config;
        this._elementRef = _elementRef;
        this._state = _state;
        this.scrollbarOptions = {
            axis: "y",
            theme: "minimal",
            scrollInertia: 0,
            mouseWheel: { preventDefault: true }
        };
    }
    ngOnInit() { }
    onWindowResize() { }
};
__decorate([
    core_1.HostListener("window:resize"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeftSidebarComponent.prototype, "onWindowResize", null);
LeftSidebarComponent = __decorate([
    core_1.Component({
        selector: "app-sidebar",
        templateUrl: "./left-sidebar.component.html",
        styleUrls: ["./left-sidebar.component.scss"]
    }),
    __metadata("design:paramtypes", [config_service_1.ConfigService, core_1.ElementRef, app_state_1.GlobalState])
], LeftSidebarComponent);
exports.LeftSidebarComponent = LeftSidebarComponent;
//# sourceMappingURL=left-sidebar.component.js.map