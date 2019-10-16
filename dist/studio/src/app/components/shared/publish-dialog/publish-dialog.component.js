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
const settings_service_1 = require("../../../services/settings.service");
const chatflow_service_1 = require("../../../services/chatflow.service");
const info_dialog_service_1 = require("../../../services/info-dialog.service");
const chat_server_manager_component_1 = require("../chat-server-manager/chat-server-manager.component");
const models = require("../../../models/chatflow.models");
let PublishDialogComponent = class PublishDialogComponent {
    constructor(settings, chatFlowService, dialog, infoDialog, dialogRef, pack) {
        this.settings = settings;
        this.chatFlowService = chatFlowService;
        this.dialog = dialog;
        this.infoDialog = infoDialog;
        this.dialogRef = dialogRef;
        this.pack = pack;
        this.savedConns = [];
        this.chatProjects = [];
        this.loadSavedConns();
    }
    loadSavedConns() {
        this.savedConns = this.settings.loadSavedConnections();
        this.selectedServer = null;
        this.selectedProject = null;
    }
    ngOnInit() {
    }
    publish() {
        this.infoDialog.showSpinner();
        this.chatFlowService.chatProjectExists(this.selectedServer, this.selectedProject).subscribe(x => {
            this.infoDialog.hideSpinner();
            this.infoDialog.confirm("Sure?", `Chat project with id '${this.selectedProject.Id}' already exists. Publishing this will overwrite it. Do you want to proceed?`, (ok) => {
                if (ok)
                    this.doPublish();
            });
        }, err => {
            this.infoDialog.hideSpinner();
            this.doPublish();
        });
    }
    doPublish() {
        this.infoDialog.showSpinner();
        this.chatFlowService.publishProject(this.selectedServer, this.selectedProject, this.pack).subscribe(x => {
            this.infoDialog.hideSpinner();
            this.infoDialog.alert('Done', 'Chatbot published successfully', () => this.dismiss());
        }, err => {
            this.infoDialog.hideSpinner();
            this.infoDialog.alert('Done', 'Oops! Something went wrong while publishing the chat project! Please try again.');
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
    dismiss() {
        this.dialogRef.close();
    }
};
PublishDialogComponent = __decorate([
    core_1.Component({
        selector: 'app-publish-dialog',
        templateUrl: './publish-dialog.component.html',
        styleUrls: ['./publish-dialog.component.scss']
    }),
    __param(5, core_1.Inject(material_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [settings_service_1.SettingsService,
        chatflow_service_1.ChatFlowService,
        material_1.MatDialog,
        info_dialog_service_1.InfoDialogService,
        material_1.MatDialogRef, Object])
], PublishDialogComponent);
exports.PublishDialogComponent = PublishDialogComponent;
//# sourceMappingURL=publish-dialog.component.js.map