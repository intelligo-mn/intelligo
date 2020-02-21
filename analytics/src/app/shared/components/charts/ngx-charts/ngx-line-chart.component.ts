//our root app component
import { Component } from "@angular/core";
import { single, multi } from "./data";

@Component({
	selector: "ngx-line",
	template: `
	<ngx-charts-line-chart
		[view]="view"
		[scheme]="colorScheme"
		[results]="multi"
		[xAxis]="showXAxis"
		[yAxis]="showYAxis"
		[legend]="showLegend"
		[showXAxisLabel]="showXAxisLabel"
		[showYAxisLabel]="showYAxisLabel"
		[xAxisLabel]="xAxisLabel"
		[yAxisLabel]="yAxisLabel"
		[autoScale]="autoScale"
		(select)="onSelect($event)">
	</ngx-charts-line-chart>
  `
})
export class NgxLineChartsDemoComponent {
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
