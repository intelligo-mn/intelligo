import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { MatDialog } from '@angular/material';
import { AnaCloudSignupComponent } from '../ana-cloud-signup/ana-cloud-signup.component';
@Component({
	selector: 'app-get-ana-chat-server',
	templateUrl: './get-ana-chat-server.component.html',
	styleUrls: ['./get-ana-chat-server.component.scss']
})
export class GetAnaChatServerComponent implements OnInit {

	constructor(
		private electron: ElectronService,
		private dialog: MatDialog,
	) { }

	ngOnInit() {
	}

	selfHost() {
		this.electron.shell.openExternal('https://www.ana.chat/self-hosting.html?r=' + Math.random());
	}

	anaCloud() {
		let d = this.dialog.open(AnaCloudSignupComponent, {
			width: 'auto'
		});
	}
}
