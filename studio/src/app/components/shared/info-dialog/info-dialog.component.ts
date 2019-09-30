import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-info-dialog',
	templateUrl: './info-dialog.component.html',
	styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {

	constructor(
		private dialogRef: MatDialogRef<InfoDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public options: InfoDialogOptions) {
		this.dialogRef.disableClose = true;

		if (!options) {
			options = {
				dialogType: InfoDialogType.Alert,
				title: 'Title',
				message: 'Message'
			}
		}

		switch (options.dialogType) {
			case InfoDialogType.Confirm:
				{
					this.primaryButtonText = "OK";
					this.secondaryButtonText = "Cancel";
				}
				break;
			case InfoDialogType.Prompt:
				{
					this.inputText = options.defaultInputText;
					this.primaryButtonText = "Done";
					this.secondaryButtonText = "Cancel";
				}
				break;
			case InfoDialogType.Alert:
			default:
				{
					this.secondaryButtonText = "Close";
				}
				break;
		}
	}

	ngOnInit() {
	}

	inputKeypress(event: KeyboardEvent) {
		if (event.keyCode == 13) {
			this.primaryClick();
		}
	}

	primaryClick() {
		switch (this.options.dialogType) {
			case InfoDialogType.Confirm:
				this.dialogRef.close(true);
				break;
			case InfoDialogType.Prompt:
				this.dialogRef.close(this.inputText);
				break;
			case InfoDialogType.Alert:
			default:
				this.dialogRef.close();
				break;
		}
	}
	inputText: string;
	primaryButtonText: string;
	secondaryButtonText: string;

	InfoDialogType = InfoDialogType;
}

export interface InfoDialogOptions {
	dialogType: InfoDialogType,
	title: string,
	message: string,
	defaultInputText?: string,
}

export enum InfoDialogType {
	Prompt,
	Alert,
	Confirm
}