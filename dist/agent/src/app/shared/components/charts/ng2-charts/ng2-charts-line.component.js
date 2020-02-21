"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let ng2LineChartDemoComponent = class ng2LineChartDemoComponent {
    constructor() {
        this.lineChartData = [
            {
                data: [65, 59, 80, 81, 56, 55, 40],
                label: "Unique"
            },
            {
                data: [28, 48, 40, 19, 86, 27, 90],
                label: "Returning"
            }
        ];
        this.lineChartLabels = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July"
        ];
        this.lineChartOptions = {
            responsive: true
        };
        this.lineChartColors = [
            {
                backgroundColor: "rgba(88, 103, 195,0.4)",
                borderColor: "rgba(88, 103, 195,1)",
                pointBackgroundColor: "rgba(88, 103, 195,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(88, 103, 195,1)"
            },
            {
                backgroundColor: "rgba(66, 165, 245,0.4)",
                borderColor: "rgba(66, 165, 245,1)",
                pointBackgroundColor: "rgba(66, 165, 245,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(66, 165, 245,0.8)"
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = "line";
    }
    randomize() {
        let _lineChartData = new Array(this.lineChartData.length);
        for (let i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = {
                data: new Array(this.lineChartData[i].data.length),
                label: this.lineChartData[i].label
            };
            for (let j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor(Math.random() * 100 + 1);
            }
        }
        this.lineChartData = _lineChartData;
    }
    chartClicked(e) {
    }
    chartHovered(e) {
    }
};
ng2LineChartDemoComponent = __decorate([
    core_1.Component({
        selector: "ng2-charts-line",
        template: `
	<div class="block">
	<canvas baseChart
	height="275"
	width="1140"
	[datasets]="lineChartData"
	[labels]="lineChartLabels"
	[options]="lineChartOptions"
	[colors]="lineChartColors"
	[legend]="lineChartLegend"
	[chartType]="lineChartType"
	(chartHover)="chartHovered($event)"
	(chartClick)="chartClicked($event)">
	</canvas>
	</div>
	`
    })
], ng2LineChartDemoComponent);
exports.ng2LineChartDemoComponent = ng2LineChartDemoComponent;
//# sourceMappingURL=ng2-charts-line.component.js.map