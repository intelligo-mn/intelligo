import { OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { InfoDialogService } from 'app/shared/services/helpers/info-dialog.service';
import { DataService } from 'app/shared/services/data/data.service';
import { ANAChatMessage } from 'app/shared/model/ana-chat.models';
export declare class EndChatComponent implements OnInit {
    private dialogRef;
    sessionId: string;
    private infoDialog;
    private dataService;
    constructor(dialogRef: MdDialogRef<EndChatComponent>, sessionId: string, infoDialog: InfoDialogService, dataService: DataService);
    loading: boolean;
    ngOnInit(): void;
    message: ANAChatMessage;
    getOptions(): any;
    optionClick(option: {
        title: string;
        value: string;
    }): void;
}
