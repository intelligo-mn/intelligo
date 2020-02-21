"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let TooltipsPopoversComponent = class TooltipsPopoversComponent {
    constructor() {
        this.position = "below";
        this.message = "Here is the tooltip";
        this.disabled = false;
        this.showDelay = 0;
        this.hideDelay = 1000;
        this.showExtraClass = false;
    }
};
TooltipsPopoversComponent = __decorate([
    core_1.Component({
        selector: ".content_inner_wrapper",
        templateUrl: "./tooltips-popovers.component.html",
        styleUrls: ["./tooltips-popovers.component.scss"]
    })
], TooltipsPopoversComponent);
exports.TooltipsPopoversComponent = TooltipsPopoversComponent;
//# sourceMappingURL=tooltips-popovers.component.js.map