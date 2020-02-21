import { Component, Input, ViewChild, ElementRef,OnInit,OnChanges,OnDestroy } from "@angular/core";

@Component({
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
	inputs:['lineChartData','lineChartLabels']
})
export class ng2LineChartDemoComponent implements OnInit,OnChanges,OnDestroy{
	// lineChart
	public Count = 0
	initial = 1;
	public changedSecond = true;
	public totalCount = 1
	public pageCount = 1;
	public changed = true;
	public chartData = [];
	public chartLabel=[];
	public lineChartData: Array<any> = [];
	public lineChartLabels: Array<any> = [];
	public lineChartOptions: any = {
		responsive: true,
		data:{
			datasets:{
				fill:false,
				borderColor:"#000000",
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
				//maxBarThickness: 30,
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

	public lineChartColors: Array<any> = [
		
		{
			//Blue
		//	backgroundColor: "rgba(66, 165, 245,0.4)",
			borderColor: "#000000",
			pointBackgroundColor: "rgba(66, 165, 245,1)",
			pointBorderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "rgba(66, 165, 245,0.8)"
		}
	];
	public lineChartLegend: boolean = true;
	public lineChartType: string = "line";

	//ToDo write directive to handle refresh data

	//events
	public chartClicked(e: any): void {
		//console.log(e);
	}

	public chartHovered(e: any): void {
		//console.log(e);
	}
	ngOnInit(){
	}
	ngOnDestroy()
	{

	}
	ngOnChanges()
	{
		// console.log("print onchange")
		// console.log(JSON.stringify(this.lineChartData))
		// console.log(JSON.stringify(this.lineChartLabels))

		this.changed = !this.changed;
		this.changedSecond = !this.changedSecond;
		this.chartLabel = []
		//this.barChartLabels=[]
		this.ngOnDestroy();
		this.Count = 0
		this.chartData = this.lineChartData;
		this.chartLabel = this.lineChartLabels.slice();
		if (this.chartData[0].data.length <= 8) {
			this.totalCount = (Math.floor(this.chartData[0].data.length / 8) + 1)
		} else {
			this.totalCount = (Math.floor(this.chartData[0].data.length / 8) + 1) * 2
		}
		this.pageCount = 1;
		this.lineChartData = this.dataReturn(this.Count);
		this.lineChartLabels = this.labelReturn(this.Count);
		//console.log("From OnChanges" + this.lineChartLabels)
	}

	dataReturn(dataCount) {
		let inc=0;
		if(dataCount==0)
		{
			inc=7;
		}
		else
		{
			inc=Math.min(this.totalCount-dataCount,4);
		}
		let barData = [];
		
		barData = [
			{
			data: (this.chartData[0].data).slice(dataCount+inc-7, dataCount+inc),
			label: this.chartData[0].label,
			backgroundColor:"#ffb900",
			type:"bar",
		} ,
		{
			data: (this.chartData[1].data).slice(dataCount+inc-7, dataCount+inc),
			label: this.chartData[1].label,
			type: "line",
			fill:false,
			borderColor:"#000000",
			pointBorderColor:"#000000",
			pointBackgroundColor: "#000000",
		}];
		return barData;
	}


	labelReturn(labelCount) {
		
				// console.log("third:   "+JSON.stringify(this.chartData)+"\n"+JSON.stringify(this.chartLabel)+"lbcount:"+labelCount);
				if (this.chartLabel.length >= 8) {
					if ((labelCount + 8) < this.chartData[0].data.length) {
						this.lineChartLabels.length = 0;
						for (let i = labelCount; i < (labelCount + 8); i++) {
							this.lineChartLabels.push(this.chartLabel[i]);
						};
						return this.lineChartLabels;
					}
					else {
						this.lineChartLabels.length = 0;
						for (let i = this.Count; i < this.chartData[0].data.length; i++) {
							this.lineChartLabels.push(this.chartLabel[i]);
						};
						return this.lineChartLabels;
					}
				}
				else
					return (this.chartLabel).slice(0, this.chartLabel.length)
			}
		
			public incGraph() {
				if (this.pageCount < this.totalCount) {
					this.pageCount += 1
				}
				let x = this.Count;
				let inc = Math.min(4)
				if ((this.Count + 4) < this.chartData[0].data.length) {
					this.Count = this.Count + 4;
		
					this.lineChartData = this.dataReturn(this.Count)
					this.lineChartLabels = this.labelReturn(this.Count)
				}
		
				//console.log("in inc: "+JSON.stringify(this.barChartData)+"\nlabels:"+JSON.stringify(this.barChartLabels));
		
			}
			public decGraph() {
				if (this.pageCount > 1) {
					this.pageCount -= 1
					//console.log("dec value:  " + this.pageCount)
				}
		
				if ((this.Count - 4) >= 0) {
					this.Count = this.Count - 4;
					this.lineChartData = this.dataReturn(this.Count)
					this.lineChartLabels = this.labelReturn(this.Count)
				}
		
				//console.log("in dec: "+JSON.stringify(this.barChartData)+"\nlabels:"+JSON.stringify(this.barChartLabels));
		
			}
}
