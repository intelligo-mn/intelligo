import { MdDialog } from '@angular/material';
export declare class InfoDialogService {
    private dialog;
    constructor(dialog: MdDialog);
    alert(title: string, message: string, callback?: () => void): void;
    prompt(title: string, message: string, callback: (result: string) => void, defaultText?: string): void;
    confirm(title: string, message: string, callback: (result: boolean) => void): void;
}
