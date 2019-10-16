import { MatDialog } from '@angular/material';
export declare class InfoDialogService {
    private dialog;
    constructor(dialog: MatDialog);
    alert(title: string, message: string, callback?: () => void, primaryButton?: string, secondaryButton?: string): void;
    prompt(title: string, message: string, callback: (result: string) => void, defaultText?: string, primaryButton?: string, secondaryButton?: string): void;
    confirm(title: string, message: string, callback: (result: boolean) => void, primaryButton?: string, secondaryButton?: string): void;
}
