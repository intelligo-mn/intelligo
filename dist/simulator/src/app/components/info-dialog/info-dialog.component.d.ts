import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
export declare class InfoDialogComponent implements OnInit {
    private dialogRef;
    options: InfoDialogOptions;
    constructor(dialogRef: MatDialogRef<InfoDialogComponent>, options: InfoDialogOptions);
    ngOnInit(): void;
    inputKeypress(event: KeyboardEvent): void;
    primaryClick(): void;
    inputText: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    InfoDialogType: typeof InfoDialogType;
}
export interface InfoDialogOptions {
    dialogType: InfoDialogType;
    title: string;
    message: string;
    defaultInputText?: string;
    primaryButton?: string;
    secondaryButton?: string;
}
export declare enum InfoDialogType {
    Prompt = 0,
    Alert = 1,
    Confirm = 2
}
