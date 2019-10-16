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
const data_service_1 = require("../../../services/data.service");
const globals_service_1 = require("../../../services/globals.service");
const info_dialog_service_1 = require("../../../services/info-dialog.service");
const core_2 = require("@ngx-translate/core");
let AnaCloudSignupComponent = class AnaCloudSignupComponent {
    constructor(global, data, infoDialog, translate) {
        this.global = global;
        this.data = data;
        this.infoDialog = infoDialog;
        this.translate = translate;
        this.details = {
            companyName: "",
            confirmPassword: "",
            displayName: "",
            email: "",
            password: "",
            phone: ""
        };
    }
    allValid() {
        let d = this.details;
        if (!d || !d.companyName || !d.displayName) {
            this.errorMessage = this.translate.instant('cloud-signup.please-fill');
            return false;
        }
        if (!d.email || !this.global.emailValid(d.email)) {
            this.errorMessage = "Please enter a valid email address. Verification email will be sent to it.";
            return false;
        }
        if (!d.phone || !this.global.phoneValid(d.phone)) {
            this.errorMessage = "Please enter a valid phone number.";
            return false;
        }
        if (!d.password || d.password.length < 6) {
            this.errorMessage = "Minimum length of the password is 6 characters.";
            return false;
        }
        if (d.password != d.confirmPassword) {
            this.errorMessage = "Password and confirm password do not match.";
            return false;
        }
        this.errorMessage = null;
        return true;
    }
    ngOnInit() {
    }
    create() {
        if (this.allValid()) {
            this.infoDialog.showSpinner();
            this.data.getRoles().subscribe(x => {
                let roles = x.data.filter(x => ["BUSINESS_ADMIN"].indexOf(x.role) != -1);
                if (roles && roles.length > 0) {
                    let roleId = roles[0].id;
                    this.data.registerOnAnaCloud({
                        business: {
                            email: this.details.email,
                            phone: this.details.phone,
                            name: this.details.companyName + " - " + this.details.displayName,
                        },
                        user: {
                            email: this.details.email,
                            phone: this.details.phone,
                            name: this.details.displayName,
                            password: this.details.password,
                            roleIds: [roleId]
                        }
                    }).subscribe(x => {
                        this.infoDialog.hideSpinner();
                        if (x.data) {
                        }
                        else {
                            this.data.handleTypedError(x.error, "Unable to register", "Something went wrong while trying to register. Please try again.");
                        }
                    }, err => {
                        this.infoDialog.hideSpinner();
                        this.data.handleError(err, "Unable to register", "Something went wrong while trying to register. Please try again.");
                    });
                }
            }, err => {
                this.infoDialog.hideSpinner();
                this.data.handleError(err, "Unable to register", "Something went wrong while trying to register. Please try again.");
            });
        }
        else {
            this.infoDialog.alert("Invalid Details", this.errorMessage);
        }
    }
};
AnaCloudSignupComponent = __decorate([
    core_1.Component({
        selector: 'app-ana-cloud-signup',
        templateUrl: './ana-cloud-signup.component.html',
        styleUrls: ['./ana-cloud-signup.component.scss']
    }),
    __metadata("design:paramtypes", [globals_service_1.GlobalsService,
        data_service_1.DataService,
        info_dialog_service_1.InfoDialogService,
        core_2.TranslateService])
], AnaCloudSignupComponent);
exports.AnaCloudSignupComponent = AnaCloudSignupComponent;
//# sourceMappingURL=ana-cloud-signup.component.js.map