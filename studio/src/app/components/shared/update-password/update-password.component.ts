import { Component, OnInit, Optional, Inject } from '@angular/core';
import { GlobalsService } from '../../../services/globals.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../../../services/data.service';
import { User } from '../../../models/data.models';

@Component({
	selector: 'app-update-password',
	templateUrl: './update-password.component.html',
	styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

	constructor(
		private global: GlobalsService,
		private infoDialog: InfoDialogService,
		private dataService: DataService,
		private dialogRef: MatDialogRef<UpdatePasswordComponent>,
		@Optional()
		@Inject(MAT_DIALOG_DATA)
		public user: User) {

	}

	password: string;
	confirmPassword: string;

	ngOnInit() {
	}

	save() {
		if (!this.global.pwdMatch(this.password, this.confirmPassword)) {
			this.infoDialog.alert("Passwords do not match or not secure", "Please ensure the password and confirm password is same. Also, a password must be at least 6 characters.");
			return;
		}
		this.infoDialog.showSpinner();
		this.dataService.updatePassword(this.user.id, this.password).subscribe(x => {
			this.infoDialog.hideSpinner();
			if (x.success) {
				this.infoDialog.alert("Password updated", "Password has been updated successfully", () => {
					this.dialogRef.close();
				});
			} else {
				this.dataService.handleTypedError(x.error, "Unable to update password", "Something went wrong while trying to update the password.")
			}
		}, err => {
			this.infoDialog.hideSpinner();
			this.dataService.handleError(err, "Unable to update password", "Something went wrong while trying to update the password.")
		});
	}
}