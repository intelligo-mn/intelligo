import { Injectable } from '@angular/core';
import { MdDialog } from '@angular/material';
import { InfoDialogComponent, InfoDialogOptions, InfoDialogType } from '../../components/info-dialog/info-dialog.component';

@Injectable()
export class InfoDialogService {
    constructor(private dialog: MdDialog) { }

    alert(title: string, message: string, callback?: () => void) {
        let data: InfoDialogOptions = {
            dialogType: InfoDialogType.Alert,
            message: message,
            title: title
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
    prompt(title: string, message: string, callback: (result: string) => void, defaultText?: string) {
        let data: InfoDialogOptions = {
            dialogType: InfoDialogType.Prompt,
            message: message,
            title: title,
            defaultInputText: defaultText
        }

        let d = this.dialog.open(InfoDialogComponent, {
            width: 'auto',
            data: data
        });
        d.afterClosed().subscribe(x => {
            callback(x as string);
        });
    }
    confirm(title: string, message: string, callback: (result: boolean) => void) {
        let data: InfoDialogOptions = {
            dialogType: InfoDialogType.Confirm,
            message: message,
            title: title
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
