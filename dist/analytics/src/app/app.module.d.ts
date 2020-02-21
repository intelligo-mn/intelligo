import { AppState, InternalStateType } from "./app.service";
import { HammerGestureConfig } from "@angular/platform-browser";
export declare class HammerConfig extends HammerGestureConfig {
    overrides: any;
}
export declare type StoreType = {
    state: InternalStateType;
    restoreInputValues: () => void;
    disposeOldHosts: () => void;
};
export declare class AppModule {
    appState: AppState;
    constructor(appState: AppState);
}
