import { OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
export declare class ConfirmDialogComponent implements OnInit {
    dialogRef: MdDialogRef<ConfirmDialogComponent>;
    confirmMessage: string;
    constructor(dialogRef: MdDialogRef<ConfirmDialogComponent>);
    ngOnInit(): void;
}
