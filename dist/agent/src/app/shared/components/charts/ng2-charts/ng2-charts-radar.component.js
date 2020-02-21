"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let ng2RadarChartDemoComponent = class ng2RadarChartDemoComponent {
    constructor() {
        this.radarChartLabels = [
            "Eating",
            "Drinking",
            "Sleeping",
            "Designing",
            "Coding",
            "Cycling",
            "Running"
        ];
        this.radarChartData = [
            { data: [65, 59, 90, 81, 56, 55, 40], label: "Series A" },
            { data: [28, 48, 40, 19, 96, 27, 100], label: "Series B" }
        ];
        this.radarChartType = "radar";
        this.radarChartColors = [
            {
                backgroundColor: "rgba(40, 190, 189,0.2)",
                borderColor: "rgba(40, 190, 189,1)",
                pointBackgroundColor: "rgba(40, 190, 189,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(40, 190, 189,0.8)"
            },
            {
                backgroundColor: "rgba(88, 103, 195,0.2)",
                borderColor: "rgba(88, 103, 195,1)",
                pointBackgroundColor: "rgba(88, 103, 195,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(88, 103, 195,1)"
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
ng2RadarChartDemoComponent = __decorate([
    core_1.Component({
        selector: "ng2-charts-radar",
        template: `
		<div style="display: block;">
			<canvas baseChart class="chart"
			[datasets]="radarChartData"
			[labels]="radarChartLabels"
			[colors]="radarChartColors"
			[chartType]="radarChartType"
			(chartHover)="chartHovered($event)"
			(chartClick)="chartClicked($event)"></canvas>
			</div>
	`
    })
], ng2RadarChartDemoComponent);
exports.ng2RadarChartDemoComponent = ng2RadarChartDemoComponent;
//# sourceMappingURL=ng2-charts-radar.component.js.map