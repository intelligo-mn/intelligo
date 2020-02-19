import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges, ChangeDetectorRef } from "@angular/core";
import { Location } from "@angular/common"
import { Chart } from "chart.js";
import { window } from "rxjs/operator/window";
import { BaseChartDirective } from 'ng2-charts'
import { ApplicationRef } from "@angular/core/src/application_ref";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
@Component({
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
	inputs: ['barChartData', 'barChartLabels','xlabel','ylabel']
})
export class ng2BarChartDemoComponent implements OnInit, OnChanges, OnDestroy {

	public lastDataIndex = 0
	public xlabel="";
	public ylabel="";
	initial = 1;
	public changedSecond = true;
	public totalPageCount:number
	public totalCount = 1
	public pageCount = 1;
	public changed = true;
	public chartData = [];
	public barChartOptions: any = {
		scaleShowVerticalLines: false,
		responsive: true,
		legendOptions: {
			align: "center",
		},
		legend: {
			position: "top",
			labels: {
				align: "center",
				fontSize:16
			}

		},
		scales: {
			xAxes: [{
				scaleLabel: {
					display: true,
					labelString: this.xlabel,
					fontSize:15
				},
				ticks: {
					minrotation: 0,
					maxroataion: 0,
					autoSkip: false,
				},
				//maxBarThickness: 30,
				gridLines: {
					display:false,
					color: "rgba(0, 0, 0, 1)",
				},
			}],
			showAllToolTips: true,
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: this.ylabel,
					fontSize:15
				},
				gridLines: {
					display:false,
					color: "rgba(0, 0, 0, 1)",
				},

				ticks: {
					beginAtZero: true,
					Callback: function(label, index, labels) {
						// when the floored value is the same as the value we have a whole number
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
			backgroundColor: "#ffb900",
			borderColor: "#ffb900",
			pointBackgroundColor: "#00000",
			pointBorderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "#000000"
		}
	];

	constructor() {

	}

	ngOnInit() {
		this.barChartOptions.scales.xAxes[0].scaleLabel.labelString=this.xlabel
		this.barChartOptions.scales.yAxes[0].scaleLabel.labelString=this.ylabel
		// console.log("from ng2")
		// //	this.chartData=this.barChartData
		// //	this.pageCount=1;
		// //	this.chartLabel=this.barChartLabels.slice();
		// //	this.lastDataIndex=0;
			
	
		// 	this.chartData=this.barChartData
		// 	this.pageCount=1;
		// 	this.chartLabel=this.barChartLabels.slice();
		// 	if (this.chartData[0].data.length <= 8) {
		// 		this.totalPageCount = 1
		// 	}
		// 	else {
		// 		let len=this.chartData[0].data.length-8
		// 		if(len%4==0)
		// 		{
		// 			this.totalPageCount=len/4+1
		// 		}
		// 		else{
		// 			this.totalPageCount=Math.floor(len/4)+2
		// 		}
		// 	}
			
		// 	this.lastDataIndex=0;
		// 	this.totalCount=this.chartData[0].data.length
		// 	//this.pageCount = 1;
		// 	this.barChartData=this.dataReturn(this.lastDataIndex);
		// 	this.labelReturn(this.lastDataIndex)
		// 	this.lastDataIndex = Math.min(this.totalCount, 7);
			
		// 	console.log(this.chartLabel);
			
	}

	ngOnChanges() {
		//localStorage.removeItem('agentData');
		this.barChartOptions.scales.xAxes[0].scaleLabel.labelString=this.xlabel
		this.barChartOptions.scales.yAxes[0].scaleLabel.labelString=this.ylabel
		//console.log("From bar-chart")
		if (this.changed) {
            this.changed = false;
        }
        else {
            this.changed = true;
		}
		this.ngOnDestroy()
		this.chartData=this.barChartData
		this.pageCount=1;
		this.chartLabel=this.barChartLabels.slice();
		this.lastDataIndex=0;
		

		this.chartData=this.barChartData
		this.pageCount=1;
		this.chartLabel=this.barChartLabels.slice();
		if (this.chartData[0].data.length <= 8) {
			this.totalPageCount = 1
		}
		else {
			let len=this.chartData[0].data.length-8
			if(len%4==0)
			{
				this.totalPageCount=len/4+1
			}
			else{
				this.totalPageCount=Math.floor(len/4)+2
			}
		}
		
		this.lastDataIndex=0;
		this.totalCount=this.chartData[0].data.length
		//this.pageCount = 1;
		this.barChartData=this.dataReturn(this.lastDataIndex);
		this.barChartLabels.length=0;
		this.labelReturn(this.lastDataIndex)
		this.lastDataIndex = Math.min(this.totalCount, 7);
		
		//console.log(this.chartLabel);
		
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
			data: (this.chartData[0].data).slice(lastDataIndex+inc-7, lastDataIndex+inc+1),
			label: this.chartData[0].label,
			}];
		
		return barData;
	}

	public chartClicked(e: any) {
		//console.log(e)
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
		//this.barChartLabels=[]
		this.barChartLabels.length = 0;
		barData = this.chartLabel.slice(lastLabelIndex + inc - 7, lastLabelIndex + inc + 1);
		// this.barChartLabels = barData;
		for (let i = 0; i < barData.length; i++) {
			this.barChartLabels.push(barData[i])
		}
		// console.log(this.pageCount+" "+this.barChartLabels)
		return barData;
	}

	// labelReturn(labelCount) {

	// 	let inc=0
	// 	if (this.chartLabel.length >= 8) {
	// 		if ((labelCount + 8) < this.chartData[0].data.length) {
	// 			this.barChartLabels.length = 0;
	// 			for (let i = labelCount; i < (labelCount + 8); i++) {
	// 				this.barChartLabels.push(this.chartLabel[i]);
	// 			};
	// 			return this.barChartLabels;
	// 		}
	// 		else {
	// 			this.barChartLabels.length = 0;
	// 			for (let i = this.lastDataIndex; i < this.chartData[0].data.length; i++) {
	// 				this.barChartLabels.push(this.chartLabel[i]);
	// 			};
	// 			return this.barChartLabels;
	// 		}
	// 	}
	// 	else
	// 		return (this.chartLabel).slice(0, this.chartLabel.length)
	// }

	public incGraph() {
		
		if (this.pageCount < this.totalPageCount) {
			this.pageCount += 1
			this.barChartData = this.dataReturn(this.lastDataIndex)
			this.labelReturn(this.lastDataIndex);
			this.lastDataIndex = this.lastDataIndex + 4;
			//console.log(this.lastDataIndex) 
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
			//console.log(this.lastDataIndex)
		}
	}

}
