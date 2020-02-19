//our root app component
import { Component } from "@angular/core";
import { single, multi } from "./data";

@Component({
	selector: "ngx-pie-grid",
	template: `
	<ngx-charts-pie-grid
		[view]="view"
		[scheme]="colorScheme"
		[results]="single"
		(select)="onSelect($event)">
	</ngx-charts-pie-grid>
  `
})
export class NgxPieGridChartsDemoComponent {
	single: any[];
	multi: any[];

	view: any[] = [700, 400];

	// options
	showXAxis = true;
	showYAxis = true;
	showLegend = true;
	showXAxisLabel = true;
	xAxisLabel = "Country";
	showYAxisLabel = true;
	yAxisLabel = "Population";
	colorScheme = {
		domain: ["#28BEBD", "#5867C3", "#42A5F5", "#516073"]
	};

	// line, area
	autoScale = true;

	constructor() {
		Object.assign(this, { single, multi });
	}

	onSelect(event) {
		//console.log(event);
	}
}
