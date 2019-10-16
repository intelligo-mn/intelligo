import { OnInit } from '@angular/core';
import { GlobalsService } from '../../../services/globals.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { MatDialogRef } from '@angular/material';
import { DataService } from '../../../services/data.service';
import { User } from '../../../models/data.models';
export declare class UpdatePasswordComponent implements OnInit {
    private global;
    private infoDialog;
    private dataService;
    private dialogRef;
    user: User;
    constructor(global: GlobalsService, infoDialog: InfoDialogService, dataService: DataService, dialogRef: MatDialogRef<UpdatePasswordComponent>, user: User);
    password: string;
    confirmPassword: string;
    ngOnInit(): void;
    save(): void;
}
