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
const info_dialog_service_1 = require("../../../services/info-dialog.service");
const data_service_1 = require("../../../services/data.service");
const globals_service_1 = require("../../../services/globals.service");
let EditBusinessAccountComponent = class EditBusinessAccountComponent {
    constructor(global, infoDialog, dataService, dialogRef, data) {
        this.global = global;
        this.infoDialog = infoDialog;
        this.dataService = dataService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.title = "Create business account";
        this.isCreate = false;
        this.account = {
            colors: [],
            email: "",
            logoUrl: "",
            name: "",
            phone: "",
        };
        this.primaryBGColor = "#5e72e4";
        this.primaryFGColor = "white";
        this.secondaryColor = "#3c3c3c";
        this.dialogRef.disableClose = true;
        if (data) {
            this.account = data;
            this.title = "Edit business account";
        }
        if (!this.account.id) {
            this.account.id = this.global.uuidv4();
            this.isCreate = true;
        }
    }
    ngOnInit() {
    }
    emailValid(val) {
        let r = this.global.emailValid(val);
        return r;
    }
    phoneValid(val) {
        return this.global.phoneValid(val);
    }
    pwdMatch(p1, p2) {
        return this.global.pwdMatch(p1, p2);
    }
    save() {
        if (this.account.email) {
            if (!this.global.emailValid(this.account.email)) {
                this.infoDialog.alert("Invalid email address", "Please enter a valid email address");
                return;
            }
        }
        if (this.account.phone) {
            if (!this.global.phoneValid(this.account.phone)) {
                this.infoDialog.alert("Invalid phone number", "Please enter a valid phone number");
                return;
            }
        }
        this.account.colors = [
            {
                name: "PRIMARY_BG",
                value: this.primaryBGColor
            },
            {
                name: "PRIMARY_FG",
                value: this.primaryFGColor
            },
            {
                name: "SECONDARY",
                value: this.secondaryColor
            }
        ];
        this.infoDialog.showSpinner();
        this.dataService.saveBusinessAccount(this.account, this.isCreate).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.infoDialog.alert("Done", "Business account has been saved successfully", () => {
                    this.dialogRef.close(true);
                });
            }
            else {
                this.dataService.handleTypedError(x.error, "Unable to save business account", "Something went wrong while trying to save business account details");
            }
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to save business account", "Something went wrong while trying to save business account details");
        });
    }
};
EditBusinessAccountComponent = __decorate([
    core_1.Component({
        selector: 'app-edit-business-account',
        templateUrl: './edit-business-account.component.html',
        styleUrls: ['./edit-business-account.component.scss']
    }),
    __param(4, core_1.Optional()),
    __param(4, core_1.Inject(material_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [globals_service_1.GlobalsService,
        info_dialog_service_1.InfoDialogService,
        data_service_1.DataService,
        material_1.MatDialogRef, Object])
], EditBusinessAccountComponent);
exports.EditBusinessAccountComponent = EditBusinessAccountComponent;
//# sourceMappingURL=edit-business-account.component.js.map