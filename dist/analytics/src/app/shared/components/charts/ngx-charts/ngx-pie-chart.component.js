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
const data_1 = require("./data");
let NgxPieChartsDemoComponent = class NgxPieChartsDemoComponent {
    constructor() {
        this.view = [700, 400];
        this.showLegend = true;
        this.colorScheme = {
            domain: ["#28BEBD", "#5867C3", "#42A5F5", "#516073"]
        };
        this.showLabels = true;
        this.explodeSlices = false;
        this.doughnut = false;
        Object.assign(this, { single: data_1.single, multi: data_1.multi });
    }
    onSelect(event) {
        console.log(event);
    }
};
NgxPieChartsDemoComponent = __decorate([
    core_1.Component({
        selector: "ngx-pie",
        template: `
    <ngx-charts-pie-chart
      [view]="view"
      [scheme]="colorScheme"
      [results]="single"
      [legend]="showLegend"
      [explodeSlices]="explodeSlices"
      [labels]="showLabels"
      [doughnut]="doughnut"
      (select)="onSelect($event)">
    </ngx-charts-pie-chart>
  `
    }),
    __metadata("design:paramtypes", [])
], NgxPieChartsDemoComponent);
exports.NgxPieChartsDemoComponent = NgxPieChartsDemoComponent;
//# sourceMappingURL=ngx-pie-chart.component.js.map