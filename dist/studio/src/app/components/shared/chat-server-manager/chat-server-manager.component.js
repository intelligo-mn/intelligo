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
const router_1 = require("@angular/router");
const material_1 = require("@angular/material");
const settings_service_1 = require("../../../services/settings.service");
const chatflow_service_1 = require("../../../services/chatflow.service");
const info_dialog_service_1 = require("../../../services/info-dialog.service");
const material_2 = require("@angular/material");
const get_ana_chat_server_component_1 = require("../get-ana-chat-server/get-ana-chat-server.component");
let ChatServerManagerComponent = class ChatServerManagerComponent {
    constructor(settings, chatFlowService, snakbar, infoDialog, dialog, router, dialogRef) {
        this.settings = settings;
        this.chatFlowService = chatFlowService;
        this.snakbar = snakbar;
        this.infoDialog = infoDialog;
        this.dialog = dialog;
        this.router = router;
        this.dialogRef = dialogRef;
        this.savedConnections = [];
        this.savedConnections = this.settings.loadSavedConnections();
    }
    ngOnInit() {
    }
    connectionAlias(conn) {
        return conn.Name || conn.ServerUrl || 'New Chatbots.mn chat server';
    }
    deleteConnection(conn) {
        var current = this.savedConnections.indexOf(conn);
        if (current != -1) {
            this.infoDialog.confirm("Sure?", `Delete chat server connection '${this.connectionAlias(conn)}'`, (ok) => {
                if (ok) {
                    this.savedConnections.splice(current, 1);
                    this.saveConnections(false);
                }
            });
        }
    }
    addChatProjectToConn(conn) {
        if (!conn.ChatProjects)
            conn.ChatProjects = [];
        conn.ChatProjects.push({
            CreatedOn: new Date(),
            Id: 'new-chat-project',
            Name: 'New Chat Project',
            UpdatedOn: new Date()
        });
    }
    deleteProject(conn, proj) {
        var current = conn.ChatProjects.indexOf(proj);
        if (current != -1) {
            this.infoDialog.confirm("Sure?", `Delete chat project '${proj.Name}'`, (ok) => {
                if (ok) {
                    conn.ChatProjects.splice(current, 1);
                    this.saveConnections(false);
                }
            });
        }
    }
    saveConnections(close) {
        if (this.savedConnections && this.savedConnections.length > 0) {
            let invalidPublishServers = this.savedConnections.filter(x => !x.ServerUrl || !x.Name);
            if (invalidPublishServers.length > 0) {
                this.infoDialog.alert('Incomplete Details', `One or more of your Chatbots.mn chat servers have Server Url or Name. Please fill them and try again.`);
                return;
            }
            try {
                let emptyChatProjects = this.savedConnections.filter(x => !x.ChatProjects || x.ChatProjects.length <= 0);
                if (emptyChatProjects.length != this.savedConnections.length) {
                    let invalidChatProjects = this.savedConnections.filter(x => x.ChatProjects && x.ChatProjects.length > 0).map(x => x.ChatProjects).reduce((a, b) => a.concat(b)).filter(x => !x.Id || !x.Name);
                    if ((emptyChatProjects.length > 0 && invalidChatProjects.length > 0)) {
                        this.infoDialog.alert('Incomplete Details', `One or more of the chat projects in your chat server connections is incomplete. Please fill them and try again.`);
                        return;
                    }
                }
            }
            catch (e) {
                console.log(e);
                this.infoDialog.alert('Incomplete Details', `One or more of the chat projects in your chat server connections is incomplete. Please fill them and try again.`);
                return;
            }
        }
        this.settings.saveSavedConnections(this.savedConnections);
        this.snakbar.open('Chatbots.mn chat servers saved!', 'Dismiss', {
            duration: 3000
        });
        if (close) {
            this.dialogRef.close();
        }
    }
    addConnection() {
        let newConn = {
            APIKey: '',
            APISecret: '',
            IsDefault: false,
            Name: '',
            ServerUrl: '',
            ChatProjects: []
        };
        this.savedConnections.push(newConn);
    }
    getAnaChatServer() {
        this.dialog.open(get_ana_chat_server_component_1.GetAnaChatServerComponent, {
            width: 'auto',
            disableClose: true
        });
    }
};
ChatServerManagerComponent = __decorate([
    core_1.Component({
        selector: 'app-chat-server-manager',
        templateUrl: './chat-server-manager.component.html',
        styleUrls: ['./chat-server-manager.component.scss'],
    }),
    __metadata("design:paramtypes", [settings_service_1.SettingsService,
        chatflow_service_1.ChatFlowService,
        material_2.MatSnackBar,
        info_dialog_service_1.InfoDialogService,
        material_2.MatDialog,
        router_1.Router,
        material_1.MatDialogRef])
], ChatServerManagerComponent);
exports.ChatServerManagerComponent = ChatServerManagerComponent;
//# sourceMappingURL=chat-server-manager.component.js.map