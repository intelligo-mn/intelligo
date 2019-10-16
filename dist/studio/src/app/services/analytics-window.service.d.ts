import { InfoDialogService } from './info-dialog.service';
export declare class AnalyticsWindowService {
    private infoDialog;
    constructor(infoDialog: InfoDialogService);
    open(apiBase: string, businessId: string, businessName: string): void;
}
