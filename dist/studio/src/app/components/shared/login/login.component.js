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
const material_1 = require("@angular/material");
const settings_service_1 = require("../../../services/settings.service");
const chatflow_service_1 = require("../../../services/chatflow.service");
const info_dialog_service_1 = require("../../../services/info-dialog.service");
const chat_server_manager_component_1 = require("../chat-server-manager/chat-server-manager.component");
const data_service_1 = require("../../../services/data.service");
const router_1 = require("@angular/router");
let LoginComponent = class LoginComponent {
    constructor(settings, chatFlowService, dialog, infoDialog, dataService, router, dialogRef) {
        this.settings = settings;
        this.chatFlowService = chatFlowService;
        this.dialog = dialog;
        this.infoDialog = infoDialog;
        this.dataService = dataService;
        this.router = router;
        this.dialogRef = dialogRef;
        this.savedConns = [];
        this.dialogRef.disableClose = true;
        this.loadSavedConns();
    }
    loadSavedConns() {
        this.savedConns = this.settings.loadSavedConnections();
        if (this.savedConns.length == 1)
            this.selectedServer = this.savedConns[0];
        else
            this.selectedServer = null;
    }
    ngOnInit() {
    }
    dismiss() {
        this.dialogRef.close();
    }
    login() {
        this.dataService.loggedInUser = null;
        this.dataService.setConnection(this.selectedServer);
        this.infoDialog.showSpinner();
        this.dataService.login(this.username, this.password).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.dataService.loggedInUser = x.data;
                localStorage.setItem("user", JSON.stringify(x.data));
                this.dialogRef.close(true);
            }
            else
                this.dataService.handleTypedError(x.error, "Oops! Unable to login.", "Something went wrong while trying to login. Please try again.");
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Oops! Unable to login.", "Something went wrong while trying to login. Please try again.");
        });
    }
    managePublishServers() {
        let dialogRef = this.dialog.open(chat_server_manager_component_1.ChatServerManagerComponent, {
            width: '60%',
        });
        dialogRef.afterClosed().subscribe(x => {
            this.loadSavedConns();
        });
    }
};
LoginComponent = __decorate([
    core_1.Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    }),
    __metadata("design:paramtypes", [settings_service_1.SettingsService,
        chatflow_service_1.ChatFlowService,
        material_1.MatDialog,
        info_dialog_service_1.InfoDialogService,
        data_service_1.DataService,
        router_1.Router,
        material_1.MatDialogRef])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map