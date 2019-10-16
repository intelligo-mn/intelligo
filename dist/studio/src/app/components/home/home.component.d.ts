import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { InfoDialogService } from '../../services/info-dialog.service';
import { LoginService } from '../../services/login.service';
import { BusinessPickerParam } from '../shared/business-picker/business-picker.component';
export declare class HomeComponent {
    private router;
    private loginService;
    private infoDialog;
    private dialog;
    private dataService;
    constructor(router: Router, loginService: LoginService, infoDialog: InfoDialogService, dialog: MatDialog, dataService: DataService);
    studio(): void;
    userManagement(): void;
    analytics(): void;
    deploy(): void;
    openAnalyticsPicker(params: BusinessPickerParam): void;
    openDeployPage(params: BusinessPickerParam): void;
}
