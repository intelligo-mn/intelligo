import { Injectable } from '@angular/core';
import { ChatServerConnection } from '../models/app.models';
import { ChatFlowPack } from '../models/chatflow.models';
import { InfoDialogService } from '../services/info-dialog.service';
@Injectable()
export class SettingsService {
  constructor(private infoDialog: InfoDialogService) {}
  loadSavedConnections() {
    var loaded = JSON.parse(
      localStorage.getItem(SettingKey.SavedConnsKey),
    ) as ChatServerConnection[];
    if (loaded) return loaded;
    else return [];
  }

  saveSavedConnections(connections: ChatServerConnection[]) {
    localStorage.setItem(SettingKey.SavedConnsKey, JSON.stringify(connections));
  }

  saveChatProject(
    chatProjectName: string,
    pack: ChatFlowPack,
    quite: boolean,
    next?: () => void,
  ) {
    chatProjectName += '.intelligo';

    if (quite) {
      localStorage.setItem(chatProjectName, JSON.stringify(pack));
      if (next) next();
    } else {
      let existing = localStorage.getItem(chatProjectName);
      if (existing) {
        this.infoDialog.confirm(
          'Sure?',
          'Chat project the given name already exists. Do you want to overwrite it?',
          ok => {
            if (ok) {
              localStorage.setItem(chatProjectName, JSON.stringify(pack));
              if (next) next();
            }
          },
        );
      } else {
        localStorage.setItem(chatProjectName, JSON.stringify(pack));
        if (next) next();
      }
    }
  }

  getChatProject(chatProjectName: string) {
    chatProjectName += '.intelligo';

    let existing = localStorage.getItem(chatProjectName);
    if (!existing) {
      this.infoDialog.alert(
        'Not found',
        `Chat Project with name '${chatProjectName}' does not exist`,
      );
      return null;
    }
    return JSON.parse(existing) as ChatFlowPack;
  }

  listSavedChatProjectNames() {
    let savedProjs = [];
    for (var key in localStorage) {
      if (key.endsWith('.intelligo')) {
        let name = key.replace(new RegExp('.intelligo$'), '');
        savedProjs.push(name);
      }
    }
    return savedProjs.sort((x, y) => (x && y ? x.localeCompare(y) : 1));
  }

  renameChatProject(oldName: string, newName: string) {
    if (oldName == newName) return;

    oldName += '.intelligo';
    newName += '.intelligo';

    let temp = localStorage.getItem(oldName);
    if (!temp) {
      this.infoDialog.alert('Not found', `${oldName} not found`);
      return;
    }
    localStorage.setItem(newName, temp);
    localStorage.removeItem(oldName);
  }

  deleteChatProject(name: string) {
    name += '.intelligo';

    let exists = localStorage.getItem(name);
    if (!exists) {
      this.infoDialog.alert('Not found', `${name} not found`);
      return false;
    }
    localStorage.removeItem(name);
    return true;
  }
}

enum SettingKey {
  SavedConnsKey = 'SAVED_CONNECTIONS',
}
