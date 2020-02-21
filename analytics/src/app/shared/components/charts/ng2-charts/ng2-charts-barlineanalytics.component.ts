import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges, ChangeDetectorRef, HostListener } from "@angular/core";
import { Location } from "@angular/common"
import { Chart } from "chart.js";
// import { window } from "rxjs/operator/window";
import { BaseChartDirective } from 'ng2-charts'
import { ApplicationRef } from "@angular/core/src/application_ref";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { locales } from "moment";
@Component({
	selector: "ng2-charts-barline-analytics",
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
		></canvas>
	</div>
	`,
	inputs: ['barChartData', 'barChartLabels']
})
export class ng2BarLineChartDemoComponentAnalytics implements OnInit, OnChanges, OnDestroy {

	public lastDataIndex = 0
	public totalPageCount;
	public changedSecond = true;
	public totalCount = 1
	public pageCount = 1;
	public changed = true;
	public chartData = [];
	public barChartOptions: any = {
		scaleShowVerticalLines: false,
		responsive: true,
		//maintainAspectRatio:false,
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
					labelString: 'NODE NAME',
					fontSize: 15
				},
				ticks: {
					minRotation: 0,
					maxRoataion: 0,
					autoSkip: false,
				},
				//maxBarThickness: 30,
				gridLines: {
					display: false,
					color: "rgba(0, 0, 0, 1)",
				},
			}],
			showAllToolTips: true,
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'COUNT',
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
	public barChartLabels: string[] = [];
	public chartLabel: string[] = [];
	public barChartType: string = "bar";
	public barChartLegend: boolean = true;

	public barChartData: any[] = [];
	public barChartColors: Array<any> = [
		{
			backgroundColor: "#000000",
			borderColor: "#000000",
			pointBackgroundColor: "#000000",
			pointBorderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "#000000"
		}
	];

	constructor() {

	}
	ngOnInit() {

	}

	ngOnChanges() {
		if (this.changed) {
			this.changed = false;
		}
		else {
			this.changed = true;
		}
		this.chartLabel = []
		this.pageCount = 1;
		//this.barChartLabels=[]
		this.ngOnDestroy();
		this.lastDataIndex = 0
		this.chartData = this.barChartData;
		this.chartLabel = this.barChartLabels.slice();
		this.totalCount = this.chartData[0].data.length
		this.barChartLabels.length = 0;
		if (this.chartData[0].data.length <= 8) {
			this.totalPageCount = 1
		}
		else {
			let len = this.chartData[0].data.length - 8
			if (len % 4 == 0) {
				this.totalPageCount = len / 4 + 1
			}
			else {
				this.totalPageCount = Math.floor(len / 4) + 2
			}
		}
		this.barChartData = this.dataReturn(this.lastDataIndex);
		this.barChartLabels.length = 0
		this.labelReturn(this.lastDataIndex)
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
			inc = Math.min(this.totalCount - lastDataIndex-1 , 4);
		}
		let barData = [];

		barData = [
			{
				data: (this.chartData[0].data).slice(lastDataIndex + inc - 7, lastDataIndex + inc + 1),
				label: this.chartData[0].label,
				type: "line",
				fill: false,
				pointRadius: 5,
				pointHoverRadius: 8,
				borderWidth: 1.5
			},
			{
				data: (this.chartData[1].data).slice(lastDataIndex + inc - 7, lastDataIndex + inc + 1),
				label: this.chartData[1].label,
				backgroundColor: "#ffb900",
			}];
		return barData;
	}

	labelReturn(lastLabelIndex) {
		let inc = 0;
		if (lastLabelIndex == 0) {
			inc = 7;
		}
		else {
			//if(lastLabelIndex<7)
			//inc = Math.min(this.totalCount - lastLabelIndex, 4);
		//else
			inc = Math.min(this.totalCount- lastLabelIndex-1,4)
		}
		let barData = [];
		//this.barChartLabels=[]
		this.barChartLabels.length = 0;
		barData = this.chartLabel.slice(lastLabelIndex + inc - 7, lastLabelIndex + inc + 1);
		// this.barChartLabels = barData;
		for (let i = 0; i < barData.length; i++) {
			this.barChartLabels.push(barData[i])
		}
		// //console.log(this.pageCount+" "+this.barChartLabels)
		return barData;
	}

	public incGraph() {
		
		if (this.pageCount < this.totalPageCount) {
			this.pageCount += 1
			this.barChartData = this.dataReturn(this.lastDataIndex)
			this.labelReturn(this.lastDataIndex);
			this.lastDataIndex = this.lastDataIndex + 4;
			console.log(this.lastDataIndex) 
		}
		// else if ((this.lastDataIndex + 4) < this.chartData[0].data.length) {
		// 	this.barChartData = this.dataReturn(this.lastDataIndex)
		// 	this.labelReturn(this.lastDataIndex)
		// 	this.lastDataIndex = this.lastDataIndex + 4;
		// }

	}

	
	public decGraph(){
		if(this.pageCount>1)
		{
			this.barChartData=this.dataReturn(this.lastDataIndex-8)
			this.labelReturn(this.lastDataIndex-8)
			this.pageCount-=1
			this.lastDataIndex-=4;
			console.log(this.lastDataIndex)
		}
	}


	
}
