import { OnInit } from '@angular/core';
import { GlobalsService } from '../../../services/globals.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { MatDialogRef } from '@angular/material';
import { DataService } from '../../../services/data.service';
export declare class ChangePasswordComponent implements OnInit {
    private global;
    private infoDialog;
    private dataService;
    private dialogRef;
    constructor(global: GlobalsService, infoDialog: InfoDialogService, dataService: DataService, dialogRef: MatDialogRef<ChangePasswordComponent>);
    password: string;
    newPassword: string;
    confirmPassword: string;
    ngOnInit(): void;
    save(): void;
}
