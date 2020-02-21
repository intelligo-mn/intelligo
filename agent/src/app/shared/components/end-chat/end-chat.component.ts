import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { InfoDialogService } from 'app/shared/services/helpers/info-dialog.service';
import { DataService } from 'app/shared/services/data/data.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ANAChatMessage, OptionsInputContent, SenderType } from 'app/shared/model/ana-chat.models';

@Component({
	selector: 'app-end-chat',
	templateUrl: './end-chat.component.html',
	styleUrls: ['./end-chat.component.scss']
})
export class EndChatComponent implements OnInit {

	constructor(
		private dialogRef: MdDialogRef<EndChatComponent>,
		@Inject(MD_DIALOG_DATA) public sessionId: string,
		private infoDialog: InfoDialogService,
		private dataService: DataService) { }
	loading: boolean;

	ngOnInit() {
		this.loading = true;
		this.dataService.intentToHandover(this.sessionId).subscribe(x => {
			this.loading = false;
			if (x.data) {
				this.message = x.data.message;
			}
		}, err => {
			this.loading = false;
			this.infoDialog.alert("Error", JSON.stringify(err, null, 4));
		});
	}
	message: ANAChatMessage;
	getOptions() {
		if (!this.message) return [];

		try {
			return (<OptionsInputContent>this.message.data.content).options || [];
		} catch (error) {
			console.log(error);
			return [];
		}
	}

	optionClick(option: { title: string; value: string; }) {
		(<OptionsInputContent>this.message.data.content).input = {
			val: option.value
		}
		this.message.meta.senderType = SenderType.AGENT;
		this.loading = true;
		this.dataService.handover(this.sessionId, this.message).subscribe(x => {
			this.loading = false;
			if (!x.error) {
				this.infoDialog.alert("Done", "Chat session has been closed", () => {
					this.dialogRef.close(true);
				});
			} else {
				this.infoDialog.alert("Error", (x.error.message ? x.error.message : "Something went wrong! Please try again."));
			}
		}, err => {
			this.loading = false;
			console.error(err);
			this.infoDialog.alert("Error", (err._body ? JSON.parse(err._body).error.message : "Something went wrong! Please try again."));
		});
	}
}