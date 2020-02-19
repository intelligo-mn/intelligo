import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { BrowserModule, Title } from "@angular/platform-browser";
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { AppState, InternalStateType } from "./app.service";
import { GlobalState } from "./app.state";
import { ServicesModule } from "./shared/services/services.module";
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app.routing";
import {BaseModule} from "./BaseComponent/base.module"
import { LocalStorageTodoService } from "./shared/services/localstorage/localstorage-todo.service";
import {
	HammerGestureConfig,
	HAMMER_GESTURE_CONFIG
} from "@angular/platform-browser";
//import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { MaterialLabDbService } from "./shared/data/MaterialLabDb.service";
import { BaseComponent } from "./BaseComponent/base.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
//import {ContactsService} from './pages/contacts/contacts.service';
export class HammerConfig extends HammerGestureConfig {
	overrides = <any>{
		swipe: { velocity: 0.4, threshold: 20 }
	};
}
// Application wide providers
const APP_PROVIDERS = [
	AppState,
	GlobalState,
	Title,
	LocalStorageTodoService,
	//ContactsService,
	{ provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig },
	{ provide: LocationStrategy, useClass: HashLocationStrategy }
];

export type StoreType = {
	state: InternalStateType;
	restoreInputValues: () => void;
	disposeOldHosts: () => void;
};

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		BaseModule,
		ReactiveFormsModule,
		NoopAnimationsModule,
		ServicesModule,
		SharedModule.forRoot(),
		AppRoutingModule
	],
	providers: [APP_PROVIDERS],
	bootstrap: [AppComponent],
	schemas:[NO_ERRORS_SCHEMA]
})
export class AppModule {
	constructor(public appState: AppState) { }
}
