import { OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ChatServerConnection } from '../../../models/app.models';
import { SettingsService } from '../../../services/settings.service';
import { ChatFlowService } from '../../../services/chatflow.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { DataService } from "../../../services/data.service";
import { Router } from "@angular/router";
export declare class LoginComponent implements OnInit {
    private settings;
    private chatFlowService;
    private dialog;
    private infoDialog;
    private dataService;
    private router;
    private dialogRef;
    constructor(settings: SettingsService, chatFlowService: ChatFlowService, dialog: MatDialog, infoDialog: InfoDialogService, dataService: DataService, router: Router, dialogRef: MatDialogRef<LoginComponent>);
    loadSavedConns(): void;
    savedConns: ChatServerConnection[];
    selectedServer: ChatServerConnection;
    username: string;
    password: string;
    ngOnInit(): void;
    dismiss(): void;
    login(): void;
    managePublishServers(): void;
}
