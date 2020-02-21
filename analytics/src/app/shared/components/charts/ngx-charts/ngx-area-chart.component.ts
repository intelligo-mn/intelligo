//our root app component
import { Component } from "@angular/core";
import { single, multi } from "./data";

@Component({
	selector: "ngx-area",
	template: `
	<ngx-charts-area-chart
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
	</ngx-charts-area-chart>
  `
})
export class NgxAreaChartsDemoComponent {
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
