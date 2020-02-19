import { Component } from "@angular/core";

@Component({
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
export class ng2PieChartDemoComponent {
	public pieChartLabels: string[] = [
		"Download Sales",
		"In-Store Sales",
		"Mail Sales"
	];
	public pieChartData: number[] = [300, 500, 100];
	public pieChartType: string = "pie";
	public pieChartColors: Array<any> = [
		{
			backgroundColor: ["#5867C3", "#28BEBD", "#42A5F5"]
		}
	];
	
	// events
	public chartClicked(e: any): void {
		console.log(e);
	}
	
	public chartHovered(e: any): void {
		console.log(e);
	}
}
