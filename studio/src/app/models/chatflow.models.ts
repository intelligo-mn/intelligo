import { ObjectID } from 'bson';
import {
  ChatFlowComponent,
  ChatNodeVM,
} from '../components/studio/chatflow/chatflow.component';
import { NodeEditorComponent } from '../components/studio/nodeeditor/nodeeditor.component';
import { GlobalsService } from '../services/globals.service';
import { InfoDialogService } from '../services/info-dialog.service';
import { MatButton } from '@angular/material/button';
import * as _ from 'underscore';
//Enum Start
export enum SectionType {
  Image = 'Image',
  Text = 'Text',
  Graph = 'Graph',
  Gif = 'Gif',
  Audio = 'Audio',
  Video = 'Video',
  Link = 'Link',
  EmbeddedHtml = 'EmbeddedHtml',
  Carousel = 'Carousel',
  PrintOTP = 'PrintOTP',
}

export enum CarouselButtonType {
  NextNode = 'NextNode',
  DeepLink = 'DeepLink',
  OpenUrl = 'OpenUrl',
}

export enum NodeType {
  ApiCall = 'ApiCall',
  Combination = 'Combination',
  Card = 'Card',
  JumpToBot = 'JumpToBot',
  Condition = 'Condition',
  HandoffToAgent = 'HandoffToAgent',
}

export enum APIMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  CONNECT = 'CONNECT',
}

export enum CardPlacement {
  Incoming = 'Incoming',
  Outgoing = 'Outgoing',
  Center = 'Center',
}
//Enums End

// Sections - Start
export interface TitleCaptionEntity {
  Title?: string;
  Caption?: string;
}

export interface BaseIdEntity {
  _id: string;
}

export interface BaseEntity extends BaseIdEntity {}

export interface Section extends BaseEntity {
  sectionType: SectionType;
  delayInMs?: number;
  hidden?: boolean;
  contentId?: string;
  contentEmotion?: string;
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

export interface TitleCaptionSection extends Section, TitleCaptionEntity {}

export interface TitleCaptionUrlSection extends TitleCaptionSection {
  Url: string;
}

export interface ImageSection extends TitleCaptionUrlSection {}

export interface VideoSection extends TitleCaptionUrlSection {}

export interface AudioSection extends TitleCaptionUrlSection {}

export interface EmbeddedHtmlSection extends TitleCaptionUrlSection {}

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
// Sections - End
export enum ConditionOperator {
  EqualTo = 'EqualTo',
  NotEqualTo = 'NotEqualTo',
  GreaterThan = 'GreaterThan',
  LessThan = 'LessThan',
  GreaterThanOrEqualTo = 'GreaterThanOrEqualTo',
  LessThanOrEqualTo = 'LessThanOrEqualTo',
  Mod = 'Mod',
  In = 'In',
  NotIn = 'NotIn',
  StartsWith = 'StartsWith',
  EndsWith = 'EndsWith',
  Contains = 'Contains',
  Between = 'Between',
  IsNull = 'IsNull',
}

export enum ButtonType {
  OpenUrl = 'OpenUrl',
  GetText = 'GetText',
  GetNumber = 'GetNumber',
  GetAddress = 'GetAddress',
  GetEmail = 'GetEmail',
  GetPhoneNumber = 'GetPhoneNumber',
  GetItemFromSource = 'GetItemFromSource',
  GetImage = 'GetImage',
  GetAudio = 'GetAudio',
  GetVideo = 'GetVideo',
  NextNode = 'NextNode',
  DeepLink = 'DeepLink',
  GetAgent = 'GetAgent',
  GetFile = 'GetFile',
  ShowConfirmation = 'ShowConfirmation',
  FetchChatFlow = 'FetchChatFlow',
  /// Format: yyyy-MM-dd
  GetDate = 'GetDate',
  /// Format: HH:mm:ss
  GetTime = 'GetTime',
  /// Format: yyyy-MM-ddTHH:mm:ss
  GetDateTime = 'GetDateTime',
  /// Format: [Latitude],[Longitude]
  GetLocation = 'GetLocation',
}

export interface Button extends BaseIdEntity {
  buttonName: string;
  buttonText?: string;
  emotion?: number;
  buttonType: ButtonType;
  deepLinkUrl?: string;
  url?: string;
  itemsSource?: string;
  allowMultiple?: boolean;
  bounceTimeout?: number;
  nextNodeId?: string;
  defaultButton?: boolean;
  hidden?: boolean;
  variableValue?: string;
  prefixText?: string;
  postfixText?: string;
  placeholderText?: string;
  conditionMatchKey?: string;
  conditionOperator?: ConditionOperator;
  conditionMatchValue?: string;
  postToChat?: boolean;
  doesRepeat?: boolean;
  repeatOn?: string;
  repeatAs?: string;
  startPosition?: number;
  maxRepeats?: number;
  advancedOptions?: boolean;
  minLength?: number;
  maxLength?: number;
  defaultText?: string;
  isMultiLine?: boolean;
  contentId?: string;
  contentEmotion?: string;
}

export interface ChatNode {
  name: string;
  id: string;
  emotion?: string;
  nodeType: NodeType;
  sections: Section[];
  buttons: Button[];
  variableName?: string;
  apiMethod?: APIMethod;
  apiUrl?: string;
  apiResponseDataRoot?: string;
  nextNodeId?: string;
  requiredVariables?: string[];
  groupName?: string;
  cardHeader?: string;
  cardFooter?: string;
  placement?: CardPlacement;
  isStartNode?: boolean;
  isGoalNode?: boolean;
  targetBotId?: string;
  targetNodeId?: string;
  requestBody?: string;
  headers?: string;
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

//WebNodeLocations: NodeLocations;
export interface ChatFlowPack {
  projectId: string;
  chatNodes: ChatNode[];
  nodeLocations?: NodeLocations;
  createdOn: Date;
  updatedOn: Date;
  _id: string;
}

export interface NodeLocations {
  [key: string]: LayoutPoint;
}

export interface LayoutPoint {
  X: number;
  Y: number;
}

export enum EditorType {
  Text = 'Text',
  TitleCaptionUrl = 'TitleCaptionUrl',
  Carousel = 'Carousel',
}

export class ModelHelpers {
  constructor(
    public globalsService: GlobalsService,
    public infoDialog: InfoDialogService,
  ) {}

