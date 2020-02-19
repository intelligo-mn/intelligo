import { Component, Input, ViewChild, ElementRef } from "@angular/core";

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
	`
})
export class ng2LineChartDemoComponent {
	// lineChart

	public lineChartData: Array<any> = [
		{
			data: [65, 59, 80, 81, 56, 55, 40],
			label: "Unique"
		},
		{
			data: [28, 48, 40, 19, 86, 27, 90],
			label: "Returning"
		}
	];
	public lineChartLabels: Array<any> = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July"
	];
	public lineChartOptions: any = {
		responsive: true
	};

	public lineChartColors: Array<any> = [
		{
			//Purple
			backgroundColor: "rgba(88, 103, 195,0.4)",
			borderColor: "rgba(88, 103, 195,1)",
			pointBackgroundColor: "rgba(88, 103, 195,1)",
			pointBorderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "rgba(88, 103, 195,1)"
		},
		{
			//Blue
			backgroundColor: "rgba(66, 165, 245,0.4)",
			borderColor: "rgba(66, 165, 245,1)",
			pointBackgroundColor: "rgba(66, 165, 245,1)",
			pointBorderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "rgba(66, 165, 245,0.8)"
		}
	];
	public lineChartLegend: boolean = true;
	public lineChartType: string = "line";

	//ToDo write directive to handle refresh data
	public randomize(): void {
		let _lineChartData: Array<any> = new Array(this.lineChartData.length);
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

	//events
	public chartClicked(e: any): void {
		//console.log(e);
	}

	public chartHovered(e: any): void {
		//console.log(e);
	}
}
