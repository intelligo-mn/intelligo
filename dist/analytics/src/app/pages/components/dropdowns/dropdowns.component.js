"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let DropdownsComponent = class DropdownsComponent {
    constructor() {
        this.items = [
            "The first choice!",
            "And another choice for you.",
            "but wait! A third!"
        ];
        this.status = { isopen: false };
    }
    onHidden() {
    }
    onShown() {
    }
    isOpenChange() {
    }
    toggleDropdown($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }
};
DropdownsComponent = __decorate([
    core_1.Component({
        selector: ".content_inner_wrapper",
        templateUrl: "./dropdowns.component.html",
        styleUrls: ["./dropdowns.component.scss"]
    })
], DropdownsComponent);
exports.DropdownsComponent = DropdownsComponent;
//# sourceMappingURL=dropdowns.component.js.map