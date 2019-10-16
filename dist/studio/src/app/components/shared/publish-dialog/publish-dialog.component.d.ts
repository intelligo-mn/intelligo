import { OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ChatBotProject, ChatServerConnection } from '../../../models/app.models';
import { SettingsService } from '../../../services/settings.service';
import { ChatFlowService } from '../../../services/chatflow.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import * as models from '../../../models/chatflow.models';
export declare class PublishDialogComponent implements OnInit {
    private settings;
    private chatFlowService;
    private dialog;
    private infoDialog;
    private dialogRef;
    private pack;
    constructor(settings: SettingsService, chatFlowService: ChatFlowService, dialog: MatDialog, infoDialog: InfoDialogService, dialogRef: MatDialogRef<PublishDialogComponent>, pack: models.ChatFlowPack);
    loadSavedConns(): void;
    savedConns: ChatServerConnection[];
    chatProjects: ChatBotProject[];
    selectedServer: ChatServerConnection;
    selectedProject: ChatBotProject;
    ngOnInit(): void;
    publish(): void;
    private doPublish;
    managePublishServers(): void;
    dismiss(): void;
}
