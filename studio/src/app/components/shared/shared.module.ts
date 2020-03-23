import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule, Title } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HotkeyModule } from "angular2-hotkeys";
import { ClipboardModule } from "ngx-clipboard";
import { AppHeaderBarComponent } from "./app-header-bar/app-header-bar.component";
import { BusinessPickerComponent } from "./business-picker/business-picker.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ChatServerManagerComponent } from "./chat-server-manager/chat-server-manager.component";
import { CreateChatbotComponent } from "./create-chatbot/create-chatbot.component";
import { CreateUserComponent } from "./create-user/create-user.component";
import { EditBusinessAccountComponent } from "./edit-business-account/edit-business-account.component";
import { InfoDialogComponent } from "./info-dialog/info-dialog.component";
import { LoadingIndicatorComponent } from "./loading-indicator/loading-indicator.component";
import { LoadingMaskComponent } from "./loading-mask/loading-mask.component";
import { LoginComponent } from "./login/login.component";
import { PublishChatbotComponent } from "./publish-chatbot/publish-chatbot.component";
import { PublishDialogComponent } from "./publish-dialog/publish-dialog.component";
import { UpdatePasswordComponent } from "./update-password/update-password.component";
import { AutofocusDirective } from "../../directives/autofocus.directive";
import { EllipsisPipe } from "../../pipes/ellipsis.pipe";
import { AnalyticsWindowService } from "../../services/analytics-window.service";
import { ChatFlowService } from "../../services/chatflow.service";
import { DataService } from "../../services/data.service";
import { GlobalsService } from "../../services/globals.service";
import { InfoDialogService } from "../../services/info-dialog.service";
import { LoginService } from "../../services/login.service";
import { SettingsService } from "../../services/settings.service";
import { SimulatorService } from "../../services/simulator.service";
import { CloudSignupComponent } from "./cloud-signup/cloud-signup.component";
import { GetChatServerComponent } from "./get-chat-server/get-chat-server.component";
import { DropdownComponent } from "./dropdown/dropdown.component";
import {
  DropdownStaticOptionComponent,
  DropdownStaticOptionsComponent
} from "./dropdown/dropdown-static-options.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { ToolbarLogoComponent } from "./toolbar/toolbar-logo/toolbar-logo.component";

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    ChatServerManagerComponent,
    InfoDialogComponent,
    LoadingIndicatorComponent,
    LoginComponent,
    PublishDialogComponent,
    EditBusinessAccountComponent,
    AppHeaderBarComponent,
    CreateUserComponent,
    UpdatePasswordComponent,
    ChangePasswordComponent,
    LoadingMaskComponent,
    GetChatServerComponent,
    CreateChatbotComponent,
    PublishChatbotComponent,
    BusinessPickerComponent,
    CloudSignupComponent,
    DropdownComponent,
    DropdownStaticOptionComponent,
    DropdownStaticOptionsComponent,
    ToolbarComponent,
    ToolbarLogoComponent,
    AutofocusDirective,
    EllipsisPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HotkeyModule,
    ClipboardModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatRadioModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HotkeyModule,
    ClipboardModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatRadioModule,
    ChatServerManagerComponent,
    InfoDialogComponent,
    LoadingIndicatorComponent,
    LoginComponent,
    PublishDialogComponent,
    EditBusinessAccountComponent,
    AppHeaderBarComponent,
    CreateUserComponent,
    UpdatePasswordComponent,
    ChangePasswordComponent,
    LoadingMaskComponent,
    GetChatServerComponent,
    CreateChatbotComponent,
    PublishChatbotComponent,
    BusinessPickerComponent,
    CloudSignupComponent,
    DropdownComponent,
    DropdownStaticOptionComponent,
    DropdownStaticOptionsComponent,
    ToolbarComponent,
    ToolbarLogoComponent,
    AutofocusDirective,
    EllipsisPipe,
    TranslateModule
  ],
  providers: [
    ChatFlowService,
    GlobalsService,
    SettingsService,
    InfoDialogService,
    Title,
    SimulatorService,
    DataService,
    LoginService,
    AnalyticsWindowService
  ],
  entryComponents: [
    InfoDialogComponent,
    PublishDialogComponent,
    LoginComponent,
    ChatServerManagerComponent,
    EditBusinessAccountComponent,
    CreateUserComponent,
    UpdatePasswordComponent,
    ChangePasswordComponent,
    LoadingMaskComponent,
    GetChatServerComponent,
    CreateChatbotComponent,
    PublishChatbotComponent,
    BusinessPickerComponent,
    CloudSignupComponent
  ]
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
