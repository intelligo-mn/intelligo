import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { TranslateService } from '@ngx-translate/core';
export declare class NavbarComponent implements OnInit {
    translate: TranslateService;
    location: Location;
    private router;
    isCollapsed: boolean;
    private lastPoppedUrl;
    private yScrollStack;
    constructor(translate: TranslateService, location: Location, router: Router);
    ngOnInit(): void;
    isHome(): boolean;
    isDocumentation(): boolean;
}
