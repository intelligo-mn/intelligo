import { AfterViewInit, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from "@angular/router";
import { LoginData } from '../../../models/data.models';
import { DataService } from '../../../services/data.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { LoginService } from '../../../services/login.service';
export declare class AppHeaderBarComponent implements OnInit, AfterViewInit {
    private dataService;
    private dialog;
    private router;
    private infoDialog;
    private loginService;
    goBack: () => void;
    logoutNavigation: string;
    skipAuth: boolean;
    hideBackButton: boolean;
    title: string;
    constructor(dataService: DataService, dialog: MatDialog, router: Router, infoDialog: InfoDialogService, loginService: LoginService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    checkAndUpdate(): void;
    loginDialog(): void;
    logout(): void;
    changePassword(): void;
    loggedInUser: LoginData;
    roles(): string;
    afterInit: () => void;
}
