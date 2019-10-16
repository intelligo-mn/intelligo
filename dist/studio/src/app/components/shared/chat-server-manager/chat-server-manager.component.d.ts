import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { ChatServerConnection, ChatBotProject } from '../../../models/app.models';
import { SettingsService } from '../../../services/settings.service';
import { ChatFlowService } from '../../../services/chatflow.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { MatSnackBar, MatDialog } from '@angular/material';
export declare class ChatServerManagerComponent implements OnInit {
    settings: SettingsService;
    chatFlowService: ChatFlowService;
    snakbar: MatSnackBar;
    infoDialog: InfoDialogService;
    dialog: MatDialog;
    router: Router;
    dialogRef: MatDialogRef<ChatServerManagerComponent>;
    constructor(settings: SettingsService, chatFlowService: ChatFlowService, snakbar: MatSnackBar, infoDialog: InfoDialogService, dialog: MatDialog, router: Router, dialogRef: MatDialogRef<ChatServerManagerComponent>);
    savedConnections: ChatServerConnection[];
    ngOnInit(): void;
    connectionAlias(conn: ChatServerConnection): string;
    deleteConnection(conn: ChatServerConnection): void;
    addChatProjectToConn(conn: ChatServerConnection): void;
    deleteProject(conn: ChatServerConnection, proj: ChatBotProject): void;
    saveConnections(close: boolean): void;
    addConnection(): void;
    getAnaChatServer(): void;
}
