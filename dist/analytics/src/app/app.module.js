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
const common_1 = require("@angular/common");
const platform_browser_1 = require("@angular/platform-browser");
const animations_1 = require("@angular/platform-browser/animations");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/http");
const app_component_1 = require("./app.component");
const app_service_1 = require("./app.service");
const app_state_1 = require("./app.state");
const services_module_1 = require("./shared/services/services.module");
const shared_module_1 = require("./shared/shared.module");
const app_routing_1 = require("./app.routing");
const base_module_1 = require("./BaseComponent/base.module");
const localstorage_todo_service_1 = require("./shared/services/localstorage/localstorage-todo.service");
const platform_browser_2 = require("@angular/platform-browser");
const core_2 = require("@angular/core");
class HammerConfig extends platform_browser_2.HammerGestureConfig {
    constructor() {
        super(...arguments);
        this.overrides = {
            swipe: { velocity: 0.4, threshold: 20 }
        };
    }
}
exports.HammerConfig = HammerConfig;
const APP_PROVIDERS = [
    app_service_1.AppState,
    app_state_1.GlobalState,
    platform_browser_1.Title,
    localstorage_todo_service_1.LocalStorageTodoService,
    { provide: platform_browser_2.HAMMER_GESTURE_CONFIG, useClass: HammerConfig },
    { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
];
let AppModule = class AppModule {
    constructor(appState) {
        this.appState = appState;
    }
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [app_component_1.AppComponent],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            base_module_1.BaseModule,
            forms_1.ReactiveFormsModule,
            animations_1.NoopAnimationsModule,
            services_module_1.ServicesModule,
            shared_module_1.SharedModule.forRoot(),
            app_routing_1.AppRoutingModule
        ],
        providers: [APP_PROVIDERS],
        bootstrap: [app_component_1.AppComponent],
        schemas: [core_2.NO_ERRORS_SCHEMA]
    }),
    __metadata("design:paramtypes", [app_service_1.AppState])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map