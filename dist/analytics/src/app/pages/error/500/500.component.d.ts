import { OnInit } from '@angular/core';
import { GlobalState } from '../../../app.state';
import { ConfigService } from '../../../shared/services/config/config.service';
export declare class Error500Component implements OnInit {
    config: ConfigService;
    private _state;
    constructor(config: ConfigService, _state: GlobalState);
    ngOnInit(): void;
}
