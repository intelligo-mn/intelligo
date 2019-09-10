import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent, MatFormField } from '@angular/material';
import { ChatBotReferance, ChatServerConnection } from '../../../models/app.models';
import { SettingsService } from '../../../services/settings.service';
import { ChatFlowService } from '../../../services/chatflow.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { ChatServerManagerComponent } from '../chat-server-manager/chat-server-manager.component';
import * as models from '../../../models/chatflow.models';
import { DataService } from '../../../services/data.service';
import { LoginService } from '../../../services/login.service';
import { ChatProject, BusinessAccount } from '../../../models/data.models';
import { GlobalsService } from '../../../services/globals.service';
import { CreateChatbotComponent, BusinessDetails } from '../create-chatbot/create-chatbot.component';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { FormControl } from '@angular/forms';
import { BusinessPickerComponent } from '../business-picker/business-picker.component';

@Component({
	selector: 'app-publish-chatbot',
	templateUrl: './publish-chatbot.component.html',
	styleUrls: ['./publish-chatbot.component.css']
})
export class PublishChatbotComponent implements OnInit {
	constructor(
		private settings: SettingsService,
		private globals: GlobalsService,
		private dataService: DataService,
		private loginService: LoginService,
		private dialog: MatDialog,
		private infoDialog: InfoDialogService,
		private dialogRef: MatDialogRef<PublishChatbotComponent>,
		@Inject(MAT_DIALOG_DATA) private params: PublishChatbotParams) {

		this.pack = params.pack;
		this.businessId = params.bizId;
		this.loadChatProjects();
	}

	@ViewChild("chatProjectFormField")
	chatProjectFormField: MatFormField;

	chatProjects: ChatProject[] = [];
	pack: models.ChatFlowPack;
	businessId: string;

	ngOnInit() {
	}

	newChatProject: ChatProject = {
		businessId: "",
		id: null,
		name: null
	};

	canPublish() {
		if (this.selectedProject) {
			return true;
		}
		if (this.newChatProject && this.newChatProject.id && this.newChatProject.name) {
			return true;
		}
		return false;
	}

	createAndPublish() {
		if (!this.newChatProject || !this.newChatProject.id || !this.newChatProject.name) {
			return;
		}

		this.infoDialog.showSpinner();
		this.newChatProject.businessId = this.businessId;
		this.dataService.createChatProject(this.newChatProject).subscribe(x => {
			this.infoDialog.hideSpinner();
			if (x.success) {
				this.selectedProject = this.newChatProject;
				this.doPublish();
			} else {
				this.dataService.handleTypedError(x.error, "Unable to create chatbot project", "Something went wrong while creating the chatbot project. Please try again.");
			}
		}, err => {
			this.infoDialog.hideSpinner();
			this.dataService.handleError(err, "Unable to create chatbot project", "Something went wrong while creating the chatbot project. Please try again.");
		});
	}
	/*
	added = "";
	createNewChatProject() {
		let d = this.dialog.open(CreateChatbotComponent, {
			width: 'auto',
			disableClose: true,
			data: <BusinessDetails>{
				id: this.businessId
			}
		});
		d.afterClosed().subscribe(x => {
			if (x) {
				this.added = "New chat bot project created";
				setTimeout(() => this.added = null, 3000);
				this.loadChatProjects();
			}
		});
	}
	*/
	loadChatProjects() {
		let bizId = this.businessId;
		this.infoDialog.showSpinner();
		this.dataService.getChatProjects(bizId, 0, 10000).subscribe(x => {
			this.infoDialog.hideSpinner();
			if (x.success) {
				this.chatProjects = x.data.content;
			} else {
				this.dataService.handleTypedError(x.error, "Unable to fetch chat projects", "Something went wrong while trying to fetch chat projects. Please try again.");
			}
		}, err => {
			this.infoDialog.hideSpinner();
			this.dataService.handleError(err, "Unable to fetch chat projects", "Something went wrong while trying to fetch chat projects. Please try again.");
		});
	}

	doPublish() {
		if (!this.selectedProject) {
			if (this.newChatProject.id && this.newChatProject.name) {
				this.createAndPublish();
			}
			return;
		}

		this.infoDialog.confirm(`Publish chatbot to '${this.selectedProject.name}'?`, `Are you sure you want to publish this chatbot to ${this.selectedProject.name}?`, (ok) => {
			if (ok) {
				this.infoDialog.showSpinner();
				this.selectedProject.source = this.pack;
				this.selectedProject.flow = this.globals.normalizeChatNodes(this.pack.ChatNodes);
				this.dataService.saveChatProject(this.selectedProject).subscribe(x => {
					this.infoDialog.hideSpinner();
					if (x.success) {
						this.infoDialog.alert('Done', 'Chatbot published successfully', () => this.dismiss());
					} else {
						this.dataService.handleTypedError(x.error, "Oops!", "Something went wrong while publishing the chat project! Please try again.");
					}
				}, err => {
					this.infoDialog.hideSpinner();
					this.dataService.handleError(err, "Oops!", "Something went wrong while publishing the chat project! Please try again.");
				});
			}
		});
	}

	dismiss() {
		this.dialogRef.close();
	}
	selectedProject: ChatProject;
	optionSelected(event: MatAutocompleteSelectedEvent) {
		if (event.option && event.option.value) {
			this.selectedProject = event.option.value;
		}
	}
	displayWith(value: any) {
		return value ? value.name : null;
	}
	filter: string | ChatProject = "";
	filteredOptions() {
		if (typeof this.filter === 'string') {
			if (this.filter) {
				return this.chatProjects.filter(x => x.name.toLowerCase().indexOf((<string>this.filter).toLowerCase()) != -1);
			}
			return this.chatProjects;
		}
	}

	get chatConnName() {
		return this.dataService.chatServer.Name;
	}
}

export interface PublishChatbotParams {
	pack: models.ChatFlowPack;
	bizId: string;
}