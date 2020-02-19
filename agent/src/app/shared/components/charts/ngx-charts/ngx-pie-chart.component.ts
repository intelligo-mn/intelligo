//our root app component
import { Component } from "@angular/core";
import { single, multi } from "./data";

@Component({
	selector: "ngx-pie",
	template: `
    <ngx-charts-pie-chart
      [view]="view"
      [scheme]="colorScheme"
      [results]="single"
      [legend]="showLegend"
      [explodeSlices]="explodeSlices"
      [labels]="showLabels"
      [doughnut]="doughnut"
      (select)="onSelect($event)">
    </ngx-charts-pie-chart>
  `
})
export class NgxPieChartsDemoComponent {
	single: any[];
	multi: any[];

	view: any[] = [700, 400];

	// options
	showLegend = true;

	colorScheme = {
		domain: ["#28BEBD", "#5867C3", "#42A5F5", "#516073"]
	};

	// pie
	showLabels = true;
	explodeSlices = false;
	doughnut = false;

	constructor() {
		Object.assign(this, { single, multi });
	}

	onSelect(event) {
		console.log(event);
	}
}
