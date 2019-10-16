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
const data_service_1 = require("../../../services/data.service");
const material_1 = require("@angular/material");
let CreateUserComponent = class CreateUserComponent {
    constructor(global, infoDialog, dataService, dialogRef, param) {
        this.global = global;
        this.infoDialog = infoDialog;
        this.dataService = dataService;
        this.dialogRef = dialogRef;
        this.param = param;
        this.title = "";
        this.UserDialogMode = UserDialogMode;
        if (param.mode == UserDialogMode.Create) {
            this.title = "Create User";
            this.user = {
                businessId: param.bizId,
                email: "",
                name: "",
                phone: "",
                password: "",
                roleIds: []
            };
        }
        else if (param.mode == UserDialogMode.View) {
            this.title = "User Details";
            this.user = {
                businessId: param.bizId,
                email: param.user.email || param.user.userName,
                name: param.user.name || param.user.userName,
                phone: param.user.phone,
                password: "",
                roleIds: []
            };
        }
        this.loadRoles();
    }
    ngOnInit() {
    }
    userRoleDisplay() {
        if (this.param.user && this.param.user.roles) {
            return this.param.user.roles.map(x => x.label).join(', ');
        }
        return "";
    }
    loadRoles() {
        this.dataService.getRoles().subscribe(x => {
            this.roles = x.data.filter(x => ["SUPER_ADMIN", "END_USER"].indexOf(x.role) == -1);
        });
    }
    save() {
        if (!this.global.emailValid(this.user.email)) {
            this.infoDialog.alert("Invalid Email", "Please enter a valid email address");
            return;
        }
        if (!this.global.phoneValid(this.user.phone)) {
            this.infoDialog.alert("Invalid Phone Number", "Please enter a valid phone number");
            return;
        }
        if (!this.global.pwdMatch(this.user.password, this.confirmPassword)) {
            this.infoDialog.alert("Passwords do not match or not secure", "Please ensure the password and confirm password is same. Also, a password must be at least 6 characters.");
            return;
        }
        if (!this.selectedRole) {
            this.infoDialog.alert("Role not selected", "Please select a role for the user");
            return;
        }
        this.user.roleIds = [this.selectedRole.id];
        this.infoDialog.showSpinner();
        debugger;
        this.dataService.createUser(this.user).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.infoDialog.alert("User created", "The user has been created successfully", () => {
                    this.dialogRef.close(true);
                });
            }
            else {
                this.dataService.handleTypedError(x.error, "Unable to create the user", "Something went wrong while trying to create the user. Please try again in some time.");
            }
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to create the user", "Something went wrong while trying to create the user. Please try again in some time.");
        });
    }
};
CreateUserComponent = __decorate([
    core_1.Component({
        selector: 'app-create-user',
        templateUrl: './create-user.component.html',
        styleUrls: ['./create-user.component.scss']
    }),
    __param(4, core_1.Optional()),
    __param(4, core_1.Inject(material_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [globals_service_1.GlobalsService,
        info_dialog_service_1.InfoDialogService,
        data_service_1.DataService,
        material_1.MatDialogRef, Object])
], CreateUserComponent);
exports.CreateUserComponent = CreateUserComponent;
var UserDialogMode;
(function (UserDialogMode) {
    UserDialogMode[UserDialogMode["View"] = 0] = "View";
    UserDialogMode[UserDialogMode["Create"] = 1] = "Create";
})(UserDialogMode = exports.UserDialogMode || (exports.UserDialogMode = {}));
//# sourceMappingURL=create-user.component.js.map