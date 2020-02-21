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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const material_1 = require("@angular/material");
let InfoDialogComponent = class InfoDialogComponent {
    constructor(dialogRef, options) {
        this.dialogRef = dialogRef;
        this.options = options;
        this.InfoDialogType = InfoDialogType;
        this.dialogRef.disableClose = true;
        if (!options) {
            options = {
                dialogType: InfoDialogType.Alert,
                title: 'Title',
                message: 'Message'
            };
        }
        switch (options.dialogType) {
            case InfoDialogType.Confirm:
                {
                    this.primaryButtonText = "OK";
                    this.secondaryButtonText = "Cancel";
                }
                break;
            case InfoDialogType.Prompt:
                {
                    this.inputText = options.defaultInputText;
                    this.primaryButtonText = "Done";
                    this.secondaryButtonText = "Cancel";
                }
                break;
            case InfoDialogType.Alert:
            default:
                {
                    this.secondaryButtonText = "Close";
                }
                break;
        }
    }
    ngOnInit() {
    }
    inputKeypress(event) {
        if (event.keyCode == 13) {
            this.primaryClick();
        }
    }
    primaryClick() {
        switch (this.options.dialogType) {
            case InfoDialogType.Confirm:
                this.dialogRef.close(true);
                break;
            case InfoDialogType.Prompt:
                this.dialogRef.close(this.inputText);
                break;
            case InfoDialogType.Alert:
            default:
                this.dialogRef.close();
                break;
        }
    }
};
InfoDialogComponent = __decorate([
    core_1.Component({
        selector: 'app-info-dialog',
        templateUrl: './info-dialog.component.html',
        styleUrls: ['./info-dialog.component.css']
    }),
    __param(1, core_1.Inject(material_1.MD_DIALOG_DATA)),
    __metadata("design:paramtypes", [material_1.MdDialogRef, Object])
], InfoDialogComponent);
exports.InfoDialogComponent = InfoDialogComponent;
var InfoDialogType;
(function (InfoDialogType) {
    InfoDialogType[InfoDialogType["Prompt"] = 0] = "Prompt";
    InfoDialogType[InfoDialogType["Alert"] = 1] = "Alert";
    InfoDialogType[InfoDialogType["Confirm"] = 2] = "Confirm";
})(InfoDialogType = exports.InfoDialogType || (exports.InfoDialogType = {}));
//# sourceMappingURL=info-dialog.component.js.map