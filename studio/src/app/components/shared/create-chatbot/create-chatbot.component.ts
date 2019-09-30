import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChatProject } from '../../../models/data.models';
import { DataService } from '../../../services/data.service';
import { GlobalsService } from '../../../services/globals.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { LoginService } from '../../../services/login.service';
import { SettingsService } from '../../../services/settings.service';

@Component({
	selector: 'app-create-chatbot',
	templateUrl: './create-chatbot.component.html',
	styleUrls: ['./create-chatbot.component.scss']
})
export class CreateChatbotComponent implements OnInit {

	constructor(private settings: SettingsService,
		private globals: GlobalsService,
		private dataService: DataService,
		private loginService: LoginService,
		private dialog: MatDialog,
		private infoDialog: InfoDialogService,
		private dialogRef: MatDialogRef<CreateChatbotComponent>,
		@Inject(MAT_DIALOG_DATA) private bizDetails: BusinessDetails) {
		if (bizDetails) {
			this.chatProject.businessId = bizDetails.id;
			//this.chatProject.businessName = bizDetails.name;
		}
	}

	ngOnInit() {
	}

	chatProject: ChatProject = {
		businessId: "",
		//businessName: "",
		id: "",
		name: ""
	};

	create() {
		this.infoDialog.showSpinner();
		this.dataService.createChatProject(this.chatProject).subscribe(x => {
			this.infoDialog.hideSpinner();
			if (x.success) {
				this.dialogRef.close(this.chatProject);
			} else {
				this.dataService.handleTypedError(x.error, "Unable to create chatbot project", "Something went wrong while creating the chatbot project. Please try again.");
				this.dialogRef.close();
			}
		}, err => {
			this.infoDialog.hideSpinner();
			this.dataService.handleError(err, "Unable to create chatbot project", "Something went wrong while creating the chatbot project. Please try again.");
			this.dialogRef.close();
		});
	}
}

export interface BusinessDetails {
	id: string;
	name?: string;
}
