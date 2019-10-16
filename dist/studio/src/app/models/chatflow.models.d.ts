import { ChatNodeVM } from "../components/studio/chatflow/chatflow.component";
import { NodeEditorComponent } from "../components/studio/nodeeditor/nodeeditor.component";
import { GlobalsService } from "../services/globals.service";
import { InfoDialogService } from "../services/info-dialog.service";
import { MatButton } from "@angular/material";
export declare enum SectionType {
    Image = "Image",
    Text = "Text",
    Graph = "Graph",
    Gif = "Gif",
    Audio = "Audio",
    Video = "Video",
    Link = "Link",
    EmbeddedHtml = "EmbeddedHtml",
    Carousel = "Carousel",
    PrintOTP = "PrintOTP"
}
export declare enum CarouselButtonType {
    NextNode = "NextNode",
    DeepLink = "DeepLink",
    OpenUrl = "OpenUrl"
}
export declare enum NodeType {
    ApiCall = "ApiCall",
    Combination = "Combination",
    Card = "Card",
    JumpToBot = "JumpToBot",
    Condition = "Condition",
    HandoffToAgent = "HandoffToAgent"
}
export declare enum APIMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
    CONNECT = "CONNECT"
}
export declare enum CardPlacement {
    Incoming = "Incoming",
    Outgoing = "Outgoing",
    Center = "Center"
}
export interface TitleCaptionEntity {
    Title?: string;
    Caption?: string;
}
export interface BaseIdEntity {
    _id: string;
}
export interface BaseEntity extends BaseIdEntity {
}
export interface Section extends BaseEntity {
    SectionType: SectionType;
    DelayInMs?: number;
    Hidden?: boolean;
    ContentId?: string;
    ContentEmotion?: string;
}
export interface RepeatableBaseEntity extends BaseEntity {
    DoesRepeat?: boolean;
    RepeatOn?: string;
    RepeatAs?: string;
    StartPosition?: string;
    MaxRepeats?: number;
}
export interface TextSection extends Section {
    Text: string;
}
export interface TitleCaptionSection extends Section, TitleCaptionEntity {
}
export interface TitleCaptionUrlSection extends TitleCaptionSection {
    Url: string;
}
export interface ImageSection extends TitleCaptionUrlSection {
}
export interface VideoSection extends TitleCaptionUrlSection {
}
export interface AudioSection extends TitleCaptionUrlSection {
}
export interface EmbeddedHtmlSection extends TitleCaptionUrlSection {
}
export interface CarouselButton extends RepeatableBaseEntity {
    Url?: string;
    Type?: CarouselButtonType;
    VariableValue?: string;
    NextNodeId?: string;
    Text?: string;
    ContentId?: string;
    ContentEmotion?: string;
}
export interface CarouselItem extends RepeatableBaseEntity, TitleCaptionEntity {
    ImageUrl?: string;
    Buttons?: CarouselButton[];
    ContentId?: string;
    ContentEmotion?: string;
}
export interface CarouselSection extends TitleCaptionSection {
    Items: CarouselItem[];
}
export declare enum ConditionOperator {
    EqualTo = "EqualTo",
    NotEqualTo = "NotEqualTo",
    GreaterThan = "GreaterThan",
    LessThan = "LessThan",
    GreaterThanOrEqualTo = "GreaterThanOrEqualTo",
    LessThanOrEqualTo = "LessThanOrEqualTo",
    Mod = "Mod",
    In = "In",
    NotIn = "NotIn",
    StartsWith = "StartsWith",
    EndsWith = "EndsWith",
    Contains = "Contains",
    Between = "Between",
    IsNull = "IsNull"
}
export declare enum ButtonType {
    OpenUrl = "OpenUrl",
    GetText = "GetText",
    GetNumber = "GetNumber",
    GetAddress = "GetAddress",
    GetEmail = "GetEmail",
    GetPhoneNumber = "GetPhoneNumber",
    GetItemFromSource = "GetItemFromSource",
    GetImage = "GetImage",
    GetAudio = "GetAudio",
    GetVideo = "GetVideo",
    NextNode = "NextNode",
    DeepLink = "DeepLink",
    GetAgent = "GetAgent",
    GetFile = "GetFile",
    ShowConfirmation = "ShowConfirmation",
    FetchChatFlow = "FetchChatFlow",
    GetDate = "GetDate",
    GetTime = "GetTime",
    GetDateTime = "GetDateTime",
    GetLocation = "GetLocation"
}
export interface Button extends BaseIdEntity {
    ButtonName: string;
    ButtonText?: string;
    Emotion?: number;
    ButtonType: ButtonType;
    DeepLinkUrl?: string;
    Url?: string;
    ItemsSource?: string;
    AllowMultiple?: boolean;
    BounceTimeout?: number;
    NextNodeId?: string;
    DefaultButton?: boolean;
    Hidden?: boolean;
    VariableValue?: string;
    PrefixText?: string;
    PostfixText?: string;
    PlaceholderText?: string;
    ConditionMatchKey?: string;
    ConditionOperator?: ConditionOperator;
    ConditionMatchValue?: string;
    PostToChat?: boolean;
    DoesRepeat?: boolean;
    RepeatOn?: string;
    RepeatAs?: string;
    StartPosition?: number;
    MaxRepeats?: number;
    AdvancedOptions?: boolean;
    MinLength?: number;
    MaxLength?: number;
    DefaultText?: string;
    IsMultiLine?: boolean;
    ContentId?: string;
    ContentEmotion?: string;
}
export interface ChatNode {
    Name: string;
    Id: string;
    Emotion?: string;
    NodeType: NodeType;
    Sections: Section[];
    Buttons: Button[];
    VariableName?: string;
    ApiMethod?: APIMethod;
    ApiUrl?: string;
    ApiResponseDataRoot?: string;
    NextNodeId?: string;
    RequiredVariables?: string[];
    GroupName?: string;
    CardHeader?: string;
    CardFooter?: string;
    Placement?: CardPlacement;
    IsStartNode?: boolean;
    IsGoalNode?: boolean;
    TargetBotId?: string;
    TargetNodeId?: string;
    RequestBody?: string;
    Headers?: string;
}
export interface ChatContent {
    ButtonId: string;
    ButtonText: string;
    NodeName?: string;
    NodeId: string;
    Emotion?: string;
    CreatedOn: Date;
    UpdatedOn: Date;
    _id?: string;
    SectionText: string;
    SectionId: string;
    Title: string;
    Caption: string;
}
export interface ChatFlowPack {
    ProjectId: string;
    ChatNodes: ChatNode[];
    NodeLocations?: NodeLocations;
    CreatedOn: Date;
    UpdatedOn: Date;
    _id: string;
}
export interface NodeLocations {
    [key: string]: LayoutPoint;
}
export interface LayoutPoint {
    X: number;
    Y: number;
}
export declare enum EditorType {
    Text = "Text",
    TitleCaptionUrl = "TitleCaptionUrl",
    Carousel = "Carousel"
}
export declare class ModelHelpers {
    globalsService: GlobalsService;
    infoDialog: InfoDialogService;
    constructor(globalsService: GlobalsService, infoDialog: InfoDialogService);
    CarouselButtonType: typeof CarouselButtonType;
    carouselButtonTypes: CarouselButtonType[];
    nodeTypes: NodeType[];
    apiMethods: APIMethod[];
    cardPlacements: CardPlacement[];
    buttonTypes: ButtonType[];
    conditionOperators: ConditionOperator[];
    sectionAlias(section: Section): string;
    chatNodeAlias(chatNode: ChatNode): string;
    chatButtonAlias(btn: Button): string;
    editorTypeFromSectionType(secType: SectionType): EditorType;
    chatButtonFieldHidden(chatNode: ChatNode, btn: Button, fieldName: string): boolean;
    chatNodeApiCallFieldVisible(chatNode: ChatNode, fieldName: string): boolean;
    sectionIcon(section: Section): "fa-picture-o" | "fa-file-o";
    addSection(chatNode: ChatNode, sectionType: SectionType): void;
    sectionMoveUp(chatNode: ChatNode, section: Section): void;
    sectionMoveDown(chatNode: ChatNode, section: Section): void;
    sectionDelete(chatNode: ChatNode, section: Section): void;
    addButton(chatNode: ChatNode): void;
    buttonMoveUp(chatNode: ChatNode, btn: Button): void;
    buttonMoveDown(chatNode: ChatNode, btn: Button): void;
    buttonDelete(chatNode: ChatNode, btn: Button): void;
    nodeDeleteDirect(chatNode: ChatNode): void;
    nodeDelete(chatNode: ChatNode, nodeEditor?: NodeEditorComponent): void;
    nodeContentMenu(chatNodeVM: ChatNodeVM, event: MouseEvent, options: MatButton): void;
    resetOtherStartNodes(chatNode: ChatNode): void;
    test(chatNode: ChatNode): void;
    arrayMove_RAW(array: any[], old_index: any, new_index: any): any[];
    arrayMove(array: any[], old_index: any, new_index: any): void;
    carouselItemAdd(carSection: CarouselSection): void;
    carouselItemMoveUp(carSection: CarouselSection, carItem: CarouselItem): void;
    carouselItemMoveDown(carSection: CarouselSection, carItem: CarouselItem): void;
    carouselItemDelete(carSection: CarouselSection, carItem: CarouselItem): void;
    carouselButtonAdd(carItem: CarouselItem): void;
    carouselButtonMoveUp(carItem: CarouselItem, carButton: CarouselButton): void;
    carouselButtonMoveDown(carItem: CarouselItem, carButton: CarouselButton): void;
    carouselButtonDelete(carItem: CarouselItem, carButton: CarouselButton): void;
}
