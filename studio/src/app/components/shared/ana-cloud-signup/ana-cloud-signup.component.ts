import { Component, OnInit } from '@angular/core';
import { RegisterOnAnaCloudDetails } from '../../../models/data.models';
import { GlobalsService } from '../../../services/globals.service';
import { NgForm } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { InfoDialogService } from '../../../services/info-dialog.service';

@Component({
	selector: 'app-ana-cloud-signup',
	templateUrl: './ana-cloud-signup.component.html',
	styleUrls: ['./ana-cloud-signup.component.scss']
})
export class AnaCloudSignupComponent implements OnInit {

	constructor(
		private global: GlobalsService,
		private data: DataService,
		private infoDialog: InfoDialogService
	) { }
	details: PublicRegistrationDetails = {
		companyName: "",
		confirmPassword: "",
		displayName: "",
		email: "",
		password: "",
		phone: ""
	};

	errorMessage: string;

	allValid(): boolean {
		let d = this.details;
		if (!d || !d.companyName || !d.displayName) {
			this.errorMessage = "Please fill all the mandatory fields.";
			return false;
		}
		
		if (!d.email || !this.global.emailValid(d.email)) {
			this.errorMessage = "Please enter a valid email address. Verification email will be sent to it.";
			return false;
		}
		if (!d.phone || !this.global.phoneValid(d.phone)) {
			this.errorMessage = "Please enter a valid phone number.";
			return false;
		}
		if (!d.password || d.password.length < 6) {
			this.errorMessage = "Minimum length of the password is 6 characters.";
			return false;
		}
		if (d.password != d.confirmPassword) {
			this.errorMessage = "Password and confirm password do not match.";
			return false;
		}
		this.errorMessage = null;
		return true;
	}

	ngOnInit() {
	}

	create() {
		if (this.allValid()) {
			this.infoDialog.showSpinner();
			this.data.getRoles().subscribe(x => {
				let roles = x.data.filter(x => ["BUSINESS_ADMIN"].indexOf(x.role) != -1);
				if (roles && roles.length > 0) {
					let roleId = roles[0].id;
					this.data.registerOnAnaCloud({
						business: {
							email: this.details.email,
							phone: this.details.phone,
							name: this.details.companyName + " - " + this.details.displayName,
						},
						user: {
							email: this.details.email,
							phone: this.details.phone,
							name: this.details.displayName,
							password: this.details.password,
							roleIds: [roleId]
						}
					}).subscribe(x => {
						this.infoDialog.hideSpinner();
						if (x.data) {

						} else {
							this.data.handleTypedError(x.error, "Unable to register", "Something went wrong while trying to register. Please try again.");
						}
					}, err => {
						this.infoDialog.hideSpinner();
						this.data.handleError(err, "Unable to register", "Something went wrong while trying to register. Please try again.");
					});
				}
			}, err => {
				this.infoDialog.hideSpinner();
				this.data.handleError(err, "Unable to register", "Something went wrong while trying to register. Please try again.");
			});
		} else {
			this.infoDialog.alert("Invalid Details", this.errorMessage);
		}
	}
}

export interface PublicRegistrationDetails {
	displayName: string;
	phone: string;
	email: string;
	password: string;
	confirmPassword: string;
	companyName: string;
}