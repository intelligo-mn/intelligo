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
const data_service_1 = require("./data.service");
const material_1 = require("@angular/material");
const login_component_1 = require("../components/shared/login/login.component");
const router_1 = require("@angular/router");
let LoginService = class LoginService {
    constructor(dataService, dialog, router) {
        this.dataService = dataService;
        this.dialog = dialog;
        this.router = router;
    }
    performLogin(skipAuth, fallbackUrl = "/", hardCheck = false, next) {
        this.dataService.userLoggedinCheck((loggedin) => {
            if (!loggedin && skipAuth == false) {
                let d = this.dialog.open(login_component_1.LoginComponent, {
                    width: '600px',
                });
                d.afterClosed().subscribe(x => {
                    if (x == true) {
                        if (next)
                            next(true);
                        return;
                    }
                    if (fallbackUrl)
                        this.router.navigateByUrl(fallbackUrl);
                    if (next)
                        next(true);
                });
            }
            else {
                if (next)
                    next(loggedin);
            }
        }, hardCheck);
    }
};
LoginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [data_service_1.DataService,
        material_1.MatDialog,
        router_1.Router])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map