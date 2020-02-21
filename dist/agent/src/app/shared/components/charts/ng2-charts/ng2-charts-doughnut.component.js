"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let ng2DoughnutChartDemoComponent = class ng2DoughnutChartDemoComponent {
    constructor() {
        this.doughnutChartLabels = [
            "Download Sales",
            "In-Store Sales",
            "Mail-Order Sales"
        ];
        this.doughnutChartData = [350, 450, 100];
        this.doughnutChartType = "doughnut";
        this.doughnutChartColors = [
            {
                backgroundColor: ["#5867C3", "#28BEBD", "#42A5F5"]
            }
        ];
    }
    chartClicked(e) {
        console.log(e);
    }
    chartHovered(e) {
        console.log(e);
    }
};
ng2DoughnutChartDemoComponent = __decorate([
    core_1.Component({
        selector: "ng2-charts-doughnut",
        template: `
			<div style="display: block;">
			<canvas baseChart class="chart"
			[data]="doughnutChartData"
			[labels]="doughnutChartLabels"
			[chartType]="doughnutChartType"
				[colors]="doughnutChartColors"
			(chartHover)="chartHovered($event)"
			(chartClick)="chartClicked($event)"></canvas>
			</div>
	`
    })
], ng2DoughnutChartDemoComponent);
exports.ng2DoughnutChartDemoComponent = ng2DoughnutChartDemoComponent;
//# sourceMappingURL=ng2-charts-doughnut.component.js.map