  CarouselButtonType = CarouselButtonType;

  carouselButtonTypes: CarouselButtonType[] = [
    CarouselButtonType.NextNode,
    CarouselButtonType.OpenUrl,
    CarouselButtonType.DeepLink,
  ];

  nodeTypes: NodeType[] = [
    NodeType.ApiCall,
    NodeType.Combination,
    //NodeType.Card,
    NodeType.Condition,
    NodeType.HandoffToAgent,
    NodeType.JumpToBot,
  ];
  apiMethods: APIMethod[] = [
    APIMethod.GET,
    APIMethod.POST,
    APIMethod.PUT,
    APIMethod.HEAD,
    APIMethod.OPTIONS,
    APIMethod.DELETE,
    APIMethod.CONNECT,
  ];
  cardPlacements: CardPlacement[] = [
    CardPlacement.Center,
    CardPlacement.Incoming,
    CardPlacement.Outgoing,
  ];
  buttonTypes: ButtonType[] = [
    ButtonType.DeepLink,
    //ButtonType.FetchChatFlow,
    ButtonType.GetAddress,
    //ButtonType.GetAgent,
    ButtonType.GetAudio,
    ButtonType.GetDate,
    //ButtonType.GetDateTime,
    ButtonType.GetEmail,
    ButtonType.GetImage,
    ButtonType.GetItemFromSource,
    ButtonType.GetLocation,
    ButtonType.GetNumber,
    ButtonType.GetPhoneNumber,
    ButtonType.GetText,
    ButtonType.GetTime,
    ButtonType.GetVideo,
    ButtonType.GetFile,
    ButtonType.NextNode,
    ButtonType.OpenUrl,
    //ButtonType.ShowConfirmation
  ];
  conditionOperators: ConditionOperator[] = [
    ConditionOperator.EqualTo,
    ConditionOperator.NotEqualTo,
    ConditionOperator.GreaterThan,
    ConditionOperator.LessThan,
    ConditionOperator.GreaterThanOrEqualTo,
    ConditionOperator.LessThanOrEqualTo,
    ConditionOperator.Mod,
    ConditionOperator.In,
    ConditionOperator.NotIn,
    ConditionOperator.StartsWith,
    ConditionOperator.EndsWith,
    ConditionOperator.Contains,
    ConditionOperator.Between,
    ConditionOperator.IsNull,
  ];
  sectionAlias(section: Section) {
    switch (section.sectionType) {
      case SectionType.Text: {
        let ts = section as TextSection;
        return ts.Text || ts.sectionType;
      }
      case SectionType.Image:
      case SectionType.Audio:
      case SectionType.Video:
      case SectionType.EmbeddedHtml:
      case SectionType.Gif:
      case SectionType.Graph:
      case SectionType.Carousel: {
        let tcs = section as TitleCaptionSection;
        return tcs.Title || tcs.Caption || tcs.sectionType;
      }
      default:
        return section.sectionType;
    }
  }

