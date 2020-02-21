import { NgModule, Optional, SkipSelf } from "@angular/core";

import { ConfigService } from "./config/config.service";
import { PreloaderService } from "./preloader/preloader.service";
import { SpinnerService } from "./spinner/spinner.service";
import { DataService } from "./data/data.service";
import { AuthGuardService } from "./data/auth-guard.service";
import { ThemesService } from './themes/themes.service';
import { InfoDialogService } from './helpers/info-dialog.service';
@NgModule({
	imports: [],
	providers: [ConfigService, ThemesService, PreloaderService, SpinnerService, DataService, AuthGuardService, InfoDialogService],
	declarations: [],
	exports: []
})
export class ServicesModule {
	constructor(
		@Optional()
		@SkipSelf()
		parentModule: ServicesModule
	) { }
}
