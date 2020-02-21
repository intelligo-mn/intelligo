import { Component } from "@angular/core";
import { ChartType } from "../demo/chartist.demo";
import * as Chartist from "chartist";
declare var require: any;
const data: any = require("../demo/data.json");

@Component({
	selector: "chartist-line-chart",
	styleUrls: ["chartist-line.component.scss"],
	template: `
    <x-chartist
      [data]="data"
      [type]="type"
      [options]="options">
    </x-chartist>
  `
})
class ChartistLineComponent {
	type: ChartType;
	data: Chartist.IChartistData;
	options: any;

	chartTypes: ChartType[];

	constructor() {
		this.chartTypes = ["Line"];
		this.type = "Line";
		this.data = data["LineWithArea"];
		this.options = {
			low: 0,
			showArea: true
		};
	}
}

export { ChartistLineComponent };
