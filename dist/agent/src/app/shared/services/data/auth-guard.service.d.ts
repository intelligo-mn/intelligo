import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ConfigService } from "../config/config.service";
import "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";
import { CanActivateChild } from "@angular/router/src/interfaces";
export declare class AuthGuardService implements CanActivateChild {
    private config;
    private router;
    constructor(config: ConfigService, router: Router);
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;
}
