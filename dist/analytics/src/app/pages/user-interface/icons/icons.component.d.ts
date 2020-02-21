import { OnInit, ElementRef, Renderer } from "@angular/core";
import { GlobalState } from "../../../app.state";
import { ConfigService } from "../../../shared/services/config/config.service";
import { MatSidenav } from "@angular/material";
export declare class IconsComponent implements OnInit {
    private renderer;
    config: ConfigService;
    private _elementRef;
    private _state;
    t: any;
    leftSidenav1: MatSidenav;
    private allMElementRef;
    navMode: string;
    isActiveTab: boolean;
    vertical: any;
    selectTab(activeId: any, event: any): void;
    tabLabels: {
        activeId: string;
        label: string;
    }[];
    mdIcons: string[];
    constructor(renderer: Renderer, config: ConfigService, _elementRef: ElementRef, _state: GlobalState);
    ngAfterViewInit(): void;
    ngOnInit(): void;
    onResize(event: any): void;
}
