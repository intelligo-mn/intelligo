import { Title } from "@angular/platform-browser";
import { ChatFlowComponent } from "../components/studio/chatflow/chatflow.component";
import * as models from "../models/chatflow.models";
import { AddressInput, GeoLoc, IntelligoDate, IntelligoTime } from "../models/intelligo-chat.models";
export declare class GlobalsService {
    private title;
    constructor(title: Title);
    appName: string;
    chatFlowComponent: ChatFlowComponent;
    loading: boolean;
    setPageTitle(title?: string): void;
    downloadTextAsFile(filename: any, text: any): void;
    uuidv4(): any;
    getVariableType(x: any): VariableType;
    anaDateDisplay(anaDate: IntelligoDate): string;
    anaTimeDisplay(anaTime: IntelligoTime): string;
    anaAddressDisplay(anaAddress: AddressInput): string;
    anaLocationDisplay(anaLoc: GeoLoc): string;
    EMAIL_REGEX: RegExp;
    emailValid(val: string): boolean;
    PHONE_REGEX: RegExp;
    phoneValid(val: string): boolean;
    pwdMatch(p1: string, p2: string): boolean;
    normalizeChatNodes(chatNodes: models.ChatNode[]): models.ChatNode[];
    cloneNode(srcNode: models.ChatNode): false | models.ChatNode;
}
export declare enum VariableType {
    Array = 0,
    String = 1,
    Object = 2,
    Other = 3
}
