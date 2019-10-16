import { OnInit } from '@angular/core';
import { UserRegisterModel, Role, User } from '../../../models/data.models';
import { GlobalsService } from '../../../services/globals.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { DataService } from '../../../services/data.service';
import { MatDialogRef } from '@angular/material';
export declare class CreateUserComponent implements OnInit {
    private global;
    private infoDialog;
    private dataService;
    private dialogRef;
    param: UserDialogParam;
    title: string;
    constructor(global: GlobalsService, infoDialog: InfoDialogService, dataService: DataService, dialogRef: MatDialogRef<CreateUserComponent>, param: UserDialogParam);
    UserDialogMode: typeof UserDialogMode;
    ngOnInit(): void;
    confirmPassword: string;
    selectedRole: Role;
    userRoleDisplay(): string;
    user: UserRegisterModel;
    roles: Role[];
    loadRoles(): void;
    save(): void;
}
export declare enum UserDialogMode {
    View = 0,
    Create = 1
}
export interface UserDialogParam {
    mode: UserDialogMode;
    bizId?: string;
    user: User;
}
