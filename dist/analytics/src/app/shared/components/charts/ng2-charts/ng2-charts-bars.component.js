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
let ng2BarChartDemoComponent = class ng2BarChartDemoComponent {
    constructor() {
        this.lastDataIndex = 0;
        this.xlabel = "";
        this.ylabel = "";
        this.initial = 1;
        this.changedSecond = true;
        this.totalCount = 1;
        this.pageCount = 1;
        this.changed = true;
        this.chartData = [];
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true,
            legendOptions: {
                align: "center",
            },
            legend: {
                position: "top",
                labels: {
                    align: "center",
                    fontSize: 16
                }
            },
            scales: {
                xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: this.xlabel,
                            fontSize: 15
                        },
                        ticks: {
                            minrotation: 0,
                            maxroataion: 0,
                            autoSkip: false,
                        },
                        gridLines: {
                            display: false,
                            color: "rgba(0, 0, 0, 1)",
                        },
                    }],
                showAllToolTips: true,
                yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: this.ylabel,
                            fontSize: 15
                        },
                        gridLines: {
                            display: false,
                            color: "rgba(0, 0, 0, 1)",
                        },
                        ticks: {
                            beginAtZero: true,
                            Callback: function (label, index, labels) {
                                if (Math.floor(label) === label) {
                                    return label;
                                }
                            },
                        }
                    }]
            }
        };
        this.barChartLabels = [];
        this.chartLabel = [];
        this.barChartType = "bar";
        this.barChartLegend = true;
        this.barChartData = [];
        this.barChartColors = [
            {
                backgroundColor: "#ffb900",
                borderColor: "#ffb900",
                pointBackgroundColor: "#00000",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#000000"
            }
        ];
    }
    ngOnInit() {
        this.barChartOptions.scales.xAxes[0].scaleLabel.labelString = this.xlabel;
        this.barChartOptions.scales.yAxes[0].scaleLabel.labelString = this.ylabel;
    }
    ngOnChanges() {
        this.barChartOptions.scales.xAxes[0].scaleLabel.labelString = this.xlabel;
        this.barChartOptions.scales.yAxes[0].scaleLabel.labelString = this.ylabel;
        if (this.changed) {
            this.changed = false;
        }
        else {
            this.changed = true;
        }
        this.ngOnDestroy();
        this.chartData = this.barChartData;
        this.pageCount = 1;
        this.chartLabel = this.barChartLabels.slice();
        this.lastDataIndex = 0;
        this.chartData = this.barChartData;
        this.pageCount = 1;
        this.chartLabel = this.barChartLabels.slice();
        if (this.chartData[0].data.length <= 8) {
            this.totalPageCount = 1;
        }
        else {
            let len = this.chartData[0].data.length - 8;
            if (len % 4 == 0) {
                this.totalPageCount = len / 4 + 1;
            }
            else {
                this.totalPageCount = Math.floor(len / 4) + 2;
            }
        }
        this.lastDataIndex = 0;
        this.totalCount = this.chartData[0].data.length;
        this.barChartData = this.dataReturn(this.lastDataIndex);
        this.barChartLabels.length = 0;
        this.labelReturn(this.lastDataIndex);
        this.lastDataIndex = Math.min(this.totalCount, 7);
    }
    ngOnDestroy() {
    }
    dataReturn(lastDataIndex) {
        let inc = 0;
        if (lastDataIndex == 0) {
            inc = 7;
        }
        else {
            inc = Math.min(this.totalCount - lastDataIndex - 1, 4);
        }
        let barData = [];
        barData = [
            {
                data: (this.chartData[0].data).slice(lastDataIndex + inc - 7, lastDataIndex + inc + 1),
                label: this.chartData[0].label,
            }
        ];
        return barData;
    }
    chartClicked(e) {
    }
    labelReturn(lastLabelIndex) {
        let inc = 0;
        if (lastLabelIndex == 0) {
            inc = 7;
        }
        else {
            inc = Math.min(this.totalCount - lastLabelIndex - 1, 4);
        }
        let barData = [];
        this.barChartLabels.length = 0;
        barData = this.chartLabel.slice(lastLabelIndex + inc - 7, lastLabelIndex + inc + 1);
        for (let i = 0; i < barData.length; i++) {
            this.barChartLabels.push(barData[i]);
        }
        return barData;
    }
    incGraph() {
        if (this.pageCount < this.totalPageCount) {
            this.pageCount += 1;
            this.barChartData = this.dataReturn(this.lastDataIndex);
            this.labelReturn(this.lastDataIndex);
            this.lastDataIndex = this.lastDataIndex + 4;
        }
    }
    decGraph() {
        if (this.pageCount > 1) {
            this.barChartData = this.dataReturn(this.lastDataIndex - 8);
            this.labelReturn(this.lastDataIndex - 8);
            this.pageCount -= 1;
            this.lastDataIndex -= 4;
        }
    }
};
ng2BarChartDemoComponent = __decorate([
    core_1.Component({
        selector: "ng2-charts-bars",
        template: `
	<ul class="actions icons top-right">
	<li>
		<a href="javascript:void(0)" (click)="decGraph()">
			<i class="zmdi zmdi-long-arrow-left"></i>
			
		</a>
	</li>
	<li>
		<a href="javascript:void(0)" (click)="incGraph()">
			<i class="zmdi zmdi-long-arrow-right"></i>
		</a>
	</li>
	</ul>
		<p style="float:right;padding-right:12px">{{pageCount}} / {{totalPageCount}}</p>
		<div *ngIf="changed" style="display: block;">
			<canvas baseChart #chart width="800" height="340" class="chart"
			[datasets]="barChartData"
			[labels]="barChartLabels"
			[options]="barChartOptions"
			[colors]="barChartColors"
			[legend]="barChartLegend"
			[chartType]="barChartType"
			(chartHover)="chartHovered($event)"
			(chartClick)="chartClicked($event)"
			></canvas>
	</div>
		<div *ngIf="!changed" style="display: block;">
		<canvas baseChart #chart width="900" height="340" class="chart"
		[datasets]="barChartData"
		[labels]="barChartLabels"
		[options]="barChartOptions"
		[colors]="barChartColors"
		[legend]="barChartLegend"
		[chartType]="barChartType"
		(chartHover)="chartHovered($event)"
		(chartClick)="chartClicked($event)"
		></canvas>
	</div>
	`,
        inputs: ['barChartData', 'barChartLabels', 'xlabel', 'ylabel']
    }),
    __metadata("design:paramtypes", [])
], ng2BarChartDemoComponent);
exports.ng2BarChartDemoComponent = ng2BarChartDemoComponent;
//# sourceMappingURL=ng2-charts-bars.component.js.map