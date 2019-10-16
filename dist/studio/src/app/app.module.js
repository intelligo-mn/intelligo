"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const app_component_1 = require("./app.component");
const home_component_1 = require("./components/home/home.component");
const shared_module_1 = require("./shared.module");
const manage_users_module_1 = require("./components/manage-users/manage-users.module");
const studio_module_1 = require("./components/studio/studio.module");
const analytics_module_1 = require("./components/analytics/analytics.module");
const angular2_hotkeys_1 = require("angular2-hotkeys");
const deploy_module_1 = require("./components/deploy/deploy.module");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/common/http");
const core_2 = require("@ngx-translate/core");
const http_loader_1 = require("@ngx-translate/http-loader");
function HttpLoaderFactory(httpClient) {
    return new http_loader_1.TranslateHttpLoader(httpClient);
}
exports.HttpLoaderFactory = HttpLoaderFactory;
const APP_ROUTES = [
    { path: '', redirectTo: 'studio', pathMatch: "full" },
    {
        path: 'manage-users',
        children: manage_users_module_1.MANAGE_USERS_ROUTES
    },
    {
        path: 'studio',
        children: studio_module_1.STUDIO_ROUTES
    },
    {
        path: 'deploy',
        children: deploy_module_1.DEPLOY_ROUTES
    },
    {
        path: 'analytics',
        children: analytics_module_1.ANALYTICS_ROUTES
    },
    { path: '**', redirectTo: 'studio' }
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            home_component_1.HomeComponent
        ],
        imports: [
            forms_1.FormsModule,
            shared_module_1.SharedModule,
            manage_users_module_1.ManageUsersModule,
            studio_module_1.StudioModule,
            analytics_module_1.AnalyticsModule,
            deploy_module_1.DeployModule,
            router_1.RouterModule.forRoot(APP_ROUTES, {
                useHash: true
            }),
            angular2_hotkeys_1.HotkeyModule.forRoot({
                cheatSheetCloseEsc: true,
            }),
            core_2.TranslateModule.forRoot({
                loader: {
                    provide: core_2.TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [http_1.HttpClient]
                }
            })
        ],
        bootstrap: [app_component_1.AppComponent],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map