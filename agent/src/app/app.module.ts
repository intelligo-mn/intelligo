import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { BrowserModule, Title } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { AppState, InternalStateType } from "./app.service";
import { GlobalState } from "./app.state";
import { ServicesModule } from "./shared/services/services.module";
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app.routing";
import { LocalStorageTodoService } from "./shared/services/localstorage/localstorage-todo.service";
import {
	HammerGestureConfig,
	HAMMER_GESTURE_CONFIG
} from "@angular/platform-browser";
//import {HashLocationStrategy, LocationStrategy} from "@angular/common";
//import { InMemoryWebApiModule } from "angular-in-memory-web-api";
//import { MaterialLabDbService } from "./shared/data/MaterialLabDb.service";
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
		ReactiveFormsModule,
		BrowserAnimationsModule,
		ServicesModule,
		SharedModule.forRoot(),
		AppRoutingModule,
	],
	providers: [APP_PROVIDERS],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(public appState: AppState) { }
}
