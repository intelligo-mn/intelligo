import { Component } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
// import { single } from "./data";

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
  `,
	inputs: ['single']
})
export class NgxChartsBarVerticalDemoComponent implements OnInit {
	ngOnInit(): void {
		console.log(this.single);
	}
	public single: any[];
	multi: any[];

	view: any[] = [700, 400];

	// options
	showXAxis = true;
	showYAxis = true;
	showLegend = true;
	showXAxisLabel = true;
	xAxisLabel = "Node Names";
	showYAxisLabel = true;
	//yAxisLabel = "Population";

	colorScheme = {
		domain: ["#28BEBD", "#5867C3", "#42A5F5", "#516073"]
	};

	constructor() {

		console.log(this.single);
		// Object.assign(this, { single });
	}

	onSelect(event) {
		console.log(event);
	}
}
