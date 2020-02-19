import { Component } from "@angular/core";
import { GaugeSegment, GaugeLabel } from "./shared/index";

@Component({
	moduleId: module.id,
	selector: "sales-gauge",
	template: `
	<ng-gauge
	[bgRadius] = progressGraph1.bgRadius
	[bgColor] = progressGraph1.bgColor
	[rounded] = progressGraph1.rounded
	[reverse] = progressGraph1.reverse
	[animationSecs] = progressGraph1.animationSecs
	[labels] = progressGraph1.labels
	[segments] = progressGraph1.segments>
	</ng-gauge>
	`
})
export class salesGaugeComponent {
	colors = {
		pink: "#EC407A",
		grey: "#EEF5F9"
	};
	progressGraph1 = {
		bgRadius: 80,
		bgColor: this.colors.grey,
		rounded: false,
		reverse: false,
		animationSecs: 1,
		labels: [
			new GaugeLabel({
				color: this.colors.pink,
				text: "Complete",
				x: 0,
				y: 20,
				fontSize: "1em"
			}),
			new GaugeLabel({
				color: this.colors.pink,
				text: "80%",
				x: 0,
				y: 0,
				fontSize: "2em"
			})
		],
		segments: [
			new GaugeSegment({
				value: 80,
				color: this.colors.pink,
				borderWidth: 7
			})
		]
	};
}

@Component({
	moduleId: module.id,
	selector: "signup-gauge",
	template: `
	<ng-gauge
	[bgRadius] = progressGraph2.bgRadius
	[bgColor] = progressGraph2.bgColor
	[rounded] = progressGraph2.rounded
	[reverse] = progressGraph2.reverse
	[animationSecs] = progressGraph2.animationSecs
	[labels] = progressGraph2.labels
	[segments] = progressGraph2.segments>
	</ng-gauge>
	`
})
export class signupGaugeComponent {
	colors = {
		blue: "#42A5F5",
		grey: "#EEF5F9"
	};

	progressGraph2 = {
		bgRadius: 80,
		bgColor: this.colors.grey,
		rounded: false,
		reverse: false,
		animationSecs: 1,
		labels: [
			new GaugeLabel({
				color: this.colors.blue,
				text: "Complete",
				x: 0,
				y: 20,
				fontSize: "1em"
			}),
			new GaugeLabel({
				color: this.colors.blue,
				text: "64%",
				x: 0,
				y: 0,
				fontSize: "2em"
			})
		],
		segments: [
			new GaugeSegment({
				value: 64,
				color: this.colors.blue,
				borderWidth: 7
			})
		]
	};
}
