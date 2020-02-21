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
const material_1 = require("@angular/material");
let ConfirmDialogComponent = class ConfirmDialogComponent {
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
    }
    ngOnInit() {
    }
};
ConfirmDialogComponent = __decorate([
    core_1.Component({
        selector: 'confirm',
        templateUrl: './confirm.component.html',
        styleUrls: ['./confirm.component.scss']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof material_1.MatDialogRef !== "undefined" && material_1.MatDialogRef) === "function" ? _a : Object])
], ConfirmDialogComponent);
exports.ConfirmDialogComponent = ConfirmDialogComponent;
//# sourceMappingURL=confirm.component.js.map