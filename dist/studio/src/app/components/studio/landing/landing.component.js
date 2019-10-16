"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const info_dialog_service_1 = require("../../../services/info-dialog.service");
const globals_service_1 = require("../../../services/globals.service");
const settings_service_1 = require("../../../services/settings.service");
const models = require("../../../models/chatflow.models");
const bson_1 = require("bson");
const core_2 = require("@ngx-translate/core");
let LandingComponent = class LandingComponent {
    constructor(router, globals, infoDialog, settings, translate) {
        this.router = router;
        this.globals = globals;
        this.infoDialog = infoDialog;
        this.settings = settings;
        this.translate = translate;
        this.savedProjects = [];
        this.globals.setPageTitle();
        this.loadSavedProjects();
    }
    loadSavedProjects() {
        this.savedProjects = this.settings.listSavedChatProjectNames();
    }
    ngOnInit() { }
    fileInputChange() {
        let fileInput = this.fileInput.nativeElement;
        if (fileInput.files && fileInput.files[0]) {
            let selectedFile = fileInput.files[0];
            fileInput.value = "";
            if (selectedFile.name.endsWith(".intelligo")) {
                let reader = new FileReader();
                reader.onload = evt => {
                    let pack = JSON.parse(reader.result.toString());
                    let projName = selectedFile.name.replace(new RegExp(".intelligo$"), "");
                    this.settings.saveChatProject(projName, pack, false, () => {
                        this.openChatBotProject(projName);
                    });
                };
                reader.onerror = () => {
                    this.infoDialog.alert(this.translate.instant("home.oops"), this.translate.instant("home.unable-load"));
                };
                reader.readAsText(selectedFile, "UTF-8");
            }
            else
                this.infoDialog.alert(this.translate.instant("home.oops"), this.translate.instant("home.invalid-project-file"));
        }
    }
    searchedProjects() {
        if (this.search && this.search.length > 0)
            return this.savedProjects.filter(x => x.toLowerCase().indexOf(this.search.toLowerCase()) != -1);
        return this.savedProjects;
    }
    addProject() {
        this.infoDialog.prompt(this.translate.instant("home.project-name"), this.translate.instant("home.project-name-description"), name => {
            if (!name)
                return;
            let firstNode = {
                Name: "New Node",
                Id: new bson_1.ObjectID().toHexString(),
                Buttons: [],
                Sections: [],
                NodeType: models.NodeType.Combination,
                TimeoutInMs: 0
            };
            let _id = new bson_1.ObjectID().toHexString();
            let defaultFlow = {
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
    isExpanded(proj) {
        return this.savedProjects.indexOf(proj) == this.savedProjects.length - 1;
    }
    openChatBotProject(name) {
        this.router.navigateByUrl("/studio/designer?proj=" + encodeURIComponent(name));
    }
    renameChatBotProject(name) {
        this.infoDialog.prompt(this.translate.instant("home.rename"), this.translate.instant("home.enter-new-name"), newName => {
            if (newName && name != newName) {
                this.settings.renameChatProject(name, newName);
                this.loadSavedProjects();
            }
        }, name);
    }
    deleteChatBotProject(name) {
        this.infoDialog.confirm(this.translate.instant("home.delete"), this.translate.instant("home.delete-description") + " " + name, ok => {
            if (ok) {
                this.settings.deleteChatProject(name);
                this.loadSavedProjects();
            }
        });
    }
    downloadChatBotProject(name) {
        let pack = this.settings.getChatProject(name);
        this.globals.downloadTextAsFile(name + ".intelligo", JSON.stringify(pack));
    }
};
__decorate([
    core_1.ViewChild("fileInput", { static: false }),
    __metadata("design:type", core_1.ElementRef)
], LandingComponent.prototype, "fileInput", void 0);
LandingComponent = __decorate([
    core_1.Component({
        selector: "app-studio-landing",
        templateUrl: "./landing.component.html",
        styleUrls: ["./landing.component.scss"]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        globals_service_1.GlobalsService,
        info_dialog_service_1.InfoDialogService,
        settings_service_1.SettingsService,
        core_2.TranslateService])
], LandingComponent);
exports.LandingComponent = LandingComponent;
//# sourceMappingURL=landing.component.js.map