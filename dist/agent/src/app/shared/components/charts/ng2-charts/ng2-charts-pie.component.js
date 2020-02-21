"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let ng2PieChartDemoComponent = class ng2PieChartDemoComponent {
    constructor() {
        this.pieChartLabels = [
            "Download Sales",
            "In-Store Sales",
            "Mail Sales"
        ];
        this.pieChartData = [300, 500, 100];
        this.pieChartType = "pie";
        this.pieChartColors = [
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
ng2PieChartDemoComponent = __decorate([
    core_1.Component({
        selector: "ng2-charts-pie",
        template: `
		<div style="display: block;">
			<canvas baseChart class="chart"
			[data]="pieChartData"
			[labels]="pieChartLabels"
			[colors]="pieChartColors"
			[chartType]="pieChartType"
			(chartHover)="chartHovered($event)"
			(chartClick)="chartClicked($event)"></canvas>
			</div>
	`
    })
], ng2PieChartDemoComponent);
exports.ng2PieChartDemoComponent = ng2PieChartDemoComponent;
//# sourceMappingURL=ng2-charts-pie.component.js.map