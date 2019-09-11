import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { InfoDialogComponent, InfoDialogOptions, InfoDialogType } from '../components/info-dialog/info-dialog.component';

@Injectable()
export class InfoDialogService {
	constructor(private dialog: MatDialog) { }

	alert(title: string, message: string, callback?: () => void, primaryButton?: string, secondaryButton?: string) {
		let data: InfoDialogOptions = {
			dialogType: InfoDialogType.Alert,
			message: message,
			title: title,
			primaryButton: primaryButton,
			secondaryButton: secondaryButton
		}
		let d = this.dialog.open(InfoDialogComponent, {
			width: 'auto',
			data: data
		});
		if (callback)
			d.afterClosed().subscribe(x => {
				if (callback)
					callback();
			});
	}
	prompt(title: string, message: string, callback: (result: string) => void, defaultText?: string, primaryButton?: string, secondaryButton?: string) {
		let data: InfoDialogOptions = {
			dialogType: InfoDialogType.Prompt,
			message: message,
			title: title,
			defaultInputText: defaultText,
			primaryButton: primaryButton,
			secondaryButton: secondaryButton
		}

		let d = this.dialog.open(InfoDialogComponent, {
			width: 'auto',
			data: data
		});
		d.afterClosed().subscribe(x => {
			callback(x as string);
		});
	}
	confirm(title: string, message: string, callback: (result: boolean) => void, primaryButton?: string, secondaryButton?: string) {
		let data: InfoDialogOptions = {
			dialogType: InfoDialogType.Confirm,
			message: message,
			title: title,
			primaryButton: primaryButton,
			secondaryButton: secondaryButton
		}

		let d = this.dialog.open(InfoDialogComponent, {
			width: 'auto',
			data: data
		});
		d.afterClosed().subscribe(x => {
			callback(x as boolean);
		});
	}
}
