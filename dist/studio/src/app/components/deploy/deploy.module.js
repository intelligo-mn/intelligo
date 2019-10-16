"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../shared.module");
const deploy_landing_component_1 = require("./landing/deploy-landing/deploy-landing.component");
exports.DEPLOY_ROUTES = [
    {
        path: "",
        component: deploy_landing_component_1.DeployLandingComponent
    }
];
let DeployModule = class DeployModule {
};
DeployModule = __decorate([
    core_1.NgModule({
        declarations: [
            deploy_landing_component_1.DeployLandingComponent
        ],
        entryComponents: [],
        imports: [
            shared_module_1.SharedModule
        ],
        schemas: [],
    })
], DeployModule);
exports.DeployModule = DeployModule;
//# sourceMappingURL=deploy.module.js.map