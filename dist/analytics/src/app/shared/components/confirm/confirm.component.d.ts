import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
export declare class ConfirmDialogComponent implements OnInit {
    dialogRef: MatDialogRef<ConfirmDialogComponent>;
    confirmMessage: string;
    constructor(dialogRef: MatDialogRef<ConfirmDialogComponent>);
    ngOnInit(): void;
}
