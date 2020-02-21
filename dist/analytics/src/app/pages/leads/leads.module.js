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
var _a;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const leads_component_1 = require("./leads.component");
const shared_module_1 = require("../../shared/shared.module");
const LEADS_ROUTE = [{ path: "", component: leads_component_1.LeadsComponent }];
const ngx_datatable_1 = require("@swimlane/ngx-datatable");
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
let LeadsModule = class LeadsModule {
    constructor(dateAdapter) {
        this.dateAdapter = dateAdapter;
    }
};
LeadsModule = __decorate([
    core_1.NgModule({
        declarations: [leads_component_1.LeadsComponent],
        imports: [
            common_1.CommonModule,
            shared_module_1.SharedModule,
            material_1.MatDatepickerModule,
            ngx_datatable_1.NgxDatatableModule,
            router_1.RouterModule.forChild(LEADS_ROUTE)
        ],
        providers: [
            { provide: material_1.DateAdapter, useClass: date_format_1.MyDateAdapter },
            { provide: material_1.MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
        ]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof material_1.DateAdapter !== "undefined" && material_1.DateAdapter) === "function" ? _a : Object])
], LeadsModule);
exports.LeadsModule = LeadsModule;
//# sourceMappingURL=leads.module.js.map