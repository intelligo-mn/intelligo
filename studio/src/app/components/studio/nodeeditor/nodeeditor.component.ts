import { Component, Inject, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTab, MatTabGroup } from '@angular/material';
import 'rxjs/add/operator/filter';

import * as models from '../../../models/chatflow.models';
import * as chatflow from '../../../components/studio/chatflow/chatflow.component';
import { ChatFlowService } from '../../../services/chatflow.service';
import { GlobalsService } from '../../../services/globals.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';

@Component({
	selector: 'app-nodeeditor',
	templateUrl: './nodeeditor.component.html',
	styleUrls: ['./nodeeditor.component.scss']
})
export class NodeEditorComponent implements OnInit, OnDestroy {
	constructor(
		private chatFlowService: ChatFlowService,
		private hotkeys: HotkeysService,
		private infoDialog: InfoDialogService,
		public dialogRef: MatDialogRef<NodeEditorComponent>,
		@Inject(MAT_DIALOG_DATA) public chatNode: models.ChatNode,
		public globalsService: GlobalsService) {
		this.MH = new models.ModelHelpers(globalsService, infoDialog);
	}

	@ViewChild("nodeInfoTab")
	nodeInfoTab: MatTab;

	@ViewChild("contentTab")
	contentTab: MatTab;
	contentTabIndex = 1;

	@ViewChild("buttonsTab")
	buttonsTab: MatTab;

	@ViewChild("tabGroup")
	tabGroup: MatTabGroup;

	keymapOnNodeEditor: Hotkey[] = [
		new Hotkey(["t", "alt+t"], (e, s) => {
			this.addNewSectionText();
			return false;
		}, [], "Add a new text content (if applicable)"),
		new Hotkey(["b", "alt+b"], (e, s) => {
			this.addNewButton();
			return false;
		}, [], "Add a new button")
	];

	bindNodeEditorShortcuts() {
		this.unbindNodeEditorShortcuts();
		this.keymapOnNodeEditor.forEach(x => this.hotkeys.add(x));
	}

	unbindNodeEditorShortcuts() {
		this.keymapOnNodeEditor.forEach(x => this.hotkeys.remove(x));
	}

	ngOnDestroy(): void {
		this.unbindNodeEditorShortcuts();
	}

	ngOnInit(): void {
		this.bindNodeEditorShortcuts();
		if (this.chatNode && this.contentTabVisible() && this.chatNode.Sections.length > 0) {
			this.tabGroup.selectedIndex = this.contentTabIndex;
		}
	}

	contentTabVisible() {
		return ['Card', 'Combination'].indexOf(this.chatNode.NodeType) != -1;
	}

	addNewSectionText() {
		if (this.contentTab) {
			let newIndex = this.tabGroup._tabs.toArray().findIndex(x => x.textLabel == this.contentTab.textLabel);
			if (this.tabGroup.selectedIndex == newIndex) {
				this.MH.addSection(this.chatNode, models.SectionType.Text);
			} else {
				this.tabGroup.selectedIndex = newIndex;
				setTimeout(() => {
					requestAnimationFrame(() => {
						this.MH.addSection(this.chatNode, models.SectionType.Text);
					});
				}, 500);
			}
		}
	}

	addNewButton() {
		if (this.buttonsTab) {
			let newIndex = this.tabGroup._tabs.toArray().findIndex(x => x.textLabel == this.buttonsTab.textLabel);
			if (this.tabGroup.selectedIndex == newIndex) {
				this.MH.addButton(this.chatNode);
			} else {
				this.tabGroup.selectedIndex = newIndex;
				setTimeout(() => {
					requestAnimationFrame(() => {
						this.MH.addButton(this.chatNode);
					});
				}, 500);
			}
		}
	}

	SectionType = models.SectionType;
	dismiss() {
		this.dialogRef.close();
	}
	//Model Helpers
	MH: models.ModelHelpers;
}
