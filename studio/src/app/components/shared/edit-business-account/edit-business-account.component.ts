import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChatBotReferance, ChatServerConnection } from '../../../models/app.models';
import { SettingsService } from '../../../services/settings.service';
import { ChatFlowService } from '../../../services/chatflow.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { ChatServerManagerComponent } from '../chat-server-manager/chat-server-manager.component';
import * as models from '../../../models/chatflow.models';
import { DataService } from "../../../services/data.service";
import { GlobalsService } from '../../../services/globals.service';
import { Router } from "@angular/router";
import { FormControl, Validators } from '@angular/forms';
import { BusinessAccount } from '../../../models/data.models';

@Component({
	selector: 'app-edit-business-account',
	templateUrl: './edit-business-account.component.html',
	styleUrls: ['./edit-business-account.component.scss']
})
export class EditBusinessAccountComponent implements OnInit {
	title: string = "Create business account";
	isCreate: boolean = false;
	constructor(
		private global: GlobalsService,
		private infoDialog: InfoDialogService,
		private dataService: DataService,
		private dialogRef: MatDialogRef<EditBusinessAccountComponent>,
		@Optional()
		@Inject(MAT_DIALOG_DATA)
		public data: BusinessAccount) {
		this.dialogRef.disableClose = true;

		if (data) {
			this.account = data;
			this.title = "Edit business account";
		}
		if (!this.account.id) {
			this.account.id = this.global.uuidv4();
			this.isCreate = true;
		}
	}

	ngOnInit(): void {

	}

	account: BusinessAccount = {
		colors: [],
		email: "",
		logoUrl: "",
		name: "",
		phone: "",
	};

	primaryBGColor: string = "#5e72e4";
	primaryFGColor: string = "white";
	secondaryColor: string = "#3c3c3c";

	emailValid(val: string) {
		let r = this.global.emailValid(val);
		return r;
	}
	phoneValid(val: string) {
		return this.global.phoneValid(val);
	}
	pwdMatch(p1, p2) {
		return this.global.pwdMatch(p1, p2);
	}
	
	confirmPassword: string;
	save() {
		if (this.account.email) {
			if (!this.global.emailValid(this.account.email)) {
				this.infoDialog.alert("Invalid email address", "Please enter a valid email address");
				return;
			}
		}

		if (this.account.phone) {
			if (!this.global.phoneValid(this.account.phone)) {
				this.infoDialog.alert("Invalid phone number", "Please enter a valid phone number");
				return;
			}
		}

		this.account.colors = [
			{
				name: "PRIMARY_BG",
				value: this.primaryBGColor
			},
			{
				name: "PRIMARY_FG",
				value: this.primaryFGColor
			},
			{
				name: "SECONDARY",
				value: this.secondaryColor
			}
		];
		this.infoDialog.showSpinner();

		this.dataService.saveBusinessAccount(this.account, this.isCreate).subscribe(x => {
			this.infoDialog.hideSpinner();
			if (x.success) {
				this.infoDialog.alert("Done", "Business account has been saved successfully", () => {
					this.dialogRef.close(true);
				});
			} else {
				this.dataService.handleTypedError(x.error, "Unable to save business account", "Something went wrong while trying to save business account details");
			}
		}, err => {
			this.infoDialog.hideSpinner();
			this.dataService.handleError(err, "Unable to save business account", "Something went wrong while trying to save business account details");
		});
	}
}