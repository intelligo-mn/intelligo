"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const _500_component_1 = require("./500.component");
const shared_module_1 = require("../../../shared/shared.module");
const ERROR_500_ROUTE = [
    { path: '', component: _500_component_1.Error500Component },
];
let Error500Module = class Error500Module {
};
Error500Module = __decorate([
    core_1.NgModule({
        declarations: [_500_component_1.Error500Component],
        imports: [
            common_1.CommonModule,
            shared_module_1.SharedModule,
            router_1.RouterModule.forChild(ERROR_500_ROUTE)
        ]
    })
], Error500Module);
exports.Error500Module = Error500Module;
//# sourceMappingURL=500.module.js.map