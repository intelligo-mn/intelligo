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
const info_dialog_service_1 = require("../services/info-dialog.service");
let SettingsService = class SettingsService {
    constructor(infoDialog) {
        this.infoDialog = infoDialog;
    }
    loadSavedConnections() {
        var loaded = JSON.parse(localStorage.getItem(SettingKey.SavedConnsKey));
        if (loaded)
            return loaded;
        else
            return [];
    }
    saveSavedConnections(connections) {
        localStorage.setItem(SettingKey.SavedConnsKey, JSON.stringify(connections));
    }
    saveChatProject(chatProjectName, pack, quite, next) {
        chatProjectName += '.intelligo';
        if (quite) {
            localStorage.setItem(chatProjectName, JSON.stringify(pack));
            if (next)
                next();
        }
        else {
            let existing = localStorage.getItem(chatProjectName);
            if (existing) {
                this.infoDialog.confirm('Sure?', 'Chat project the given name already exists. Do you want to overwrite it?', (ok) => {
                    if (ok) {
                        localStorage.setItem(chatProjectName, JSON.stringify(pack));
                        if (next)
                            next();
                    }
                });
            }
            else {
                localStorage.setItem(chatProjectName, JSON.stringify(pack));
                if (next)
                    next();
            }
        }
    }
    getChatProject(chatProjectName) {
        chatProjectName += '.intelligo';
        let existing = localStorage.getItem(chatProjectName);
        if (!existing) {
            this.infoDialog.alert('Not found', `Chat Project with name '${chatProjectName}' does not exist`);
            return null;
        }
        return JSON.parse(existing);
    }
    listSavedChatProjectNames() {
        let savedProjs = [];
        for (var key in localStorage) {
            if (key.endsWith('.intelligo')) {
                let name = key.replace(new RegExp('\.intelligo$'), '');
                savedProjs.push(name);
            }
        }
        return savedProjs.sort((x, y) => ((x && y) ? x.localeCompare(y) : 1));
    }
    renameChatProject(oldName, newName) {
        if (oldName == newName)
            return;
        oldName += ".intelligo";
        newName += ".intelligo";
        let temp = localStorage.getItem(oldName);
        if (!temp) {
            this.infoDialog.alert('Not found', `${oldName} not found`);
            return;
        }
        localStorage.setItem(newName, temp);
        localStorage.removeItem(oldName);
    }
    deleteChatProject(name) {
        name += ".intelligo";
        let exists = localStorage.getItem(name);
        if (!exists) {
            this.infoDialog.alert('Not found', `${name} not found`);
            return false;
        }
        localStorage.removeItem(name);
        return true;
    }
};
SettingsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [info_dialog_service_1.InfoDialogService])
], SettingsService);
exports.SettingsService = SettingsService;
var SettingKey;
(function (SettingKey) {
    SettingKey["SavedConnsKey"] = "SAVED_CONNECTIONS";
})(SettingKey || (SettingKey = {}));
//# sourceMappingURL=settings.service.js.map