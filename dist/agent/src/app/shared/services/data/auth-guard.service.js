"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const config_service_1 = require("../config/config.service");
require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/catch");
let AuthGuardService = class AuthGuardService {
    constructor(config, router) {
        this.config = config;
        this.router = router;
    }
    canActivateChild(childRoute, state) {
        if (this.config && this.config.profile && this.config.profile.accessToken) {
            return true;
        }
        this.router.navigateByUrl('/');
        return false;
    }
};
AuthGuardService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService, router_1.Router])
], AuthGuardService);
exports.AuthGuardService = AuthGuardService;
//# sourceMappingURL=auth-guard.service.js.map