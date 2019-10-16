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
const router_1 = require("@angular/router");
const api_service_1 = require("./services/api.service");
const mat_css_service_1 = require("./services/mat-css.service");
const simulator_service_1 = require("./services/simulator.service");
const stomp_service_1 = require("./services/stomp.service");
const utilities_service_1 = require("./services/utilities.service");
let AppComponent = class AppComponent {
    constructor(route, apiService, stomp, simulator, utils, matCSS) {
        this.route = route;
        this.apiService = apiService;
        this.stomp = stomp;
        this.simulator = simulator;
        this.utils = utils;
        this.matCSS = matCSS;
        this.route.queryParams.subscribe(params => {
            if (params['s']) {
                let settings = JSON.parse(atob(params['s']));
                if (settings.stompConfig && settings.stompConfig.debug)
                    console.log(settings);
                this.setAppSettings(settings);
            }
        });
    }
    setAppSettings(settings) {
        utilities_service_1.UtilitiesService.settings = settings;
        if (settings.brandingConfig) {
            this.getCustomStyle(settings.brandingConfig.primaryBackgroundColor, settings.brandingConfig.secondaryBackgroundColor, settings.brandingConfig.primaryForegroundColor, settings.brandingConfig.frameContentWidth);
        }
        if (settings.thirdPartyConfig && utilities_service_1.UtilitiesService.googleMapsConfigRef)
            utilities_service_1.UtilitiesService.googleMapsConfigRef.apiKey = settings.thirdPartyConfig.googleMapsKey;
        if (settings.appConfig) {
            this.apiService.fileUploadEndpoint = settings.appConfig.fileUploadEndpoint;
            this.apiService.setAPIEndpoint(settings.appConfig.apiEndpoint);
        }
        if (settings.stompConfig)
            this.stomp.configure(settings.stompConfig);
    }
    getCustomStyle(accent = undefined, secondary = undefined, accentFG = undefined, contentWidth = undefined) {
        const ANA_CUSTOM_STYLE = 'ana-custom-style';
        let customStyle = document.getElementById(ANA_CUSTOM_STYLE);
        if (!customStyle) {
            customStyle = document.createElement('style');
            customStyle.id = ANA_CUSTOM_STYLE;
            document.head.appendChild(customStyle);
        }
        let appCSS = `/*Dynamic styles*/
.chat-message-item.incoming {
  border-left-color: ${accent || '#8cc83c'};
}

.incoming > .chat-stub {
  border-top-color: ${accent || '#8cc83c'};
}

.carousel-item-button:first-child,
.chat-input button.btn-icon {
  color: ${accent || '#8cc83c'};
}

.chat-input button.btn-click {
  background-color: ${accent || '#8cc83c'};
  color: ${accentFG || 'white'};
}

.ana-sent-tick path{
	fill: ${accent || '#8cc83c'};
}
.ana-sent-tick{
  color: ${accent || '#8cc83c'};
}

.ana-delivered-tick path{
	fill: ${accent || '#8cc83c'};
}
.ana-delivered-tick{
  color: ${accent || '#8cc83c'};
}

.chat-message-item.outgoing {
  border-right-color: ${secondary || 'black'};
}

.outgoing > .chat-stub {
  border-top-color: ${secondary || 'black'};
}

.complex-input-btn-done {
  color: ${accentFG || 'white'} !important;
}

.content {
  width: 100vw;
}

.ana-title {
  background-color: ${accent || '#8cc83c'};
  color: ${accentFG || 'white'};
}
.chat-text-input{
	caret-color: ${accent || '#8cc83c'};
}
path.send-button{
  fill: ${accent || '#8cc83c'};
}
.ana-logo > img {
  background-color: ${accentFG || 'white'};
  border: 2px solid ${accentFG || 'white'};
}

.ana-min .ana-minmax-btn {
  border: 2px solid ${accentFG || 'white'};
}

.ana-minmax-btn {
  background-color: ${accentFG || 'white'};
}

.typing-indicator span{
  background-color: ${accent || '#8cc83c'};
}

.ana-actions {
  margin-right: ${utilities_service_1.UtilitiesService.settings.appConfig.fullpage ? "-5px" : "15px"};
}
`;
        this.matCSS.loadCustomMatTheme(accent, customStyle, appCSS);
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        api_service_1.APIService,
        stomp_service_1.StompService,
        simulator_service_1.SimulatorService,
        utilities_service_1.UtilitiesService,
        mat_css_service_1.MatCSSService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map