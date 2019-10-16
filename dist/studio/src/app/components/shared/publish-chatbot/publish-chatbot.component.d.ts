import { OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatDialog, MatDialogRef, MatFormField } from '@angular/material';
import * as models from '../../../models/chatflow.models';
import { ChatProject } from '../../../models/data.models';
import { DataService } from '../../../services/data.service';
import { GlobalsService } from '../../../services/globals.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { LoginService } from '../../../services/login.service';
import { SettingsService } from '../../../services/settings.service';
export declare class PublishChatbotComponent implements OnInit {
    private settings;
    private globals;
    private dataService;
    private loginService;
    private dialog;
    private infoDialog;
    private dialogRef;
    private params;
    constructor(settings: SettingsService, globals: GlobalsService, dataService: DataService, loginService: LoginService, dialog: MatDialog, infoDialog: InfoDialogService, dialogRef: MatDialogRef<PublishChatbotComponent>, params: PublishChatbotParams);
    chatProjectFormField: MatFormField;
    chatProjects: ChatProject[];
    pack: models.ChatFlowPack;
    businessId: string;
    ngOnInit(): void;
    newChatProject: ChatProject;
    canPublish(): boolean;
    createAndPublish(): void;
    loadChatProjects(): void;
    doPublish(): void;
    dismiss(): void;
    selectedProject: ChatProject;
    optionSelected(event: MatAutocompleteSelectedEvent): void;
    displayWith(value: any): any;
    filter: string | ChatProject;
    filteredOptions(): ChatProject[];
    readonly chatConnName: string;
}
export interface PublishChatbotParams {
    pack: models.ChatFlowPack;
    bizId: string;
}
