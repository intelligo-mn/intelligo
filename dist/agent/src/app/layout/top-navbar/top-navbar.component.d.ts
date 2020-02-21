import { OnInit, ElementRef } from "@angular/core";
import { GlobalState } from "../../app.state";
import { ConfigService } from "../../shared/services/config/config.service";
import { ThemesService } from '../../shared/services/themes/themes.service';
export declare class TopNavbarComponent implements OnInit {
    config: ConfigService;
    private _elementRef;
    private _state;
    themes: ThemesService;
    currentTheme: any;
    constructor(config: ConfigService, _elementRef: ElementRef, _state: GlobalState, themes: ThemesService);
    ngOnInit(): void;
    setTheme(): void;
    toggleProfile(): boolean;
    toggleMenuSideabar(): boolean;
    toggleAppMobileLeftMenuSidebar(): boolean;
    toggleAppRightSidebar(): boolean;
}