  chatNodeAlias(chatNode: ChatNode) {
    return chatNode.name || chatNode.nodeType;
  }

  chatButtonAlias(btn: Button) {
    return btn.buttonName || btn.buttonText || btn.buttonType;
  }

  editorTypeFromSectionType(secType: SectionType): EditorType {
    switch (secType) {
      case SectionType.Text:
        return EditorType.Text;
      case SectionType.Image:
      case SectionType.Audio:
      case SectionType.Video:
      case SectionType.Gif:
      case SectionType.PrintOTP:
      case SectionType.EmbeddedHtml:
        return EditorType.TitleCaptionUrl;
      case SectionType.Carousel:
        return EditorType.Carousel;
      default:
        return EditorType.Text;
    }
  }
  chatButtonFieldHidden(chatNode: ChatNode, btn: Button, fieldName: string) {
    const HIDDEN = true;

    if (
      ['ConditionMatchKey', 'ConditionOperator', 'ConditionMatchValue'].indexOf(
        fieldName,
      ) != -1
    )
      return [NodeType.ApiCall, NodeType.Condition].indexOf(
        chatNode.nodeType,
      ) != -1
        ? !HIDDEN
        : HIDDEN;

    if (fieldName == 'ButtonType' || fieldName == 'ButtonText')
      return [NodeType.ApiCall, NodeType.Condition].indexOf(
        chatNode.nodeType,
      ) != -1
        ? HIDDEN
        : !HIDDEN;

    //Following fields must only be visible for 'GetText' Buttons
    if (
      ['MinLength', 'MaxLength', 'IsMultiLine', 'DefaultText'].indexOf(
        fieldName,
      ) != -1
    )
      return btn.buttonType == ButtonType.GetText ? false : true;

    //Following fields must only be visible for 'GetItemFromSource ' Buttons
    if (['AllowMultiple', 'ItemsSource'].indexOf(fieldName) != -1)
      return btn.buttonType == ButtonType.GetItemFromSource ? !HIDDEN : HIDDEN;

    var hidden = false;
    switch (btn.buttonType) {
      case ButtonType.OpenUrl:
        hidden = !(['Url'].indexOf(fieldName) != -1); //Show only Url field
        break;
      case ButtonType.GetText:
      case ButtonType.GetNumber:
      case ButtonType.GetAddress:
      case ButtonType.GetEmail:
      case ButtonType.GetPhoneNumber:
        //if the passed button property is present in the list, that field should not be visible. here placeholder text should not be visible if button type is input(Get[X]) type
        hidden =
          [
            'NextNodeId',
            'DeepLinkUrl',
            'Url',
            'ConditionMatchKey',
            'ConditionOperator',
            'ConditionMatchValue',
          ].indexOf(fieldName) != -1;
        break;
      case ButtonType.GetTime:
      case ButtonType.GetDate:
      case ButtonType.GetDateTime:
      case ButtonType.GetLocation:
        hidden =
          [
            'NextNodeId',
            'DeepLinkUrl',
            'Url',
            'ConditionMatchKey',
            'ConditionOperator',
            'ConditionMatchValue',
            'PostfixText',
            'PrefixText',
            'PlaceholderText',
          ].indexOf(fieldName) != -1;
        break;
      case ButtonType.GetImage:
      case ButtonType.GetFile:
      case ButtonType.GetAudio:
      case ButtonType.GetVideo:
        //if the passed button property is present in the list, that field should not be visible. here placeholder text should not be visible if button type is input(Get[X]) type
        hidden =
          [
            'NextNodeId',
            'DeepLinkUrl',
            'PlaceholderText',
            'Url',
            'PostfixText',
            'PrefixText',
            'ConditionMatchKey',
            'ConditionOperator',
            'ConditionMatchValue',
          ].indexOf(fieldName) != -1;
        break;
      case ButtonType.GetItemFromSource:
        hidden =
          [
            'NextNodeId',
            'DeepLinkUrl',
            'ConditionMatchKey',
            'ConditionOperator',
            'ConditionMatchValue',
            'PlaceholderText',
          ].indexOf(fieldName) != -1;
        break;
      case ButtonType.NextNode:
        hidden =
          [
            'NextNodeId',
            'PostfixText',
            'PrefixText',
            'DeepLinkUrl',
            'Url',
            'PlaceholderText',
          ].indexOf(fieldName) != -1;
        break;
      case ButtonType.DeepLink:
        hidden =
          [
            'NextNodeId',
            'Url',
            'PostfixText',
            'PrefixText',
            'PlaceholderText',
            'ConditionMatchKey',
            'ConditionOperator',
            'ConditionMatchValue',
          ].indexOf(fieldName) != -1;
        break;
      case ButtonType.GetAgent:
        hidden = true; //Hide all. Probably!
        break;
      case ButtonType.ShowConfirmation:
        hidden = true; //Hide all. Probably!
        break;
      case ButtonType.FetchChatFlow:
        hidden =
          [
            'DeepLinkUrl',
            'PlaceholderText',
            'PostfixText',
            'PrefixText',
            'ConditionMatchKey',
            'ConditionOperator',
            'ConditionMatchValue',
          ].indexOf(fieldName) != -1;
        break;
      default:
        break;
    }
    return hidden;
  }
  chatNodeApiCallFieldVisible(chatNode: ChatNode, fieldName: string) {
    switch (chatNode.apiMethod) {
      case APIMethod.POST:
      case APIMethod.PUT: {
        if (fieldName == 'RequestBody') return true;
        if (fieldName == 'RequiredVariables') return false;
      }
      default: {
        if (fieldName == 'RequestBody') return false;
        if (fieldName == 'RequiredVariables') return true;
      }
    }
    return true;
  }
  sectionIcon(section: Section) {
    switch (section.sectionType) {
      case SectionType.Image:
        return 'fa-picture-o';
      default:
        return 'fa-file-o';
    }
  }

