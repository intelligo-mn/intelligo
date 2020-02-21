import { OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataService } from 'app/shared/services/data/data.service';
export declare class BasicDetailsComponent implements OnInit {
    private dataService;
    private dialog;
    private dialogRef;
    param: any;
    constructor(dataService: DataService, dialog: MatDialog, dialogRef: MatDialogRef<BasicDetailsComponent>, param: any);
    ngOnInit(): void;
    details: BasicDetails;
    error: string;
    done(): void;
}
export interface BasicDetails {
    apiBase: string;
    businessId: string;
    businessName: string;
}
