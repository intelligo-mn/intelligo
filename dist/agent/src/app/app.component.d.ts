import { OnInit, ViewContainerRef } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { GlobalState } from "./app.state";
import { ConfigService } from "./shared/services/config/config.service";
import { SpinnerService } from "./shared/services/spinner/spinner.service";
import { ThemesService } from "./shared/services/themes/themes.service";
export declare class AppComponent implements OnInit {
    private _state;
    config: ConfigService;
    private viewContainerRef;
    private _spinner;
    private titleService;
    private themesService;
    readonly isApp_SidebarLeftCollapsed: any;
    readonly isApp_MobileSidebarLeftOpen: any;
    readonly isApp_SidebarRightOpen: any;
    constructor(_state: GlobalState, config: ConfigService, viewContainerRef: ViewContainerRef, _spinner: SpinnerService, titleService: Title, themesService: ThemesService);
    setTitle(newTitle: string): void;
    ngOnInit(): void;
    onWindowResize(): void;
    private _shouldMenuReset;
    ngAfterViewInit(): void;
}
