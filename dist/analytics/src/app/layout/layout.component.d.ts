import { ElementRef, OnInit } from '@angular/core';
import { GlobalState } from '../app.state';
import { ConfigService } from '../shared/services/config/config.service';
export declare class LayoutComponent implements OnInit {
    config: ConfigService;
    private _elementRef;
    private _state;
    constructor(config: ConfigService, _elementRef: ElementRef, _state: GlobalState);
    ngOnInit(): void;
    toggleMenuSideabar(): boolean;
}
