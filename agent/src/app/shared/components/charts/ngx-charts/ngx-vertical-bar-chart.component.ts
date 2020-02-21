import { Component } from "@angular/core";
import { single } from "./data";

@Component({
	selector: "ngx-bar-vertical",
	template: `
    <ngx-charts-bar-vertical
      [view]="view"
      [scheme]="colorScheme"
      [results]="single"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [showXAxisLabel]="showXAxisLabel"
      [showYAxisLabel]="showYAxisLabel"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel"
      (select)="onSelect($event)">
    </ngx-charts-bar-vertical>
  `
})
export class NgxChartsBarVerticalDemoComponent {
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

	constructor() {
		Object.assign(this, { single });
	}

	onSelect(event) {
		console.log(event);
	}
}
