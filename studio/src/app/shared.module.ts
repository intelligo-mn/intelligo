import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSnackBarModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HotkeyModule } from 'angular2-hotkeys';
import { ClipboardModule } from 'ngx-clipboard';
import { AnaCloudSignupComponent } from './components/shared/ana-cloud-signup/ana-cloud-signup.component';
import { AppHeaderBarComponent } from './components/shared/app-header-bar/app-header-bar.component';
import { BusinessPickerComponent } from './components/shared/business-picker/business-picker.component';
import { ChangePasswordComponent } from './components/shared/change-password/change-password.component';
import { ChatServerManagerComponent } from './components/shared/chat-server-manager/chat-server-manager.component';
import { CreateChatbotComponent } from './components/shared/create-chatbot/create-chatbot.component';
import { CreateUserComponent } from './components/shared/create-user/create-user.component';
import { EditBusinessAccountComponent } from './components/shared/edit-business-account/edit-business-account.component';
import { GetAnaChatServerComponent } from './components/shared/get-ana-chat-server/get-ana-chat-server.component';
import { InfoDialogComponent } from './components/shared/info-dialog/info-dialog.component';
import { LoadingIndicatorComponent } from './components/shared/loading-indicator/loading-indicator.component';
import { LoadingMaskComponent } from './components/shared/loading-mask/loading-mask.component';
import { LoginComponent } from './components/shared/login/login.component';
import { PublishChatbotComponent } from './components/shared/publish-chatbot/publish-chatbot.component';
import { PublishDialogComponent } from './components/shared/publish-dialog/publish-dialog.component';
import { UpdatePasswordComponent } from './components/shared/update-password/update-password.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { AnalyticsWindowService } from './services/analytics-window.service';
import { ChatFlowService } from './services/chatflow.service';
import { DataService } from './services/data.service';
import { GlobalsService } from './services/globals.service';
import { InfoDialogService } from './services/info-dialog.service';
import { LoginService } from './services/login.service';
import { SettingsService } from './services/settings.service';
import { SimulatorService } from './services/simulator.service';

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
		GetAnaChatServerComponent,
		CreateChatbotComponent,
		PublishChatbotComponent,
		BusinessPickerComponent,
		AnaCloudSignupComponent,
		AutofocusDirective,
		EllipsisPipe],
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
		GetAnaChatServerComponent,
		CreateChatbotComponent,
		PublishChatbotComponent,
		BusinessPickerComponent,
		AnaCloudSignupComponent,
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
		GetAnaChatServerComponent,
		CreateChatbotComponent,
		PublishChatbotComponent,
		BusinessPickerComponent,
		AnaCloudSignupComponent
	],
	// schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }