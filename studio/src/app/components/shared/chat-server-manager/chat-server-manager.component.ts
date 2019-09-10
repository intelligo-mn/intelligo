import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { ChatServerConnection, ChatBotProject } from '../../../models/app.models';
import { SettingsService } from '../../../services/settings.service';
import { ChatFlowService } from '../../../services/chatflow.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { GetAnaChatServerComponent } from '../get-ana-chat-server/get-ana-chat-server.component';

@Component({
	selector: 'app-chat-server-manager',
	templateUrl: './chat-server-manager.component.html',
	styleUrls: ['./chat-server-manager.component.scss'],
})
export class ChatServerManagerComponent implements OnInit {
	constructor(
		public settings: SettingsService,
		public chatFlowService: ChatFlowService,
		public snakbar: MatSnackBar,
		public infoDialog: InfoDialogService,
		public dialog: MatDialog,
		public router: Router,
		public dialogRef: MatDialogRef<ChatServerManagerComponent>) {

		this.savedConnections = this.settings.loadSavedConnections();
	}

	savedConnections: ChatServerConnection[] = [];

	ngOnInit(): void {
	}

	connectionAlias(conn: ChatServerConnection) {
		return conn.Name || conn.ServerUrl || 'New Ana chat server';
	}

	deleteConnection(conn: ChatServerConnection) {
		var current = this.savedConnections.indexOf(conn);
		if (current != -1) {

			this.infoDialog.confirm("Sure?", `Delete chat server connection '${this.connectionAlias(conn)}'`, (ok) => {
				if (ok) {
					this.savedConnections.splice(current, 1);
					this.saveConnections(false);
				}
			});
		}
	}

	addChatProjectToConn(conn: ChatServerConnection) {
		if (!conn.ChatProjects)
			conn.ChatProjects = [];
		conn.ChatProjects.push({
			CreatedOn: new Date(),
			Id: 'new-chat-project',
			Name: 'New Chat Project',
			UpdatedOn: new Date()
		});
	}

	deleteProject(conn: ChatServerConnection, proj: ChatBotProject) {
		var current = conn.ChatProjects.indexOf(proj);
		if (current != -1) {
			this.infoDialog.confirm("Sure?", `Delete chat project '${proj.Name}'`, (ok) => {
				if (ok) {
					conn.ChatProjects.splice(current, 1);
					this.saveConnections(false);
				}
			});
		}
	}

	saveConnections(close: boolean) {
		if (this.savedConnections && this.savedConnections.length > 0) {
			let invalidPublishServers = this.savedConnections.filter(x => !x.ServerUrl || !x.Name);
			if (invalidPublishServers.length > 0) {
				this.infoDialog.alert('Incomplete Details', `One or more of your Ana chat servers have Server Url or Name. Please fill them and try again.`);
				return;
			}

			try {
				let emptyChatProjects = this.savedConnections.filter(x => !x.ChatProjects || x.ChatProjects.length <= 0);
				if (emptyChatProjects.length != this.savedConnections.length) {
					let invalidChatProjects = this.savedConnections.filter(x => x.ChatProjects && x.ChatProjects.length > 0).map(x => x.ChatProjects).reduce((a, b) => a.concat(b)).filter(x => !x.Id || !x.Name);
					if ((emptyChatProjects.length > 0 && invalidChatProjects.length > 0)) {
						this.infoDialog.alert('Incomplete Details', `One or more of the chat projects in your chat server connections is incomplete. Please fill them and try again.`);
						return;
					}
				}
			} catch (e) {
				console.log(e);
				this.infoDialog.alert('Incomplete Details', `One or more of the chat projects in your chat server connections is incomplete. Please fill them and try again.`);
				return;
			}
		}

		this.settings.saveSavedConnections(this.savedConnections);

		this.snakbar.open('Ana chat servers saved!', 'Dismiss', {
			duration: 3000
		});

		if (close) {
			this.dialogRef.close();
		}
	}

	addConnection() {
		let newConn: ChatServerConnection = {
			APIKey: '',
			APISecret: '',
			IsDefault: false,
			Name: '',
			ServerUrl: '',
			ChatProjects: []
		};
		this.savedConnections.push(newConn);
	}

	getAnaChatServer() {
		this.dialog.open(GetAnaChatServerComponent, {
			width: 'auto',
			disableClose: true
		});
	}
}