  addSection(chatNode: ChatNode, sectionType: SectionType) {
    if (chatNode.nodeType == NodeType.Card) {
      if (chatNode.sections && chatNode.sections.length >= 1) {
        this.infoDialog.alert(
          'Not allowed',
          'In a Card Node, only one content item can be added.',
        );
        return;
      }
      if ([SectionType.Text, SectionType.Image].indexOf(sectionType) == -1) {
        this.infoDialog.alert(
          'Not allowed',
          'In a Card Node, only Text and Image content types can be added.',
        );
        return;
      }
    }
    switch (sectionType) {
      case SectionType.Carousel:
        chatNode.sections.push(<CarouselSection>{
          sectionType: sectionType,
          _id: new ObjectID().toHexString(),
          Items: [],
        });
        break;
      default:
        chatNode.sections.push({
          sectionType: sectionType,
          _id: new ObjectID().toHexString(),
        });
        break;
    }
    this.globalsService.chatFlowComponent.updateLayout();
  }

  sectionMoveUp(chatNode: ChatNode, section: Section) {
    var current = chatNode.sections.indexOf(section);
    if (current != -1) this.arrayMove(chatNode.sections, current, current - 1);
  }
  sectionMoveDown(chatNode: ChatNode, section: Section) {
    var current = chatNode.sections.indexOf(section);
    if (current != -1) this.arrayMove(chatNode.sections, current, current + 1);
  }
  sectionDelete(chatNode: ChatNode, section: Section) {
    var current = chatNode.sections.indexOf(section);
    if (current != -1) {
      this.infoDialog.confirm(
        'Sure?',
        `Delete section '${this.sectionAlias(section)}'`,
        ok => {
          if (ok) {
            chatNode.sections.splice(current, 1);
            this.globalsService.chatFlowComponent.chatFlowNetwork.updateChatNodeConnections();
            this.globalsService.chatFlowComponent.updateLayout();
          }
        },
      );
    }
  }
  addButton(chatNode: ChatNode) {
    if (chatNode.nodeType == NodeType.Card) {
      if (chatNode.buttons && chatNode.buttons.length >= 2) {
        this.infoDialog.alert(
          'No allowed',
          'Card node cannot have more than two buttons',
        );
        return;
      }
    }
    chatNode.buttons.push({
      _id: new ObjectID().toHexString(),
      buttonName: 'New Button',
      buttonType: ButtonType.NextNode,
    });

    this.globalsService.chatFlowComponent.updateLayout();
  }

  buttonMoveUp(chatNode: ChatNode, btn: Button) {
    var current = chatNode.buttons.indexOf(btn);
    if (current != -1) this.arrayMove(chatNode.buttons, current, current - 1);
  }
  buttonMoveDown(chatNode: ChatNode, btn: Button) {
    var current = chatNode.buttons.indexOf(btn);
    if (current != -1) this.arrayMove(chatNode.buttons, current, current + 1);
  }
  buttonDelete(chatNode: ChatNode, btn: Button) {
    var current = chatNode.buttons.indexOf(btn);
    if (current != -1) {
      this.infoDialog.confirm(
        'Sure?',
        `Delete button '${this.chatButtonAlias(btn)}'?`,
        ok => {
          if (ok) {
            chatNode.buttons.splice(current, 1);

            this.globalsService.chatFlowComponent.chatFlowNetwork.updateChatNodeConnections();
            this.globalsService.chatFlowComponent.updateLayout();
          }
        },
      );
    }
  }

