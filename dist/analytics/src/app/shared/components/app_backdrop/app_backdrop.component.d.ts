import { OnInit } from '@angular/core';
import { GlobalState } from '../../../app.state';
import { ConfigService } from '../../services/config/config.service';
export declare class AppBackdropComponent implements OnInit {
    config: ConfigService;
    private _state;
    isApp_BackdropVisible: boolean;
    constructor(config: ConfigService, _state: GlobalState);
    ngOnInit(): void;
    appBackdropClose(): void;
}
