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
const dashboards_component_1 = require("./dashboards.component");
const shared_module_1 = require("../../shared/shared.module");
const chartist_line_component_1 = require("../../shared/components/charts/chartist/chartist-line/chartist-line.component");
const chartist_lines_component_1 = require("../../shared/components/charts/chartist/chartist-lines/chartist-lines.component");
const chartist_bars_component_1 = require("../../shared/components/charts/chartist/chartist-bars/chartist-bars.component");
const image_over_card_component_1 = require("../../shared/components/cards/image-over-card/image-over-card.component");
const contacts_card_component_1 = require("../../shared/components/cards/contacts-card/contacts-card.component");
const todo_component_1 = require("../../shared/components/todo/todo.component");
const task_component_1 = require("../../shared/components/todo/task.component");
const DASHBOARDS_ROUTE = [
    { path: '', component: dashboards_component_1.DashboardsComponent },
];
let DashboardsModule = class DashboardsModule {
};
DashboardsModule = __decorate([
    core_1.NgModule({
        declarations: [
            dashboards_component_1.DashboardsComponent,
            chartist_line_component_1.ChartistLineComponent,
            chartist_lines_component_1.ChartistLinesComponent,
            chartist_bars_component_1.ChartistBarsComponent,
            image_over_card_component_1.ImageOverCardComponent,
            contacts_card_component_1.ContactsCardComponent,
            todo_component_1.TodoComponent,
            task_component_1.TaskComponent
        ],
        imports: [
            common_1.CommonModule,
            shared_module_1.SharedModule,
            router_1.RouterModule.forChild(DASHBOARDS_ROUTE)
        ]
    })
], DashboardsModule);
exports.DashboardsModule = DashboardsModule;
//# sourceMappingURL=dashboards.module.js.map