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
const platform_browser_1 = require("@angular/platform-browser");
const globals_service_1 = require("../../../services/globals.service");
const router_1 = require("@angular/router");
const data_service_1 = require("../../../services/data.service");
const environment_1 = require("../../../../environments/environment");
const app_header_bar_component_1 = require("../../shared/app-header-bar/app-header-bar.component");
const info_dialog_service_1 = require("../../../services/info-dialog.service");
let AnalyticsFrameComponent = class AnalyticsFrameComponent {
    constructor(sanitizer, globals, router, infoDialog, route) {
        this.sanitizer = sanitizer;
        this.globals = globals;
        this.router = router;
        this.infoDialog = infoDialog;
        this.route = route;
        this.iframeUrl = "";
        this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
        console.log('AnalyticsFrameComponent');
        this.route.queryParams.subscribe(x => {
            console.log('Params of analytics frame');
            console.log(x);
            if (x['apiBase'] && x['businessId'] && x['businessName'] && x['chatFlowId']) {
                let initialUrl = `/index.html#/?apiBase=${encodeURIComponent(x['apiBase'])}&businessId=${x['businessId']}&businessName=${encodeURIComponent(x['businessName'])}&chatFlowId=${x['chatFlowId']}`;
                let url = "analytics-dashboard" + initialUrl;
                if (environment_1.environment.local)
                    url = "http://localhost:4202" + initialUrl;
                console.log('Analytics Frame Url');
                console.log(url);
                this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            }
        });
    }
    ngAfterViewInit() {
        if (this.appHeader) {
            this.appHeader.goBack = () => {
                this.infoDialog.confirm('Go back to home page?', 'Are you sure you want to exit from analytics and go back to home page?', (ok) => {
                    if (ok) {
                        this.router.navigateByUrl('');
                    }
                });
            };
        }
    }
    ngOnInit() {
    }
};
__decorate([
    core_1.ViewChild(app_header_bar_component_1.AppHeaderBarComponent, { static: false }),
    __metadata("design:type", app_header_bar_component_1.AppHeaderBarComponent)
], AnalyticsFrameComponent.prototype, "appHeader", void 0);
__decorate([
    core_1.ViewChild('analyticsFrame', { static: false }),
    __metadata("design:type", core_1.ElementRef)
], AnalyticsFrameComponent.prototype, "analyticsFrame", void 0);
AnalyticsFrameComponent = __decorate([
    core_1.Component({
        selector: 'app-analytics-frame',
        templateUrl: './analytics-frame.component.html',
        styleUrls: ['./analytics-frame.component.scss']
    }),
    __metadata("design:paramtypes", [platform_browser_1.DomSanitizer,
        globals_service_1.GlobalsService,
        router_1.Router,
        info_dialog_service_1.InfoDialogService,
        router_1.ActivatedRoute])
], AnalyticsFrameComponent);
exports.AnalyticsFrameComponent = AnalyticsFrameComponent;
let CanActivateAnalyticsFrameComponent = class CanActivateAnalyticsFrameComponent {
    constructor(dataService) {
        this.dataService = dataService;
    }
    canActivate(route, state) {
        return true;
    }
};
CanActivateAnalyticsFrameComponent = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [data_service_1.DataService])
], CanActivateAnalyticsFrameComponent);
exports.CanActivateAnalyticsFrameComponent = CanActivateAnalyticsFrameComponent;
//# sourceMappingURL=analytics-frame.component.js.map