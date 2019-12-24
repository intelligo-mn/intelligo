import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ObjectID } from 'bson';
import * as models from '../../../models/chatflow.models';
import { GlobalsService } from '../../../services/globals.service';
import { InfoDialogService } from '../../../services/info-dialog.service';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-studio-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(
    private router: Router,
    private globals: GlobalsService,
    private infoDialog: InfoDialogService,
    private settings: SettingsService,
    private translate: TranslateService,
  ) {
    this.globals.setPageTitle();
    this.loadSavedProjects();
  }

  @ViewChild('fileInput', { static: false })
  fileInput: ElementRef;

  loadSavedProjects() {
    this.savedProjects = this.settings.listSavedChatProjectNames();
  }

  savedProjects: string[] = [];

  ngOnInit() {}

  fileInputChange() {
    let fileInput = this.fileInput.nativeElement as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      let selectedFile = fileInput.files[0];
      fileInput.value = '';
      if (selectedFile.name.endsWith('.intelligo')) {
        let reader: FileReader = new FileReader();
        reader.onload = evt => {
          let pack = JSON.parse(
            reader.result.toString(),
          ) as models.ChatFlowPack;
          let projName = selectedFile.name.replace(
            new RegExp('.intelligo$'),
            '',
          );
          this.settings.saveChatProject(projName, pack, false, () => {
            this.openChatBotProject(projName);
          });
        };
        reader.onerror = () => {
          this.infoDialog.alert(
            this.translate.instant('home.oops'),
            this.translate.instant('home.unable-load'),
          );
        };
        reader.readAsText(selectedFile, 'UTF-8');
      } else
        this.infoDialog.alert(
          this.translate.instant('home.oops'),
          this.translate.instant('home.invalid-project-file'),
        );
    }
  }
  search: string;
  searchedProjects() {
    if (this.search && this.search.length > 0)
      return this.savedProjects.filter(
        x => x.toLowerCase().indexOf(this.search.toLowerCase()) != -1,
      );
    return this.savedProjects;
  }
  addProject() {
    this.infoDialog.prompt(
      this.translate.instant('home.project-name'),
      this.translate.instant('home.project-name-description'),
      name => {
        if (!name) return;

        let firstNode = {
          Name: 'New Node',
          Id: new ObjectID().toHexString(),
          Buttons: [],
          Sections: [],
          NodeType: models.NodeType.Combination,
          TimeoutInMs: 0,
        };
        let _id = new ObjectID().toHexString();
        let defaultFlow: models.ChatFlowPack = {
          ChatNodes: [firstNode],
          CreatedOn: new Date(),
          UpdatedOn: new Date(),
          NodeLocations: {},
          ProjectId: _id,
          _id: _id,
        };
        defaultFlow.NodeLocations[firstNode.Id] = { X: 500, Y: 500 };
        this.settings.saveChatProject(name, defaultFlow, false, () => {
          this.openChatBotProject(name);
        });
      },
    );
  }

  isExpanded(proj: string) {
    return this.savedProjects.indexOf(proj) == this.savedProjects.length - 1;
  }

  openChatBotProject(name: string) {
    this.router.navigateByUrl(
      '/studio/designer?proj=' + encodeURIComponent(name),
    );
  }

  renameChatBotProject(event: MouseEvent, name: string) {
    event.stopPropagation();

    this.infoDialog.prompt(
      this.translate.instant('home.rename'),
      this.translate.instant('home.enter-new-name'),
      newName => {
        if (newName && name != newName) {
          this.settings.renameChatProject(name, newName);
          this.loadSavedProjects();
        }
      },
      name,
    );
  }
  deleteChatBotProject(event: MouseEvent, name: string) {
    event.stopPropagation();

    this.infoDialog.confirm(
      this.translate.instant('home.delete'),
      this.translate.instant('home.delete-description') + ' ' + name,
      ok => {
        if (ok) {
          this.settings.deleteChatProject(name);
          this.loadSavedProjects();
        }
      },
    );
  }

  downloadChatBotProject(event: MouseEvent, name: string) {
    event.stopPropagation();

    let pack = this.settings.getChatProject(name);
    this.globals.downloadTextAsFile(name + '.intelligo', JSON.stringify(pack));
  }
}
