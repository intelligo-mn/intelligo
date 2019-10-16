import { DataService } from './data.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
export declare class LoginService {
    private dataService;
    private dialog;
    private router;
    constructor(dataService: DataService, dialog: MatDialog, router: Router);
    performLogin(skipAuth: boolean, fallbackUrl?: string, hardCheck?: boolean, next?: (done: boolean) => void): void;
}