  nodeDeleteDirect(chatNode: ChatNode) {
    let network = this.globalsService.chatFlowComponent.chatFlowNetwork;
    var elementIdxToDel = network.chatNodeVMs.findIndex(
      x => x.chatNode.id == chatNode.id,
    );
    network.chatNodeVMs.splice(elementIdxToDel, 1);

    network.updateChatNodeConnections();
    network.parent.updateLayout();
  }

  nodeDelete(chatNode: ChatNode, nodeEditor?: NodeEditorComponent) {
    this.infoDialog.confirm(
      'Sure?',
      `Are you sure you want to delete '${chatNode.name ||
        chatNode.nodeType}' chat node?`,
      ok => {
        if (ok) {
          this.nodeDeleteDirect(chatNode);
          if (nodeEditor) nodeEditor.dialogRef.close();
        }
      },
    );
  }

  nodeContentMenu(
    chatNodeVM: ChatNodeVM,
    event: MouseEvent,
    options: MatButton,
  ) {
    event.preventDefault();

    let btn = options._elementRef.nativeElement as HTMLButtonElement;
    btn.click();
  }

  resetOtherStartNodes(chatNode: ChatNode) {
    this.globalsService.chatFlowComponent.chatFlowNetwork.chatNodeVMs.forEach(
      vm => {
        if (vm.chatNode != chatNode) vm.chatNode.isStartNode = false;
      },
    );
  }

  test(chatNode: ChatNode) {
    this.infoDialog.alert(
      'Alert',
      JSON.stringify(chatNode.sections[chatNode.sections.length - 1], null, 4),
    );
  }

  arrayMove_RAW(array: any[], old_index, new_index) {
    if (new_index >= array.length) {
      var k = new_index - array.length;
      while (k-- + 1) {
        array.push(undefined);
      }
    }
    array.splice(new_index, 0, array.splice(old_index, 1)[0]);
    return array; // for testing purposes
  }

  arrayMove(array: any[], old_index, new_index) {
    if (new_index >= array.length || new_index < 0)
      throw 'new index cannot be greater than or equal to array length or less than zero';

    array.splice(new_index, 0, array.splice(old_index, 1)[0]);
  }

  carouselItemAdd(carSection: CarouselSection) {
    carSection.Items.push({
      Buttons: [],
      Title: 'New Carousel Item',
      _id: new ObjectID().toHexString(),
    });
  }
  carouselItemMoveUp(carSection: CarouselSection, carItem: CarouselItem) {
    var current = carSection.Items.indexOf(carItem);
    if (current != -1) this.arrayMove(carSection.Items, current, current - 1);
  }
  carouselItemMoveDown(carSection: CarouselSection, carItem: CarouselItem) {
    var current = carSection.Items.indexOf(carItem);
    if (current != -1) this.arrayMove(carSection.Items, current, current + 1);
  }
  carouselItemDelete(carSection: CarouselSection, carItem: CarouselItem) {
    this.infoDialog.confirm(
      'Sure?',
      `Delete carousel item ${carItem.Title}?`,
      ok => {
        var current = carSection.Items.indexOf(carItem);
        if (current != -1) carSection.Items.splice(current, 1);
      },
    );
  }

  carouselButtonAdd(carItem: CarouselItem) {
    carItem.Buttons.push({
      Text: 'New Button',
      Type: CarouselButtonType.NextNode,
      _id: new ObjectID().toHexString(),
    });
  }

  carouselButtonMoveUp(carItem: CarouselItem, carButton: CarouselButton) {
    var current = carItem.Buttons.indexOf(carButton);
    if (current != -1) this.arrayMove(carItem.Buttons, current, current - 1);
  }
  carouselButtonMoveDown(carItem: CarouselItem, carButton: CarouselButton) {
    var current = carItem.Buttons.indexOf(carButton);
    if (current != -1) this.arrayMove(carItem.Buttons, current, current + 1);
  }
  carouselButtonDelete(carItem: CarouselItem, carButton: CarouselButton) {
    this.infoDialog.confirm(
      'Sure?',
      `Delete carousel button ${carButton.Text}?`,
      ok => {
        var current = carItem.Buttons.indexOf(carButton);
        if (current != -1) carItem.Buttons.splice(current, 1);
      },
    );
  }
}
