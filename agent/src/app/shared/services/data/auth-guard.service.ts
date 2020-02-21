import { Http, Headers, Response, Jsonp, RequestOptions } from "@angular/http";
import { HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ConfigService, UserProfile } from "../config/config.service"
import "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";
import { CanActivateChild } from "@angular/router/src/interfaces";

@Injectable()
export class AuthGuardService implements CanActivateChild {
    constructor(private config: ConfigService, private router: Router) {
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.config && this.config.profile && this.config.profile.accessToken) {
            return true;
        }
        this.router.navigateByUrl('/');
        return false;
    }
} 