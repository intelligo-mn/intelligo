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
const material_1 = require("@angular/material");
const platform_browser_1 = require("@angular/platform-browser");
const animations_1 = require("@angular/platform-browser/animations");
const core_2 = require("@ngx-translate/core");
const http_loader_1 = require("@ngx-translate/http-loader");
const angular2_hotkeys_1 = require("angular2-hotkeys");
const ngx_clipboard_1 = require("ngx-clipboard");
const ana_cloud_signup_component_1 = require("./components/shared/ana-cloud-signup/ana-cloud-signup.component");
const app_header_bar_component_1 = require("./components/shared/app-header-bar/app-header-bar.component");
const business_picker_component_1 = require("./components/shared/business-picker/business-picker.component");
const change_password_component_1 = require("./components/shared/change-password/change-password.component");
const chat_server_manager_component_1 = require("./components/shared/chat-server-manager/chat-server-manager.component");
const create_chatbot_component_1 = require("./components/shared/create-chatbot/create-chatbot.component");
const create_user_component_1 = require("./components/shared/create-user/create-user.component");
const edit_business_account_component_1 = require("./components/shared/edit-business-account/edit-business-account.component");
const get_ana_chat_server_component_1 = require("./components/shared/get-ana-chat-server/get-ana-chat-server.component");
const info_dialog_component_1 = require("./components/shared/info-dialog/info-dialog.component");
const loading_indicator_component_1 = require("./components/shared/loading-indicator/loading-indicator.component");
const loading_mask_component_1 = require("./components/shared/loading-mask/loading-mask.component");
const login_component_1 = require("./components/shared/login/login.component");
const publish_chatbot_component_1 = require("./components/shared/publish-chatbot/publish-chatbot.component");
const publish_dialog_component_1 = require("./components/shared/publish-dialog/publish-dialog.component");
const update_password_component_1 = require("./components/shared/update-password/update-password.component");
const autofocus_directive_1 = require("./directives/autofocus.directive");
const ellipsis_pipe_1 = require("./pipes/ellipsis.pipe");
const analytics_window_service_1 = require("./services/analytics-window.service");
const chatflow_service_1 = require("./services/chatflow.service");
const data_service_1 = require("./services/data.service");
const globals_service_1 = require("./services/globals.service");
const info_dialog_service_1 = require("./services/info-dialog.service");
const login_service_1 = require("./services/login.service");
const settings_service_1 = require("./services/settings.service");
const simulator_service_1 = require("./services/simulator.service");
function HttpLoaderFactory(httpClient) {
    return new http_loader_1.TranslateHttpLoader(httpClient);
}
exports.HttpLoaderFactory = HttpLoaderFactory;
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    core_1.NgModule({
        declarations: [
            chat_server_manager_component_1.ChatServerManagerComponent,
            info_dialog_component_1.InfoDialogComponent,
            loading_indicator_component_1.LoadingIndicatorComponent,
            login_component_1.LoginComponent,
            publish_dialog_component_1.PublishDialogComponent,
            edit_business_account_component_1.EditBusinessAccountComponent,
            app_header_bar_component_1.AppHeaderBarComponent,
            create_user_component_1.CreateUserComponent,
            update_password_component_1.UpdatePasswordComponent,
            change_password_component_1.ChangePasswordComponent,
            loading_mask_component_1.LoadingMaskComponent,
            get_ana_chat_server_component_1.GetAnaChatServerComponent,
            create_chatbot_component_1.CreateChatbotComponent,
            publish_chatbot_component_1.PublishChatbotComponent,
            business_picker_component_1.BusinessPickerComponent,
            ana_cloud_signup_component_1.AnaCloudSignupComponent,
            autofocus_directive_1.AutofocusDirective,
            ellipsis_pipe_1.EllipsisPipe
        ],
        imports: [
            platform_browser_1.BrowserModule,
            animations_1.BrowserAnimationsModule,
            common_1.CommonModule,
            http_1.HttpClientModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            angular2_hotkeys_1.HotkeyModule,
            ngx_clipboard_1.ClipboardModule,
            material_1.MatButtonModule,
            material_1.MatMenuModule,
            material_1.MatSidenavModule,
            material_1.MatInputModule,
            material_1.MatDialogModule,
            material_1.MatSelectModule,
            material_1.MatCheckboxModule,
            material_1.MatTabsModule,
            material_1.MatIconModule,
            material_1.MatTooltipModule,
            material_1.MatExpansionModule,
            material_1.MatProgressSpinnerModule,
            material_1.MatProgressBarModule,
            material_1.MatSnackBarModule,
            material_1.MatCardModule,
            material_1.MatListModule,
            material_1.MatToolbarModule,
            material_1.MatGridListModule,
            material_1.MatAutocompleteModule,
            material_1.MatChipsModule,
            material_1.MatSlideToggleModule,
            material_1.MatRadioModule,
            core_2.TranslateModule.forRoot({
                loader: {
                    provide: core_2.TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [http_1.HttpClient]
                }
            })
        ],
        exports: [
            platform_browser_1.BrowserModule,
            animations_1.BrowserAnimationsModule,
            common_1.CommonModule,
            http_1.HttpClientModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            angular2_hotkeys_1.HotkeyModule,
            ngx_clipboard_1.ClipboardModule,
            material_1.MatButtonModule,
            material_1.MatMenuModule,
            material_1.MatSidenavModule,
            material_1.MatInputModule,
            material_1.MatDialogModule,
            material_1.MatSelectModule,
            material_1.MatCheckboxModule,
            material_1.MatTabsModule,
            material_1.MatIconModule,
            material_1.MatTooltipModule,
            material_1.MatExpansionModule,
            material_1.MatProgressSpinnerModule,
            material_1.MatProgressBarModule,
            material_1.MatSnackBarModule,
            material_1.MatCardModule,
            material_1.MatListModule,
            material_1.MatToolbarModule,
            material_1.MatGridListModule,
            material_1.MatAutocompleteModule,
            material_1.MatChipsModule,
            material_1.MatSlideToggleModule,
            material_1.MatRadioModule,
            chat_server_manager_component_1.ChatServerManagerComponent,
            info_dialog_component_1.InfoDialogComponent,
            loading_indicator_component_1.LoadingIndicatorComponent,
            login_component_1.LoginComponent,
            publish_dialog_component_1.PublishDialogComponent,
            edit_business_account_component_1.EditBusinessAccountComponent,
            app_header_bar_component_1.AppHeaderBarComponent,
            create_user_component_1.CreateUserComponent,
            update_password_component_1.UpdatePasswordComponent,
            change_password_component_1.ChangePasswordComponent,
            loading_mask_component_1.LoadingMaskComponent,
            get_ana_chat_server_component_1.GetAnaChatServerComponent,
            create_chatbot_component_1.CreateChatbotComponent,
            publish_chatbot_component_1.PublishChatbotComponent,
            business_picker_component_1.BusinessPickerComponent,
            ana_cloud_signup_component_1.AnaCloudSignupComponent,
            autofocus_directive_1.AutofocusDirective,
            ellipsis_pipe_1.EllipsisPipe,
            core_2.TranslateModule
        ],
        providers: [
            chatflow_service_1.ChatFlowService,
            globals_service_1.GlobalsService,
            settings_service_1.SettingsService,
            info_dialog_service_1.InfoDialogService,
            platform_browser_1.Title,
            simulator_service_1.SimulatorService,
            data_service_1.DataService,
            login_service_1.LoginService,
            analytics_window_service_1.AnalyticsWindowService
        ],
        entryComponents: [
            info_dialog_component_1.InfoDialogComponent,
            publish_dialog_component_1.PublishDialogComponent,
            login_component_1.LoginComponent,
            chat_server_manager_component_1.ChatServerManagerComponent,
            edit_business_account_component_1.EditBusinessAccountComponent,
            create_user_component_1.CreateUserComponent,
            update_password_component_1.UpdatePasswordComponent,
            change_password_component_1.ChangePasswordComponent,
            loading_mask_component_1.LoadingMaskComponent,
            get_ana_chat_server_component_1.GetAnaChatServerComponent,
            create_chatbot_component_1.CreateChatbotComponent,
            publish_chatbot_component_1.PublishChatbotComponent,
            business_picker_component_1.BusinessPickerComponent,
            ana_cloud_signup_component_1.AnaCloudSignupComponent
        ],
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map