import { AfterViewInit, Component, Injectable, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { BusinessAccount, BusinessAccountStatus } from '../../../models/data.models';
import { DataService } from '../../../services/data.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { AppHeaderBarComponent } from '../../shared/app-header-bar/app-header-bar.component';
import { EditBusinessAccountComponent } from '../../shared/edit-business-account/edit-business-account.component';

@Component({
	selector: 'app-biz-accounts',
	templateUrl: './biz-accounts.component.html',
	styleUrls: ['./biz-accounts.component.scss']
})
export class BizAccountsComponent implements AfterViewInit {

	@ViewChild('appHeader')
	appHeader: AppHeaderBarComponent;

	ngAfterViewInit(): void {
		this.appHeader.afterInit = () => {
			this.loadAccounts();
		};
	}

	constructor(
		private dataService: DataService,
		private dialog: MatDialog,
		private router: Router,
		private infoDialog: InfoDialogService) { }

	accounts: BusinessAccount[];
	page: number = 0;
	totalPages: number = 0;

	prevPage() {
		if (this.page > 0) {
			this.page--;
			this.loadAccounts();
		}
	}

	nextPage() {
		if (this.page < this.totalPages) {
			this.page++;
			this.loadAccounts();
		}
	}
	search: string = "";

	searchStart() {
		this.page = 0;
		this.loadAccounts();
	}

	loadAccounts() {
		this.infoDialog.showSpinner();

		this.dataService.getBusinessAccounts(this.search, this.page).subscribe(x => {
			this.infoDialog.hideSpinner();
			if (x.success) {
				this.accounts = x.data.content;
				this.totalPages = x.data.totalPages;
			} else
				this.dataService.handleTypedError(x.error, "Unable to load business accounts", "Something went wrong while loading business accounts. Please try again.");
		}, err => {
			this.infoDialog.hideSpinner();
			this.dataService.handleError(err, "Unable to load business accounts", "Something went wrong while loading business accounts. Please try again.");
		});
	}

	manageUsers(account: BusinessAccount) {
		this.router.navigateByUrl(`/manage-users/users?bizId=${account.id}`);
	}

	editBusinessAccount(data?: BusinessAccount) {
		let d = this.dialog.open(EditBusinessAccountComponent, {
			width: '40%',
			data: data
		});
		d.afterClosed().subscribe(x => {
			if (x == true) {
				this.loadAccounts();
			}
		});
	}

	BusinessAccountStatus = BusinessAccountStatus;
	updateBusinessAccountStatus(account: BusinessAccount, status: BusinessAccountStatus) {
		let work = (status == BusinessAccountStatus.ACTIVE ? "activate" : "deactivate");
		this.infoDialog.confirm("Confirmation", `Are you sure you want to ${work} the business account?`, (ok) => {
			if (ok) {
				this.infoDialog.showSpinner();
				this.dataService.updateBusinessAccountStatus(account, status).subscribe(x => {
					this.infoDialog.hideSpinner();
					if (x.success) {
						this.infoDialog.alert("Done", "Business account status updated");
						this.loadAccounts();
					} else {
						this.dataService.handleTypedError(x.error, "Unable to update business account status", "Something went wrong while updating the business account. Please try again.");
					}
				}, err => {
					this.infoDialog.hideSpinner();
					this.dataService.handleError(err, "Unable to update business account status", "Something went wrong while updating the business account. Please try again.");
				});
			}
		});
	}
}

@Injectable()
export class CanActivateBizAccountComponent implements CanActivate {
	constructor(
		private dataService: DataService) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot) {
		return this.dataService.isSuperAdmin();
	}
}