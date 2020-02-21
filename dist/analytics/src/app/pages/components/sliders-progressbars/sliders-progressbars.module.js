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
const sliders_progressbars_component_1 = require("./sliders-progressbars.component");
const shared_module_1 = require("../../../shared/shared.module");
const SLIDERS_PROGRESSBARS_ROUTE = [
    { path: '', component: sliders_progressbars_component_1.SlidersProgressbarsComponent },
];
let SlidersProgressbarsModule = class SlidersProgressbarsModule {
};
SlidersProgressbarsModule = __decorate([
    core_1.NgModule({
        declarations: [sliders_progressbars_component_1.SlidersProgressbarsComponent],
        imports: [
            common_1.CommonModule,
            shared_module_1.SharedModule,
            router_1.RouterModule.forChild(SLIDERS_PROGRESSBARS_ROUTE)
        ]
    })
], SlidersProgressbarsModule);
exports.SlidersProgressbarsModule = SlidersProgressbarsModule;
//# sourceMappingURL=sliders-progressbars.module.js.map