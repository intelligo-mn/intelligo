import { AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { BusinessAccount, BusinessAccountStatus } from '../../../models/data.models';
import { DataService } from '../../../services/data.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { AppHeaderBarComponent } from '../../shared/app-header-bar/app-header-bar.component';
export declare class BizAccountsComponent implements AfterViewInit {
    private dataService;
    private dialog;
    private router;
    private infoDialog;
    appHeader: AppHeaderBarComponent;
    ngAfterViewInit(): void;
    constructor(dataService: DataService, dialog: MatDialog, router: Router, infoDialog: InfoDialogService);
    accounts: BusinessAccount[];
    page: number;
    totalPages: number;
    prevPage(): void;
    nextPage(): void;
    search: string;
    searchStart(): void;
    loadAccounts(): void;
    manageUsers(account: BusinessAccount): void;
    editBusinessAccount(data?: BusinessAccount): void;
    BusinessAccountStatus: typeof BusinessAccountStatus;
    updateBusinessAccountStatus(account: BusinessAccount, status: BusinessAccountStatus): void;
}
export declare class CanActivateBizAccountComponent implements CanActivate {
    private dataService;
    constructor(dataService: DataService);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;
}
