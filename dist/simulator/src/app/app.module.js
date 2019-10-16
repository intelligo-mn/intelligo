"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_1 = require("@angular/platform-browser");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const animations_1 = require("@angular/platform-browser/animations");
const material_1 = require("@angular/material");
const core_2 = require("@agm/core");
const ngx_image_viewer_1 = require("ngx-image-viewer");
const app_component_1 = require("./app.component");
const chat_thread_component_1 = require("./components/chat-thread/chat-thread.component");
const stomp_service_1 = require("./services/stomp.service");
const api_service_1 = require("./services/api.service");
const utilities_service_1 = require("./services/utilities.service");
const simulator_service_1 = require("./services/simulator.service");
const complex_input_component_1 = require("./components/complex-input/complex-input.component");
const google_maps_config_model_1 = require("./models/google-maps-config.model");
const mat_css_service_1 = require("./services/mat-css.service");
const chain_delay_service_1 = require("./services/chain-delay.service");
const info_dialog_component_1 = require("./components/info-dialog/info-dialog.component");
const info_dialog_service_1 = require("./services/info-dialog.service");
const http_1 = require("@angular/common/http");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            chat_thread_component_1.ChatThreadComponent,
            complex_input_component_1.ComplexInputComponent,
            info_dialog_component_1.InfoDialogComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            animations_1.BrowserAnimationsModule,
            material_1.MatDialogModule,
            material_1.MatDatepickerModule,
            material_1.MatFormFieldModule,
            material_1.MatNativeDateModule,
            material_1.MatInputModule,
            material_1.MatButtonModule,
            material_1.MatListModule,
            material_1.MatCheckboxModule,
            material_1.MatCardModule,
            material_1.MatRadioModule,
            material_1.MatProgressBarModule,
            router_1.RouterModule.forRoot([
                { path: '', component: chat_thread_component_1.ChatThreadComponent },
                { path: '**', redirectTo: '' }
            ]),
            http_1.HttpClientModule,
            core_2.AgmCoreModule.forRoot(),
            ngx_image_viewer_1.ImageViewerModule.forRoot({
                btnClass: 'hidden',
                zoomFactor: 0.1,
                containerBackgroundColor: 'rgba(0,0,0,0)',
                wheelZoom: true,
                allowFullscreen: true,
                btnIcons: {
                    zoomIn: 'hidden',
                    zoomOut: 'hidden',
                    rotateClockwise: 'hidden',
                    rotateCounterClockwise: 'hidden',
                    next: 'hidden',
                    prev: 'hidden',
                    fullscreen: 'hidden',
                }
            }),
        ],
        providers: [
            stomp_service_1.StompService,
            utilities_service_1.UtilitiesService,
            api_service_1.APIService,
            mat_css_service_1.MatCSSService,
            chain_delay_service_1.ChainDelayService,
            simulator_service_1.SimulatorService,
            info_dialog_service_1.InfoDialogService,
            { provide: core_2.LAZY_MAPS_API_CONFIG, useClass: google_maps_config_model_1.GoogleMapsConfig }
        ],
        bootstrap: [app_component_1.AppComponent],
        entryComponents: [
            complex_input_component_1.ComplexInputComponent,
            info_dialog_component_1.InfoDialogComponent
        ],
        schemas: [core_1.NO_ERRORS_SCHEMA]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map