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
let PublishChatbotComponent = class PublishChatbotComponent {
    constructor(settings, globals, dataService, loginService, dialog, infoDialog, dialogRef, params) {
        this.settings = settings;
        this.globals = globals;
        this.dataService = dataService;
        this.loginService = loginService;
        this.dialog = dialog;
        this.infoDialog = infoDialog;
        this.dialogRef = dialogRef;
        this.params = params;
        this.chatProjects = [];
        this.newChatProject = {
            businessId: "",
            id: null,
            name: null
        };
        this.filter = "";
        this.pack = params.pack;
        this.businessId = params.bizId;
        this.loadChatProjects();
    }
    ngOnInit() {
    }
    canPublish() {
        if (this.selectedProject) {
            return true;
        }
        if (this.newChatProject && this.newChatProject.id && this.newChatProject.name) {
            return true;
        }
        return false;
    }
    createAndPublish() {
        if (!this.newChatProject || !this.newChatProject.id || !this.newChatProject.name) {
            return;
        }
        this.infoDialog.showSpinner();
        this.newChatProject.businessId = this.businessId;
        this.dataService.createChatProject(this.newChatProject).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.selectedProject = this.newChatProject;
                this.doPublish();
            }
            else {
                this.dataService.handleTypedError(x.error, "Unable to create chatbot project", "Something went wrong while creating the chatbot project. Please try again.");
            }
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to create chatbot project", "Something went wrong while creating the chatbot project. Please try again.");
        });
    }
    loadChatProjects() {
        let bizId = this.businessId;
        this.infoDialog.showSpinner();
        this.dataService.getChatProjects(bizId, 0, 10000).subscribe(x => {
            this.infoDialog.hideSpinner();
            if (x.success) {
                this.chatProjects = x.data.content;
            }
            else {
                this.dataService.handleTypedError(x.error, "Unable to fetch chat projects", "Something went wrong while trying to fetch chat projects. Please try again.");
            }
        }, err => {
            this.infoDialog.hideSpinner();
            this.dataService.handleError(err, "Unable to fetch chat projects", "Something went wrong while trying to fetch chat projects. Please try again.");
        });
    }
    doPublish() {
        if (!this.selectedProject) {
            if (this.newChatProject.id && this.newChatProject.name) {
                this.createAndPublish();
            }
            return;
        }
        this.infoDialog.confirm(`Publish chatbot to '${this.selectedProject.name}'?`, `Are you sure you want to publish this chatbot to ${this.selectedProject.name}?`, (ok) => {
            if (ok) {
                this.infoDialog.showSpinner();
                this.selectedProject.source = this.pack;
                this.selectedProject.flow = this.globals.normalizeChatNodes(this.pack.ChatNodes);
                this.dataService.saveChatProject(this.selectedProject).subscribe(x => {
                    this.infoDialog.hideSpinner();
                    if (x.success) {
                        this.infoDialog.alert('Done', 'Chatbot published successfully', () => this.dismiss());
                    }
                    else {
                        this.dataService.handleTypedError(x.error, "Oops!", "Something went wrong while publishing the chat project! Please try again.");
                    }
                }, err => {
                    this.infoDialog.hideSpinner();
                    this.dataService.handleError(err, "Oops!", "Something went wrong while publishing the chat project! Please try again.");
                });
            }
        });
    }
    dismiss() {
        this.dialogRef.close();
    }
    optionSelected(event) {
        if (event.option && event.option.value) {
            this.selectedProject = event.option.value;
        }
    }
    displayWith(value) {
        return value ? value.name : null;
    }
    filteredOptions() {
        if (typeof this.filter === 'string') {
            if (this.filter) {
                return this.chatProjects.filter(x => x.name.toLowerCase().indexOf(this.filter.toLowerCase()) != -1);
            }
            return this.chatProjects;
        }
    }
    get chatConnName() {
        return this.dataService.chatServer.Name;
    }
};
__decorate([
    core_1.ViewChild("chatProjectFormField", { static: false }),
    __metadata("design:type", material_1.MatFormField)
], PublishChatbotComponent.prototype, "chatProjectFormField", void 0);
PublishChatbotComponent = __decorate([
    core_1.Component({
        selector: 'app-publish-chatbot',
        templateUrl: './publish-chatbot.component.html',
        styleUrls: ['./publish-chatbot.component.scss']
    }),
    __param(7, core_1.Inject(material_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [settings_service_1.SettingsService,
        globals_service_1.GlobalsService,
        data_service_1.DataService,
        login_service_1.LoginService,
        material_1.MatDialog,
        info_dialog_service_1.InfoDialogService,
        material_1.MatDialogRef, Object])
], PublishChatbotComponent);
exports.PublishChatbotComponent = PublishChatbotComponent;
//# sourceMappingURL=publish-chatbot.component.js.map