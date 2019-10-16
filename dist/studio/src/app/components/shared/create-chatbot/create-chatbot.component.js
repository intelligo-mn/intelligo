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
const data_service_1 = require("../../../services/data.service");
const globals_service_1 = require("../../../services/globals.service");
const info_dialog_service_1 = require("../../../services/info-dialog.service");
const login_service_1 = require("../../../services/login.service");
const settings_service_1 = require("../../../services/settings.service");
let CreateChatbotComponent = class CreateChatbotComponent {
    constructor(settings, globals, dataService, loginService, dialog, infoDialog, dialogRef, bizDetails) {
        this.settings = settings;
        this.globals = globals;
        this.dataService = dataService;
        this.loginService = loginService;
        this.dialog = dialog;
        this.infoDialog = infoDialog;
        this.dialogRef = dialogRef;
        this.bizDetails = bizDetails;
        this.chatProject = {
            businessId: "",
            id: "",
            name: ""
        };
        if (bizDetails) {
            this.chatProject.businessId = bizDetails.id;
        }
    }
    ngOnInit() {
    }
    create() {
        this.infoDialog.showSpinner();
        this.dataService.createChatProject(this.chatProject).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.dialogRef.close(this.chatProject);
            }
            else {
                this.dataService.handleTypedError(x.error, "Unable to create chatbot project", "Something went wrong while creating the chatbot project. Please try again.");
                this.dialogRef.close();
            }
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to create chatbot project", "Something went wrong while creating the chatbot project. Please try again.");
            this.dialogRef.close();
        });
    }
};
CreateChatbotComponent = __decorate([
    core_1.Component({
        selector: 'app-create-chatbot',
        templateUrl: './create-chatbot.component.html',
        styleUrls: ['./create-chatbot.component.scss']
    }),
    __param(7, core_1.Inject(material_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [settings_service_1.SettingsService,
        globals_service_1.GlobalsService,
        data_service_1.DataService,
        login_service_1.LoginService,
        material_1.MatDialog,
        info_dialog_service_1.InfoDialogService,
        material_1.MatDialogRef, Object])
], CreateChatbotComponent);
exports.CreateChatbotComponent = CreateChatbotComponent;
//# sourceMappingURL=create-chatbot.component.js.map