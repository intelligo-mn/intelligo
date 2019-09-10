import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { BrowserWindow } from 'electron';
import { InfoDialogService } from './info-dialog.service';

@Injectable()
export class AnalyticsWindowService {

	constructor(
		private electron: ElectronService,
		private infoDialog: InfoDialogService
	) { }

	open(apiBase: string, businessId: string, businessName: string) {
		if (!this.electron.isElectronApp) {
			let url = `/analytics-dashboard/index.html#/?apiBase=${encodeURIComponent(apiBase)}&businessId=${businessId}&businessName=${encodeURIComponent(businessName)}&chatFlowId=${businessId}`;
			window.open(url);
			return;
		}
		let url = `file://${this.electron.remote.app.getAppPath()}/analytics-dashboard/index.html#/?apiBase=${encodeURIComponent(apiBase)}&businessId=${businessId}&businessName=${encodeURIComponent(businessName)}&chatFlowId=${businessId}`;
		
		let win = new this.electron.remote.BrowserWindow({
			width: 900,
			height: 600,
			center: true
		});
		win.on('closed', () => {
			win = null
		});
		win.loadURL(url);
	}
}
