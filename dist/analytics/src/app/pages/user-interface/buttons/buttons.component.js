"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let ButtonsComponent = class ButtonsComponent {
    constructor() {
        this.title = "Buttons";
        this._fixed = false;
        this.open = false;
        this.spin = false;
        this.direction = "up";
        this.animationMode = "fling";
    }
    get fixed() {
        return this._fixed;
    }
    set fixed(fixed) {
        this._fixed = fixed;
        if (this._fixed) {
            this.open = true;
        }
    }
    _click(event) {
    }
};
ButtonsComponent = __decorate([
    core_1.Component({
        selector: ".content_inner_wrapper",
        templateUrl: "./buttons.component.html",
        styleUrls: ["./buttons.component.scss"],
        encapsulation: core_1.ViewEncapsulation.Emulated
    })
], ButtonsComponent);
exports.ButtonsComponent = ButtonsComponent;
//# sourceMappingURL=buttons.component.js.map