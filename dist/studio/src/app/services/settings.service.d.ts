import { ChatServerConnection } from '../models/app.models';
import { ChatFlowPack } from '../models/chatflow.models';
import { InfoDialogService } from '../services/info-dialog.service';
export declare class SettingsService {
    private infoDialog;
    constructor(infoDialog: InfoDialogService);
    loadSavedConnections(): ChatServerConnection[];
    saveSavedConnections(connections: ChatServerConnection[]): void;
    saveChatProject(chatProjectName: string, pack: ChatFlowPack, quite: boolean, next?: () => void): void;
    getChatProject(chatProjectName: string): ChatFlowPack;
    listSavedChatProjectNames(): any[];
    renameChatProject(oldName: string, newName: string): void;
    deleteChatProject(name: string): boolean;
}
