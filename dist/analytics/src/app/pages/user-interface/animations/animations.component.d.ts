import { OnInit, ElementRef } from '@angular/core';
import { GlobalState } from '../../../app.state';
import { ConfigService } from '../../../shared/services/config/config.service';
export declare class AnimationsComponent implements OnInit {
    config: ConfigService;
    private _elementRef;
    private _state;
    constructor(config: ConfigService, _elementRef: ElementRef, _state: GlobalState);
    ngOnInit(): void;
}
