"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const core_1 = require("@angular/core");
let NavDropdownDirective = class NavDropdownDirective {
    constructor(el) {
        this.el = el;
    }
    toggle() {
        this.el.nativeElement.classList.toggle('open');
    }
};
NavDropdownDirective = __decorate([
    core_1.Directive({
        selector: '[appNavDropdown]'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _a : Object])
], NavDropdownDirective);
exports.NavDropdownDirective = NavDropdownDirective;
let NavDropdownToggleDirective = class NavDropdownToggleDirective {
    constructor(dropdown) {
        this.dropdown = dropdown;
    }
    toggleOpen($event) {
        $event.preventDefault();
        this.dropdown.toggle();
    }
};
__decorate([
    core_1.HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NavDropdownToggleDirective.prototype, "toggleOpen", null);
NavDropdownToggleDirective = __decorate([
    core_1.Directive({
        selector: '[appNavDropdownToggle]'
    }),
    __metadata("design:paramtypes", [NavDropdownDirective])
], NavDropdownToggleDirective);
exports.NavDropdownToggleDirective = NavDropdownToggleDirective;
exports.NavDropDownDirectives = [NavDropdownDirective, NavDropdownToggleDirective];
//# sourceMappingURL=nav-dropdown.directive.js.map