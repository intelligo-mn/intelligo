import { MatDialog, MatDialogRef } from "@angular/material";
import { LoadingMaskComponent } from "../components/shared/loading-mask/loading-mask.component";
export declare class InfoDialogService {
    private dialog;
    constructor(dialog: MatDialog);
    alert(title: string, message: string, callback?: () => void): void;
    prompt(title: string, message: string, callback: (result: string) => void, defaultText?: string): void;
    confirm(title: string, message: string, callback: (result: boolean) => void): void;
    dialogRef: MatDialogRef<LoadingMaskComponent, any>;
    showSpinner(): void;
    hideSpinner(): void;
}
