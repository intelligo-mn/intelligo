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
const globals_service_1 = require("../../../services/globals.service");
const info_dialog_service_1 = require("../../../services/info-dialog.service");
const material_1 = require("@angular/material");
const data_service_1 = require("../../../services/data.service");
let UpdatePasswordComponent = class UpdatePasswordComponent {
    constructor(global, infoDialog, dataService, dialogRef, user) {
        this.global = global;
        this.infoDialog = infoDialog;
        this.dataService = dataService;
        this.dialogRef = dialogRef;
        this.user = user;
    }
    ngOnInit() {
    }
    save() {
        if (!this.global.pwdMatch(this.password, this.confirmPassword)) {
            this.infoDialog.alert("Passwords do not match or not secure", "Please ensure the password and confirm password is same. Also, a password must be at least 6 characters.");
            return;
        }
        this.infoDialog.showSpinner();
        this.dataService.updatePassword(this.user.id, this.password).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.infoDialog.alert("Password updated", "Password has been updated successfully", () => {
                    this.dialogRef.close();
                });
            }
            else {
                this.dataService.handleTypedError(x.error, "Unable to update password", "Something went wrong while trying to update the password.");
            }
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to update password", "Something went wrong while trying to update the password.");
        });
    }
};
UpdatePasswordComponent = __decorate([
    core_1.Component({
        selector: 'app-update-password',
        templateUrl: './update-password.component.html',
        styleUrls: ['./update-password.component.scss']
    }),
    __param(4, core_1.Optional()),
    __param(4, core_1.Inject(material_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [globals_service_1.GlobalsService,
        info_dialog_service_1.InfoDialogService,
        data_service_1.DataService,
        material_1.MatDialogRef, Object])
], UpdatePasswordComponent);
exports.UpdatePasswordComponent = UpdatePasswordComponent;
//# sourceMappingURL=update-password.component.js.map