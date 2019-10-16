import { OnInit, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { GlobalsService } from '../../../services/globals.service';
import { ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { AppHeaderBarComponent } from '../../shared/app-header-bar/app-header-bar.component';
import { InfoDialogService } from '../../../services/info-dialog.service';
export declare class AnalyticsFrameComponent implements OnInit {
    private sanitizer;
    private globals;
    private router;
    private infoDialog;
    private route;
    ngAfterViewInit(): void;
    appHeader: AppHeaderBarComponent;
    analyticsFrame: ElementRef;
    iframeUrl: string | SafeUrl;
    constructor(sanitizer: DomSanitizer, globals: GlobalsService, router: Router, infoDialog: InfoDialogService, route: ActivatedRoute);
    ngOnInit(): void;
}
export declare class CanActivateAnalyticsFrameComponent implements CanActivate {
    private dataService;
    constructor(dataService: DataService);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;
}
