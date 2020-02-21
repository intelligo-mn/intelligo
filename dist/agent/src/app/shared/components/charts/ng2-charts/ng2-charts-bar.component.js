"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let ng2BarChartDemoComponent = class ng2BarChartDemoComponent {
    constructor() {
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Firday",
            "Saturday",
            "Sunday"
        ];
        this.barChartType = "bar";
        this.barChartLegend = true;
        this.barChartData = [
            {
                data: [23, 45, 65, 33, 5, 23, 44],
                label: "Added to Cart"
            },
            {
                data: [12, 45, 32, 11, 15, 23, 46],
                label: "Reached checkout"
            },
            {
                data: [33, 23, 28, 32, 56, 42, 76],
                label: "Purchased"
            },
            {
                data: [2, 4, 6, 3, 7, 1, 6],
                label: "Cancelled"
            }
        ];
        this.barChartColors = [
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
            },
            {
                backgroundColor: "rgba(66, 165, 245,0.2)",
                borderColor: "rgba(66, 165, 245,1)",
                pointBackgroundColor: "rgba(66, 165, 245,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(66, 165, 245,0.8)"
            },
            {
                backgroundColor: "rgba(236, 64, 122,0.2)",
                borderColor: "rgba(236, 64, 122,1)",
                pointBackgroundColor: "rgba(236, 64, 122,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(236, 64, 122,0.8)"
            }
        ];
    }
    randomize() {
        let _barChartData = new Array(this.barChartData.length);
        for (let i = 0; i < this.barChartData.length; i++) {
            _barChartData[i] = {
                data: new Array(this.barChartData[i].data.length),
                label: this.barChartData[i].label
            };
            for (let j = 0; j < this.barChartData[i].data.length; j++) {
                _barChartData[i].data[j] = Math.floor(Math.random() * 100 + 1);
            }
        }
        this.barChartData = _barChartData;
    }
    chartClicked(e) {
        console.log(e);
    }
    chartHovered(e) {
        console.log(e);
    }
};
ng2BarChartDemoComponent = __decorate([
    core_1.Component({
        selector: "ng2-charts-bar",
        template: `
		<div style="display: block;">
			<canvas baseChart  width="900" height="340" class="chart"
			[datasets]="barChartData"
			[labels]="barChartLabels"
			[options]="barChartOptions"
			[colors]="barChartColors"
			[legend]="barChartLegend"
			[chartType]="barChartType"
			(chartHover)="chartHovered($event)"
			(chartClick)="chartClicked($event)"></canvas>
	</div>
	`
    })
], ng2BarChartDemoComponent);
exports.ng2BarChartDemoComponent = ng2BarChartDemoComponent;
//# sourceMappingURL=ng2-charts-bar.component.js.map