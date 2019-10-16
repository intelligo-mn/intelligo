import { OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ChatProject } from '../../../models/data.models';
import { DataService } from '../../../services/data.service';
import { GlobalsService } from '../../../services/globals.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { LoginService } from '../../../services/login.service';
import { SettingsService } from '../../../services/settings.service';
export declare class CreateChatbotComponent implements OnInit {
    private settings;
    private globals;
    private dataService;
    private loginService;
    private dialog;
    private infoDialog;
    private dialogRef;
    private bizDetails;
    constructor(settings: SettingsService, globals: GlobalsService, dataService: DataService, loginService: LoginService, dialog: MatDialog, infoDialog: InfoDialogService, dialogRef: MatDialogRef<CreateChatbotComponent>, bizDetails: BusinessDetails);
    ngOnInit(): void;
    chatProject: ChatProject;
    create(): void;
}
export interface BusinessDetails {
    id: string;
    name?: string;
}
