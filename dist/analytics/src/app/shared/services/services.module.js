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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const config_service_1 = require("./config/config.service");
const preloader_service_1 = require("./preloader/preloader.service");
const spinner_service_1 = require("./spinner/spinner.service");
const data_service_1 = require("./data/data.service");
const themes_service_1 = require("./themes/themes.service");
let ServicesModule = class ServicesModule {
    constructor(parentModule) { }
};
ServicesModule = __decorate([
    core_1.NgModule({
        imports: [],
        providers: [config_service_1.ConfigService, themes_service_1.ThemesService, preloader_service_1.PreloaderService, spinner_service_1.SpinnerService, data_service_1.DataService],
        declarations: [],
        exports: []
    }),
    __param(0, core_1.Optional()),
    __param(0, core_1.SkipSelf()),
    __metadata("design:paramtypes", [ServicesModule])
], ServicesModule);
exports.ServicesModule = ServicesModule;
//# sourceMappingURL=services.module.js.map