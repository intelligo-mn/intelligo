import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { DataService } from "../../../services/data.service";
import { GlobalsService } from '../../../services/globals.service';
import { BusinessAccount } from '../../../models/data.models';
export declare class EditBusinessAccountComponent implements OnInit {
    private global;
    private infoDialog;
    private dataService;
    private dialogRef;
    data: BusinessAccount;
    title: string;
    isCreate: boolean;
    constructor(global: GlobalsService, infoDialog: InfoDialogService, dataService: DataService, dialogRef: MatDialogRef<EditBusinessAccountComponent>, data: BusinessAccount);
    ngOnInit(): void;
    account: BusinessAccount;
    primaryBGColor: string;
    primaryFGColor: string;
    secondaryColor: string;
    emailValid(val: string): boolean;
    phoneValid(val: string): boolean;
    pwdMatch(p1: any, p2: any): boolean;
    confirmPassword: string;
    save(): void;
}
