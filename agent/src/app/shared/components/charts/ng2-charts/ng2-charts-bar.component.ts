import { Component } from "@angular/core";

@Component({
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
export class ng2BarChartDemoComponent {
	public barChartOptions: any = {
		scaleShowVerticalLines: false,
		responsive: true
	};

	public barChartLabels: string[] = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Firday",
		"Saturday",
		"Sunday"
	];
	public barChartType: string = "bar";
	public barChartLegend: boolean = true;

	public barChartData: any[] = [
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
	public barChartColors: Array<any> = [
		{
			// Teal
			backgroundColor: "rgba(40, 190, 189,0.2)",
			borderColor: "rgba(40, 190, 189,1)",
			pointBackgroundColor: "rgba(40, 190, 189,1)",
			pointBorderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "rgba(40, 190, 189,0.8)"
		},
		{
			//Purple
			backgroundColor: "rgba(88, 103, 195,0.2)",
			borderColor: "rgba(88, 103, 195,1)",
			pointBackgroundColor: "rgba(88, 103, 195,1)",
			pointBorderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "rgba(88, 103, 195,1)"
		},
		{
			//Blue
			backgroundColor: "rgba(66, 165, 245,0.2)",
			borderColor: "rgba(66, 165, 245,1)",
			pointBackgroundColor: "rgba(66, 165, 245,1)",
			pointBorderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "rgba(66, 165, 245,0.8)"
		},
		{
			//Pink
			backgroundColor: "rgba(236, 64, 122,0.2)",
			borderColor: "rgba(236, 64, 122,1)",
			pointBackgroundColor: "rgba(236, 64, 122,1)",
			pointBorderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "rgba(236, 64, 122,0.8)"
		}
	];
	public randomize(): void {
		let _barChartData: Array<any> = new Array(this.barChartData.length);
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
	
	// events
	public chartClicked(e: any): void {
		console.log(e);
	}
	
	public chartHovered(e: any): void {
		console.log(e);
	}
	
	
}
