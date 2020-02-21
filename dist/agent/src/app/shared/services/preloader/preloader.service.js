"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PreloaderService_1;
const core_1 = require("@angular/core");
let PreloaderService = PreloaderService_1 = class PreloaderService {
    static registerLoader(method) {
        PreloaderService_1._loaders.push(method);
    }
    static clear() {
        PreloaderService_1._loaders = [];
    }
    static load() {
        return new Promise((resolve, reject) => {
            PreloaderService_1._executeAll(resolve);
        });
    }
    static _executeAll(done) {
        setTimeout(() => {
            Promise.all(PreloaderService_1._loaders).then((values) => {
                done.call(null, values);
            }).catch((error) => {
                console.error(error);
            });
        });
    }
};
PreloaderService._loaders = [];
PreloaderService = PreloaderService_1 = __decorate([
    core_1.Injectable()
], PreloaderService);
exports.PreloaderService = PreloaderService;
//# sourceMappingURL=preloader.service.js.map