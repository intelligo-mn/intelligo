import { Component } from "@angular/core";
import { ChartType } from "../demo/chartist.demo";
import * as Chartist from "chartist";
declare var require: any;
const data: any = require("../demo/data.json");

@Component({
	selector: "chartist-bars-chart",
	styleUrls: ["chartist-bars.component.scss"],
	template: `
    <x-chartist
      [data]="data"
      [type]="type"
      [options]="options">
    </x-chartist>
  `
})
class ChartistBarsComponent {
	type: ChartType;
	data: Chartist.IChartistData;
	options: any;

	chartTypes: ChartType[];

	constructor() {
		this.chartTypes = ["Bar"];
		this.type = "Bar";
		this.data = data["Bar"];
		this.options = {
			stackBars: true,
			axisY: {
				labelInterpolationFnc: function(value) {
					return value / 1000 + "k";
				}
			}
		};
	}
}

export { ChartistBarsComponent };
