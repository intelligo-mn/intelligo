import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
export declare class GetAnaChatServerComponent implements OnInit {
    private dialog;
    constructor(dialog: MatDialog);
    ngOnInit(): void;
    selfHost(): void;
    anaCloud(): void;
}
