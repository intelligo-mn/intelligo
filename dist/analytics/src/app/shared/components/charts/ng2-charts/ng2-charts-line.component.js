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
        this.Count = 0;
        this.initial = 1;
        this.changedSecond = true;
        this.totalCount = 1;
        this.pageCount = 1;
        this.changed = true;
        this.chartData = [];
        this.chartLabel = [];
        this.lineChartData = [];
        this.lineChartLabels = [];
        this.lineChartOptions = {
            responsive: true,
            data: {
                datasets: {
                    fill: false,
                    borderColor: "#000000",
                }
            },
            scales: {
                xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'NODE'
                        },
                        ticks: {
                            minrotation: 0,
                            maxroataion: 0,
                            autoSkip: false,
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    }],
                showAllToolTips: true,
                yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'COUNT'
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
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
        this.lineChartColors = [
            {
                borderColor: "#000000",
                pointBackgroundColor: "rgba(66, 165, 245,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(66, 165, 245,0.8)"
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = "line";
    }
    chartClicked(e) {
    }
    chartHovered(e) {
    }
    ngOnInit() {
    }
    ngOnDestroy() {
    }
    ngOnChanges() {
        this.changed = !this.changed;
        this.changedSecond = !this.changedSecond;
        this.chartLabel = [];
        this.ngOnDestroy();
        this.Count = 0;
        this.chartData = this.lineChartData;
        this.chartLabel = this.lineChartLabels.slice();
        if (this.chartData[0].data.length <= 8) {
            this.totalCount = (Math.floor(this.chartData[0].data.length / 8) + 1);
        }
        else {
            this.totalCount = (Math.floor(this.chartData[0].data.length / 8) + 1) * 2;
        }
        this.pageCount = 1;
        this.lineChartData = this.dataReturn(this.Count);
        this.lineChartLabels = this.labelReturn(this.Count);
    }
    dataReturn(dataCount) {
        let inc = 0;
        if (dataCount == 0) {
            inc = 7;
        }
        else {
            inc = Math.min(this.totalCount - dataCount, 4);
        }
        let barData = [];
        barData = [
            {
                data: (this.chartData[0].data).slice(dataCount + inc - 7, dataCount + inc),
                label: this.chartData[0].label,
                backgroundColor: "#ffb900",
                type: "bar",
            },
            {
                data: (this.chartData[1].data).slice(dataCount + inc - 7, dataCount + inc),
                label: this.chartData[1].label,
                type: "line",
                fill: false,
                borderColor: "#000000",
                pointBorderColor: "#000000",
                pointBackgroundColor: "#000000",
            }
        ];
        return barData;
    }
    labelReturn(labelCount) {
        if (this.chartLabel.length >= 8) {
            if ((labelCount + 8) < this.chartData[0].data.length) {
                this.lineChartLabels.length = 0;
                for (let i = labelCount; i < (labelCount + 8); i++) {
                    this.lineChartLabels.push(this.chartLabel[i]);
                }
                ;
                return this.lineChartLabels;
            }
            else {
                this.lineChartLabels.length = 0;
                for (let i = this.Count; i < this.chartData[0].data.length; i++) {
                    this.lineChartLabels.push(this.chartLabel[i]);
                }
                ;
                return this.lineChartLabels;
            }
        }
        else
            return (this.chartLabel).slice(0, this.chartLabel.length);
    }
    incGraph() {
        if (this.pageCount < this.totalCount) {
            this.pageCount += 1;
        }
        let x = this.Count;
        let inc = Math.min(4);
        if ((this.Count + 4) < this.chartData[0].data.length) {
            this.Count = this.Count + 4;
            this.lineChartData = this.dataReturn(this.Count);
            this.lineChartLabels = this.labelReturn(this.Count);
        }
    }
    decGraph() {
        if (this.pageCount > 1) {
            this.pageCount -= 1;
        }
        if ((this.Count - 4) >= 0) {
            this.Count = this.Count - 4;
            this.lineChartData = this.dataReturn(this.Count);
            this.lineChartLabels = this.labelReturn(this.Count);
        }
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
	`,
        inputs: ['lineChartData', 'lineChartLabels']
    })
], ng2LineChartDemoComponent);
exports.ng2LineChartDemoComponent = ng2LineChartDemoComponent;
//# sourceMappingURL=ng2-charts-line.component.js.map