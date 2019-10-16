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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const material_1 = require("@angular/material");
const angular2_hotkeys_1 = require("angular2-hotkeys");
const models = require("../../../models/chatflow.models");
const chatflow_service_1 = require("../../../services/chatflow.service");
const globals_service_1 = require("../../../services/globals.service");
const info_dialog_service_1 = require("../../../services/info-dialog.service");
let NodeEditorComponent = class NodeEditorComponent {
    constructor(chatFlowService, hotkeys, infoDialog, dialogRef, chatNode, globalsService) {
        this.chatFlowService = chatFlowService;
        this.hotkeys = hotkeys;
        this.infoDialog = infoDialog;
        this.dialogRef = dialogRef;
        this.chatNode = chatNode;
        this.globalsService = globalsService;
        this.contentTabIndex = 1;
        this.keymapOnNodeEditor = [
            new angular2_hotkeys_1.Hotkey(["t", "alt+t"], (e, s) => {
                this.addNewSectionText();
                return false;
            }, [], "Add a new text content (if applicable)"),
            new angular2_hotkeys_1.Hotkey(["b", "alt+b"], (e, s) => {
                this.addNewButton();
                return false;
            }, [], "Add a new button")
        ];
        this.SectionType = models.SectionType;
        this.MH = new models.ModelHelpers(globalsService, infoDialog);
    }
    bindNodeEditorShortcuts() {
        this.unbindNodeEditorShortcuts();
        this.keymapOnNodeEditor.forEach(x => this.hotkeys.add(x));
    }
    unbindNodeEditorShortcuts() {
        this.keymapOnNodeEditor.forEach(x => this.hotkeys.remove(x));
    }
    ngOnDestroy() {
        this.unbindNodeEditorShortcuts();
    }
    ngOnInit() {
        this.bindNodeEditorShortcuts();
        if (this.chatNode &&
            this.contentTabVisible() &&
            this.chatNode.Sections.length > 0) {
            this.tabGroup.selectedIndex = this.contentTabIndex;
        }
    }
    contentTabVisible() {
        return ["Card", "Combination"].indexOf(this.chatNode.NodeType) != -1;
    }
    addNewSectionText() {
        if (this.contentTab) {
            let newIndex = this.tabGroup._tabs
                .toArray()
                .findIndex(x => x.textLabel == this.contentTab.textLabel);
            if (this.tabGroup.selectedIndex == newIndex) {
                this.MH.addSection(this.chatNode, models.SectionType.Text);
            }
            else {
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
            let newIndex = this.tabGroup._tabs
                .toArray()
                .findIndex(x => x.textLabel == this.buttonsTab.textLabel);
            if (this.tabGroup.selectedIndex == newIndex) {
                this.MH.addButton(this.chatNode);
            }
            else {
                this.tabGroup.selectedIndex = newIndex;
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        this.MH.addButton(this.chatNode);
                    });
                }, 500);
            }
        }
    }
    dismiss() {
        this.dialogRef.close();
    }
};
__decorate([
    core_1.ViewChild("nodeInfoTab", { static: false }),
    __metadata("design:type", material_1.MatTab)
], NodeEditorComponent.prototype, "nodeInfoTab", void 0);
__decorate([
    core_1.ViewChild("contentTab", { static: false }),
    __metadata("design:type", material_1.MatTab)
], NodeEditorComponent.prototype, "contentTab", void 0);
__decorate([
    core_1.ViewChild("buttonsTab", { static: false }),
    __metadata("design:type", material_1.MatTab)
], NodeEditorComponent.prototype, "buttonsTab", void 0);
__decorate([
    core_1.ViewChild("tabGroup", { static: false }),
    __metadata("design:type", material_1.MatTabGroup)
], NodeEditorComponent.prototype, "tabGroup", void 0);
NodeEditorComponent = __decorate([
    core_1.Component({
        selector: "app-nodeeditor",
        templateUrl: "./nodeeditor.component.html",
        styleUrls: ["./nodeeditor.component.scss"]
    }),
    __param(4, core_1.Inject(material_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [chatflow_service_1.ChatFlowService,
        angular2_hotkeys_1.HotkeysService,
        info_dialog_service_1.InfoDialogService,
        material_1.MatDialogRef, Object, globals_service_1.GlobalsService])
], NodeEditorComponent);
exports.NodeEditorComponent = NodeEditorComponent;
//# sourceMappingURL=nodeeditor.component.js.map