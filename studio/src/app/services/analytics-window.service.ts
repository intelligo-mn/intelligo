import { Injectable } from '@angular/core';
import { InfoDialogService } from './info-dialog.service';

@Injectable()
export class AnalyticsWindowService {
  constructor(private infoDialog: InfoDialogService) {}

  open(apiBase: string, businessId: string, businessName: string) {
    // TODO Iframe
  }
}
