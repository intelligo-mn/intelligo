"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const index_1 = require("./shared/index");
let salesGaugeComponent = class salesGaugeComponent {
    constructor() {
        this.colors = {
            pink: "#EC407A",
            grey: "#EEF5F9"
        };
        this.progressGraph1 = {
            bgRadius: 80,
            bgColor: this.colors.grey,
            rounded: false,
            reverse: false,
            animationSecs: 1,
            labels: [
                new index_1.GaugeLabel({
                    color: this.colors.pink,
                    text: "Complete",
                    x: 0,
                    y: 20,
                    fontSize: "1em"
                }),
                new index_1.GaugeLabel({
                    color: this.colors.pink,
                    text: "80%",
                    x: 0,
                    y: 0,
                    fontSize: "2em"
                })
            ],
            segments: [
                new index_1.GaugeSegment({
                    value: 80,
                    color: this.colors.pink,
                    borderWidth: 7
                })
            ]
        };
    }
};
salesGaugeComponent = __decorate([
    core_1.Component({
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
], salesGaugeComponent);
exports.salesGaugeComponent = salesGaugeComponent;
let signupGaugeComponent = class signupGaugeComponent {
    constructor() {
        this.colors = {
            blue: "#42A5F5",
            grey: "#EEF5F9"
        };
        this.progressGraph2 = {
            bgRadius: 80,
            bgColor: this.colors.grey,
            rounded: false,
            reverse: false,
            animationSecs: 1,
            labels: [
                new index_1.GaugeLabel({
                    color: this.colors.blue,
                    text: "Complete",
                    x: 0,
                    y: 20,
                    fontSize: "1em"
                }),
                new index_1.GaugeLabel({
                    color: this.colors.blue,
                    text: "64%",
                    x: 0,
                    y: 0,
                    fontSize: "2em"
                })
            ],
            segments: [
                new index_1.GaugeSegment({
                    value: 64,
                    color: this.colors.blue,
                    borderWidth: 7
                })
            ]
        };
    }
};
signupGaugeComponent = __decorate([
    core_1.Component({
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
], signupGaugeComponent);
exports.signupGaugeComponent = signupGaugeComponent;
//# sourceMappingURL=ng-gauge.component.js.map