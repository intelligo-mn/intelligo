"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const platform_browser_1 = require("@angular/platform-browser");
const router_1 = require("@angular/router");
const ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
const core_2 = require("@ngx-translate/core");
const http_loader_1 = require("@ngx-translate/http-loader");
const app_routing_module_1 = require("./app-routing.module");
const app_component_1 = require("./app.component");
const home_module_1 = require("./home/home.module");
const landing_component_1 = require("./landing/landing.component");
const login_component_1 = require("./login/login.component");
const profile_component_1 = require("./profile/profile.component");
const sections_module_1 = require("./sections/sections.module");
const footer_component_1 = require("./shared/footer/footer.component");
const navbar_component_1 = require("./shared/navbar/navbar.component");
const signup_component_1 = require("./signup/signup.component");
const error_page_component_1 = require("./error-page/error-page.component");
function HttpLoaderFactory(httpClient) {
    return new http_loader_1.TranslateHttpLoader(httpClient);
}
exports.HttpLoaderFactory = HttpLoaderFactory;
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            signup_component_1.SignupComponent,
            landing_component_1.LandingComponent,
            profile_component_1.ProfileComponent,
            navbar_component_1.NavbarComponent,
            footer_component_1.FooterComponent,
            login_component_1.LoginComponent,
            error_page_component_1.ErrorPageComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpClientModule,
            common_1.CommonModule,
            forms_1.FormsModule,
            router_1.RouterModule,
            ng_bootstrap_1.NgbModule,
            app_routing_module_1.AppRoutingModule,
            sections_module_1.SectionsModule,
            home_module_1.HomeModule,
            core_2.TranslateModule.forRoot({
                loader: {
                    provide: core_2.TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [http_1.HttpClient]
                }
            })
        ],
        providers: [],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map