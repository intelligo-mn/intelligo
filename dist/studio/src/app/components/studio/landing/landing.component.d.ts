import { OnInit, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { InfoDialogService } from "../../../services/info-dialog.service";
import { GlobalsService } from "../../../services/globals.service";
import { SettingsService } from "../../../services/settings.service";
import { TranslateService } from '@ngx-translate/core';
export declare class LandingComponent implements OnInit {
    private router;
    private globals;
    private infoDialog;
    private settings;
    private translate;
    constructor(router: Router, globals: GlobalsService, infoDialog: InfoDialogService, settings: SettingsService, translate: TranslateService);
    fileInput: ElementRef;
    loadSavedProjects(): void;
    savedProjects: string[];
    ngOnInit(): void;
    fileInputChange(): void;
    search: string;
    searchedProjects(): string[];
    addProject(): void;
    isExpanded(proj: string): boolean;
    openChatBotProject(name: string): void;
    renameChatBotProject(name: string): void;
    deleteChatBotProject(name: string): void;
    downloadChatBotProject(name: string): void;
}
