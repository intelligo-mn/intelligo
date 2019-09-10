import { Component, OnInit, Optional, Inject } from '@angular/core';
import { UserRegisterModel, Role, User } from '../../../models/data.models';
import { GlobalsService } from '../../../services/globals.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { DataService } from '../../../services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditBusinessAccountComponent } from '../edit-business-account/edit-business-account.component';

@Component({
	selector: 'app-create-user',
	templateUrl: './create-user.component.html',
	styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
	title: string = "";
	constructor(
		private global: GlobalsService,
		private infoDialog: InfoDialogService,
		private dataService: DataService,
		private dialogRef: MatDialogRef<CreateUserComponent>,
		@Optional()
		@Inject(MAT_DIALOG_DATA)
		public param: UserDialogParam) {
		if (param.mode == UserDialogMode.Create) {
			this.title = "Create User";
			this.user = {
				businessId: param.bizId,
				email: "",
				name: "",
				phone: "",
				password: "",
				roleIds: []
			};
		} else if (param.mode == UserDialogMode.View) {
			this.title = "User Details";

			this.user = {
				businessId: param.bizId,
				email: param.user.email || param.user.userName,
				name: param.user.name || param.user.userName,
				phone: param.user.phone,
				password: "",
				roleIds: []
			};
		}
		this.loadRoles();
	}
	UserDialogMode = UserDialogMode;
	ngOnInit() {
	}
	confirmPassword: string;
	selectedRole: Role;

	userRoleDisplay() {
		if (this.param.user && this.param.user.roles) {
			return this.param.user.roles.map(x => x.label).join(', ');
		}
		return "";
	}

	user: UserRegisterModel;
	roles: Role[];

	loadRoles() {
		this.dataService.getRoles().subscribe(x => {
			this.roles = x.data.filter(x => ["SUPER_ADMIN", "END_USER"].indexOf(x.role) == -1);
		});
	}

	save() {
		if (!this.global.emailValid(this.user.email)) {
			this.infoDialog.alert("Invalid Email", "Please enter a valid email address");
			return;
		}
		if (!this.global.phoneValid(this.user.phone)) {
			this.infoDialog.alert("Invalid Phone Number", "Please enter a valid phone number");
			return;
		}
		if (!this.global.pwdMatch(this.user.password, this.confirmPassword)) {
			this.infoDialog.alert("Passwords do not match or not secure", "Please ensure the password and confirm password is same. Also, a password must be at least 6 characters.");
			return;
		}
		if (!this.selectedRole) {
			this.infoDialog.alert("Role not selected", "Please select a role for the user");
			return;
		}
		this.user.roleIds = [this.selectedRole.id];
		this.infoDialog.showSpinner();
		debugger;
		this.dataService.createUser(this.user).subscribe(x => {
			this.infoDialog.hideSpinner();
			if (x.success) {
				this.infoDialog.alert("User created", "The user has been created successfully", () => {
					this.dialogRef.close(true);
				});
			} else {
				this.dataService.handleTypedError(x.error, "Unable to create the user", "Something went wrong while trying to create the user. Please try again in some time.");
			}
		}, err => {
			this.infoDialog.hideSpinner();
			this.dataService.handleError(err, "Unable to create the user", "Something went wrong while trying to create the user. Please try again in some time.");
		});
	}
}

export enum UserDialogMode {
	View,
	Create
}

export interface UserDialogParam {
	mode: UserDialogMode,
	bizId?: string;
	user: User;
}