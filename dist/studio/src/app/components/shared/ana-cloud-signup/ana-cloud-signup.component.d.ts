import { OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { GlobalsService } from '../../../services/globals.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { TranslateService } from '@ngx-translate/core';
export declare class AnaCloudSignupComponent implements OnInit {
    private global;
    private data;
    private infoDialog;
    private translate;
    constructor(global: GlobalsService, data: DataService, infoDialog: InfoDialogService, translate: TranslateService);
    details: PublicRegistrationDetails;
    errorMessage: string;
    allValid(): boolean;
    ngOnInit(): void;
    create(): void;
}
export interface PublicRegistrationDetails {
    displayName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    companyName: string;
}
