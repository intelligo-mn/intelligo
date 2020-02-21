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
const goalConversion_component_1 = require("./goalConversion.component");
const shared_module_1 = require("../../shared/shared.module");
const date_format_1 = require("../date-format");
const material_1 = require("@angular/material");
const MY_DATE_FORMATS = {
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};
const ANALYTICS_ROUTE = [
    { path: '', component: goalConversion_component_1.GoalConversionComponent },
];
let GoalConversionModule = class GoalConversionModule {
};
GoalConversionModule = __decorate([
    core_1.NgModule({
        declarations: [
            goalConversion_component_1.GoalConversionComponent,
        ],
        imports: [
            common_1.CommonModule,
            shared_module_1.SharedModule,
            material_1.MatDatepickerModule,
            router_1.RouterModule.forChild(ANALYTICS_ROUTE)
        ],
        providers: [
            { provide: material_1.DateAdapter, useClass: date_format_1.MyDateAdapter },
            { provide: material_1.MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
        ]
    })
], GoalConversionModule);
exports.GoalConversionModule = GoalConversionModule;
//# sourceMappingURL=goalConversion.module.js.map