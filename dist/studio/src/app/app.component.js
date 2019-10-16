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
const globals_service_1 = require("./services/globals.service");
const material_1 = require("@angular/material");
const core_2 = require("@ngx-translate/core");
let AppComponent = class AppComponent {
    constructor(translate, global, router, dialog) {
        this.translate = translate;
        this.global = global;
        this.router = router;
        this.dialog = dialog;
        translate.addLangs(['mn', 'en']);
        translate.setDefaultLang('mn');
        translate.use('mn');
    }
    loading() {
        return this.global.loading;
    }
    hideLoading() {
        this.global.loading = false;
    }
    goto(path) {
        this.router.navigateByUrl(path);
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss'],
    }),
    __metadata("design:paramtypes", [core_2.TranslateService,
        globals_service_1.GlobalsService,
        router_1.Router,
        material_1.MatDialog])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map