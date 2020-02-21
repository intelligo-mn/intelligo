import { OnInit, ElementRef } from "@angular/core";
import { GlobalState } from "../../app.state";
import { ConfigService } from "../../shared/services/config/config.service";
export declare class LeftSidebarComponent implements OnInit {
    config: ConfigService;
    private _elementRef;
    private _state;
    scrollbarOptions: {
        axis: string;
        theme: string;
        scrollInertia: number;
        mouseWheel: {
            preventDefault: boolean;
        };
    };
    constructor(config: ConfigService, _elementRef: ElementRef, _state: GlobalState);
    ngOnInit(): void;
    onWindowResize(): void;
}
