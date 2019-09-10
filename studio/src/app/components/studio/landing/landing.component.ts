import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { GlobalsService } from '../../../services/globals.service';
import { SettingsService } from '../../../services/settings.service';
import * as models from '../../../models/chatflow.models';
import { ObjectID } from 'bson';

@Component({
	selector: 'app-studio-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

	constructor(
		private router: Router,
		private globals: GlobalsService,
		private infoDialog: InfoDialogService,
		private settings: SettingsService) {
		this.globals.setPageTitle();
		this.loadSavedProjects();
	}

	@ViewChild('fileInput', { static: false })
	fileInput: ElementRef;

	loadSavedProjects() {
		this.savedProjects = this.settings.listSavedChatProjectNames();
	}

	savedProjects: string[] = [];

	ngOnInit() {

	}

	fileInputChange() {
		let fileInput = this.fileInput.nativeElement as HTMLInputElement;
		if (fileInput.files && fileInput.files[0]) {
			let selectedFile = fileInput.files[0];
			fileInput.value = '';
			if (selectedFile.name.endsWith('.anaproj')) {
				let reader: FileReader = new FileReader();
				reader.onload = (evt) => {
					let pack = JSON.parse(reader.result.toString()) as models.ChatFlowPack;
					let projName = selectedFile.name.replace(new RegExp('\.anaproj$'), '');
					this.settings.saveChatProject(projName, pack, false, () => {
						this.openChatBotProject(projName);
					});
				};
				reader.onerror = () => {
					this.infoDialog.alert('Oops!', 'Unable to load the file!');
				};
				reader.readAsText(selectedFile, "UTF-8");
			} else
				this.infoDialog.alert('Oops!', 'Invalid file. Please select a valid Ana project file');
		}
	}
	search: string;
	searchedProjects() {
		if (this.search && this.search.length > 0)
			return this.savedProjects.filter(x => x.toLowerCase().indexOf(this.search.toLowerCase()) != -1);
		return this.savedProjects;
	}
	addProject() {
		this.infoDialog.prompt('Chatbot Project Name', 'Enter a name for your new chatbot project', (name) => {
			if (!name)
				return;

			let firstNode = {
				Name: 'New Node',
				Id: new ObjectID().toHexString(),
				Buttons: [],
				Sections: [],
				NodeType: models.NodeType.Combination,
				TimeoutInMs: 0
			};
			let _id = new ObjectID().toHexString();
			let defaultFlow: models.ChatFlowPack = {
				ChatNodes: [firstNode],
				CreatedOn: new Date(),
				UpdatedOn: new Date(),
				NodeLocations: {},
				ProjectId: _id,
				_id: _id
			};
			defaultFlow.NodeLocations[firstNode.Id] = { X: 500, Y: 500 };
			this.settings.saveChatProject(name, defaultFlow, false, () => {
				this.openChatBotProject(name);
			});
		});
	}

	isExpanded(proj: string) {
		return this.savedProjects.indexOf(proj) == this.savedProjects.length - 1;
	}

	openChatBotProject(name: string) {
		this.router.navigateByUrl('/studio/designer?proj=' + encodeURIComponent(name));
	}
	renameChatBotProject(name: string) {
		this.infoDialog.prompt("Rename", 'Enter a new name: ', (newName) => {
			if (newName && name != newName) {
				this.settings.renameChatProject(name, newName);
				this.loadSavedProjects();
			}
		}, name);
	}
	deleteChatBotProject(name: string) {
		this.infoDialog.confirm('Sure?', `Are you sure you want to delete '${name}'`, (ok) => {
			if (ok) {
				this.settings.deleteChatProject(name);
				this.loadSavedProjects();
			}
		});
	}

	downloadChatBotProject(name: string) {
		let pack = this.settings.getChatProject(name);
		this.globals.downloadTextAsFile(name + ".anaproj", JSON.stringify(pack));
	}

}