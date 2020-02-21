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
const tooltips_popovers_component_1 = require("./tooltips-popovers.component");
const shared_module_1 = require("../../../shared/shared.module");
const TOOLTIPS_POPOVERS_ROUTE = [
    { path: '', component: tooltips_popovers_component_1.TooltipsPopoversComponent },
];
let TooltipsPopoversModule = class TooltipsPopoversModule {
};
TooltipsPopoversModule = __decorate([
    core_1.NgModule({
        declarations: [tooltips_popovers_component_1.TooltipsPopoversComponent],
        imports: [
            common_1.CommonModule,
            shared_module_1.SharedModule,
            router_1.RouterModule.forChild(TOOLTIPS_POPOVERS_ROUTE)
        ]
    })
], TooltipsPopoversModule);
exports.TooltipsPopoversModule = TooltipsPopoversModule;
//# sourceMappingURL=tooltips-popovers.module.js.map