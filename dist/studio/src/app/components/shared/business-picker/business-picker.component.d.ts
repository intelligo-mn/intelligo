import { OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { MatDialogRef, MatAutocompleteSelectedEvent } from '@angular/material';
import { BusinessAccount, ChatProject } from '../../../models/data.models';
import { AnalyticsWindowService } from '../../../services/analytics-window.service';
import { Router } from '@angular/router';
export declare class BusinessPickerComponent implements OnInit {
    private dataService;
    private infoDialog;
    private router;
    private analyticsWindow;
    private dialogRef;
    param: BusinessPickerParam;
    constructor(dataService: DataService, infoDialog: InfoDialogService, router: Router, analyticsWindow: AnalyticsWindowService, dialogRef: MatDialogRef<BusinessPickerComponent>, param: BusinessPickerParam);
    title: string;
    ngOnInit(): void;
    init(): void;
    selectedBusinessAccount: BusinessAccount;
    businessAccounts: BusinessAccount[];
    bizOptionSelected(event: MatAutocompleteSelectedEvent): void;
    bizDisplayWith(value: any): any;
    bizFilter: string | BusinessAccount;
    bizFilteredOptions(): BusinessAccount[];
    chatProjects: ChatProject[];
    selectedChatProject: ChatProject;
    projOptionSelected(event: MatAutocompleteSelectedEvent): void;
    projDisplayWith(value: any): any;
    projFilter: string | ChatProject;
    projFilteredOptions(): ChatProject[];
    loadChatProjects(): boolean;
    submit(): void;
    valid(): BusinessAccount | ChatProject;
    readonly chatConnName: string;
}
export interface ChoosenBizAccChatProj {
    bizAccount: BusinessAccount;
    chatProj: ChatProject;
}
export interface BusinessPickerParam {
    askFlowId: boolean;
    businessId?: string;
    flowId?: string;
}
