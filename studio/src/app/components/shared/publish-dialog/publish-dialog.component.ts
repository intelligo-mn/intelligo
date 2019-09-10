import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChatBotProject, ChatBotReferance, ChatServerConnection } from '../../../models/app.models';
import { SettingsService } from '../../../services/settings.service';
import { ChatFlowService } from '../../../services/chatflow.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { ChatServerManagerComponent } from '../chat-server-manager/chat-server-manager.component';
import * as models from '../../../models/chatflow.models';
@Component({
	selector: 'app-publish-dialog',
	templateUrl: './publish-dialog.component.html',
	styleUrls: ['./publish-dialog.component.css']
})
export class PublishDialogComponent implements OnInit {

	constructor(
		private settings: SettingsService,
		private chatFlowService: ChatFlowService,
		private dialog: MatDialog,
		private infoDialog: InfoDialogService,
		private dialogRef: MatDialogRef<PublishDialogComponent>,
		@Inject(MAT_DIALOG_DATA) private pack: models.ChatFlowPack) {
		this.loadSavedConns();
	}

	loadSavedConns() {
		this.savedConns = this.settings.loadSavedConnections();
		this.selectedServer = null;
		this.selectedProject = null;
	}

	savedConns: ChatServerConnection[] = [];
	chatProjects: ChatBotProject[] = [];
	selectedServer: ChatServerConnection;
	selectedProject: ChatBotProject;

	ngOnInit() {
	}

	publish() {
		this.infoDialog.showSpinner();
		this.chatFlowService.chatProjectExists(this.selectedServer, this.selectedProject).subscribe(x => {
			this.infoDialog.hideSpinner();
			this.infoDialog.confirm("Sure?", `Chat project with id '${this.selectedProject.Id}' already exists. Publishing this will overwrite it. Do you want to proceed?`, (ok) => {
				if (ok)
					this.doPublish();
			});
		}, err => {
			this.infoDialog.hideSpinner();
			this.doPublish();
		});
	}

	private doPublish() {
		this.infoDialog.showSpinner();
		this.chatFlowService.publishProject(this.selectedServer, this.selectedProject, this.pack).subscribe(x => {
			this.infoDialog.hideSpinner();
			this.infoDialog.alert('Done', 'Chatbot published successfully', () => this.dismiss());
		}, err => {
			this.infoDialog.hideSpinner();
			this.infoDialog.alert('Done', 'Oops! Something went wrong while publishing the chat project! Please try again.');
		});
	}

	managePublishServers() {
		let dialogRef = this.dialog.open(ChatServerManagerComponent, {
			width: '60%',
		});

		dialogRef.afterClosed().subscribe(x => {
			this.loadSavedConns();
		});
	}
	dismiss() {
		this.dialogRef.close();
	}
}
