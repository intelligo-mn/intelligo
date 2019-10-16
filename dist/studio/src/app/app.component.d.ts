import { Router } from '@angular/router';
import { GlobalsService } from './services/globals.service';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
export declare class AppComponent {
    translate: TranslateService;
    global: GlobalsService;
    router: Router;
    dialog: MatDialog;
    constructor(translate: TranslateService, global: GlobalsService, router: Router, dialog: MatDialog);
    loading(): boolean;
    hideLoading(): void;
    goto(path: string): void;
}
