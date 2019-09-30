import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessAccount, User } from '../../../models/data.models';
import { DataService } from '../../../services/data.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { AppHeaderBarComponent } from '../../shared/app-header-bar/app-header-bar.component';
import { CreateUserComponent, UserDialogMode, UserDialogParam } from '../../shared/create-user/create-user.component';
import { UpdatePasswordComponent } from '../../shared/update-password/update-password.component';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
	ngAfterViewInit(): void {
		this.appHeader.afterInit = () => {
			this.route.queryParamMap.subscribe(x => {
				let bizId = x.get('bizId');
				if (bizId) {
					this.bizId = bizId;
					this.loadUsers();
					this.loadBusinessDetails();
				}
			});
		};
		this.appHeader.goBack = () => {
			if (this.dataService.isSuperAdmin()) {
				this.router.navigateByUrl('/manage-users');
			} else {
				this.router.navigateByUrl('/');
			}
		};
	}

	@ViewChild(AppHeaderBarComponent, { static: false })
	appHeader: AppHeaderBarComponent;

	businessAccount: BusinessAccount;
	bizId: string;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private infoDialog: InfoDialogService,
		private dialog: MatDialog,
		private dataService: DataService) {
	}

	ngOnInit() {
	}

	search: string = "";
	searchStart() {
		this.page = 0;
		this.loadUsers();
	}

	loadBusinessDetails() {
		this.infoDialog.showSpinner();

		this.dataService.getBusinessDetails(this.bizId).subscribe(x => {
			this.infoDialog.hideSpinner();
			this.businessAccount = x.data;
		}, err => {
			this.infoDialog.hideSpinner();
			this.dataService.handleError(err, "Unable to load business details", "Something went wrong while trying to load business account details. Please try again.")
		});
	}

	createUserDialog() {
		let d = this.dialog.open(CreateUserComponent, {
			width: '60%',
			data: <UserDialogParam>{
				bizId: this.bizId,
				mode: UserDialogMode.Create,
			}
		});
		d.afterClosed().subscribe(x => {
			if (x == true)
				this.loadUsers();
		});
	}

	users: User[] = [];
	page: number = 0;
	totalPages: number = 0;

	prevPage() {
		if (this.page > 0) {
			this.page--;
			this.loadUsers();
		}
	}
	nextPage() {
		if (this.page < this.totalPages) {
			this.page++;
			this.loadUsers();
		}
	}
	view(user: User) {
		this.dialog.open(CreateUserComponent, {
			width: '60%',
			data: <UserDialogParam>{
				mode: UserDialogMode.View,
				user: user
			}
		})
	}
	loadUsers() {
		if (this.bizId) {
			this.infoDialog.showSpinner();
			this.dataService.getUsers(this.bizId, this.search, this.page).subscribe(x => {
				this.infoDialog.hideSpinner();
				//if (x.success) {
				this.users = x.content;//.filter(x => x.roles && x.roles.length > 0);
				this.totalPages = x.totalPages;
				//} else {
				//	debugger;
				//	this.dataService.handleTypedError(x.error, "Unable to load users", "Something went wrong while loading the users. Please try again.");
				//}
			}, err => {
				this.infoDialog.hideSpinner();
				this.dataService.handleError(err, "Unable to load users", "Something went wrong while loading the users. Please try again.");
			});
		}
	}

	updateUserPassword(user: User) {
		this.dialog.open(UpdatePasswordComponent, {
			width: '40%',
			data: user
		});
	}

	userRole(user: User) {
		if (user.roles) {
			return user.roles.map(x => x.label).join(', ');
		}
		return "";
	}
}
