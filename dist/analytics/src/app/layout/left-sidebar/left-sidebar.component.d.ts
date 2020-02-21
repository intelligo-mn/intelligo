import { OnInit, ElementRef } from "@angular/core";
import { GlobalState } from "../../app.state";
import { ConfigService } from "../../shared/services/config/config.service";
import { DataService } from "../../shared/services/data/data.service";
export declare class LeftSidebarComponent implements OnInit {
    config: ConfigService;
    private _elementRef;
    private _state;
    private _data;
    checkApi: boolean;
    goalData: {};
    scrollbarOptions: {
        axis: string;
        theme: string;
        scrollInertia: number;
        mouseWheel: {
            preventDefault: boolean;
        };
    };
    constructor(config: ConfigService, _elementRef: ElementRef, _state: GlobalState, _data: DataService);
    ngOnInit(): void;
    toggleMenuSideabar(): boolean;
    onWindowResize(): void;
}
