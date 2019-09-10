import { Component, OnInit, Optional, Inject } from '@angular/core';
import { GlobalsService } from '../../../services/globals.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditBusinessAccountComponent } from '../edit-business-account/edit-business-account.component';
import { DataService } from '../../../services/data.service';
import { User } from '../../../models/data.models';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

	constructor(
		private global: GlobalsService,
		private infoDialog: InfoDialogService,
		private dataService: DataService,
		private dialogRef: MatDialogRef<ChangePasswordComponent>) {

	}

	password: string;

	newPassword: string;
	confirmPassword: string;

	ngOnInit() {
	}

	save() {
		if (!this.global.pwdMatch(this.newPassword, this.confirmPassword)) {
			this.infoDialog.alert("Passwords do not match or not secure", "Please ensure the password and confirm password is same. Also, a password must be at least 6 characters.");
			return;
		}
		this.infoDialog.showSpinner();

		this.dataService.changeCurrentUserPassword(this.password, this.newPassword).subscribe(x => {
			this.infoDialog.hideSpinner();
			if (x.success) {
				this.infoDialog.alert("Password changed", "Password has been changed successfully", () => {
					this.dialogRef.close();
				});
			} else {
				this.dataService.handleTypedError(x.error, "Unable to change password", "Something went wrong while trying to change the password.")
			}
		}, err => {
			this.infoDialog.hideSpinner();
			this.dataService.handleError(err, "Unable to change password", "Something went wrong while trying to change the password.")
		});
	}
}
