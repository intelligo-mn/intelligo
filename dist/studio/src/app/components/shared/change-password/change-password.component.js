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
const core_1 = require("@angular/core");
const globals_service_1 = require("../../../services/globals.service");
const info_dialog_service_1 = require("../../../services/info-dialog.service");
const material_1 = require("@angular/material");
const data_service_1 = require("../../../services/data.service");
let ChangePasswordComponent = class ChangePasswordComponent {
    constructor(global, infoDialog, dataService, dialogRef) {
        this.global = global;
        this.infoDialog = infoDialog;
        this.dataService = dataService;
        this.dialogRef = dialogRef;
    }
    ngOnInit() {
    }
    save() {
        if (!this.global.pwdMatch(this.newPassword, this.confirmPassword)) {
            this.infoDialog.alert("Passwords do not match or not secure", "Please ensure the password and confirm password is same. Also, a password must be at least 6 characters.");
            return;
        }
        this.infoDialog.showSpinner();
        this.dataService.changeCurrentUserPassword(this.password, this.newPassword).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.infoDialog.alert("Password changed", "Password has been changed successfully", () => {
                    this.dialogRef.close();
                });
            }
            else {
                this.dataService.handleTypedError(x.error, "Unable to change password", "Something went wrong while trying to change the password.");
            }
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to change password", "Something went wrong while trying to change the password.");
        });
    }
};
ChangePasswordComponent = __decorate([
    core_1.Component({
        selector: 'app-change-password',
        templateUrl: './change-password.component.html',
        styleUrls: ['./change-password.component.scss'],
    }),
    __metadata("design:paramtypes", [globals_service_1.GlobalsService,
        info_dialog_service_1.InfoDialogService,
        data_service_1.DataService,
        material_1.MatDialogRef])
], ChangePasswordComponent);
exports.ChangePasswordComponent = ChangePasswordComponent;
//# sourceMappingURL=change-password.component.js.map