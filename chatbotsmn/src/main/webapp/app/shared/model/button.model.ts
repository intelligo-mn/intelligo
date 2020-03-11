import { IChatNode } from 'app/shared/model/chat-node.model';

export interface IButton {
  id?: number;
  buttonName?: string;
  buttonText?: string;
  emotion?: number;
  buttonType?: string;
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
  conditionOperator?: string;
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
  chatNode?: IChatNode;
}

export class Button implements IButton {
  constructor(
    public id?: number,
    public buttonName?: string,
    public buttonText?: string,
    public emotion?: number,
    public buttonType?: string,
    public deepLinkUrl?: string,
    public url?: string,
    public itemsSource?: string,
    public allowMultiple?: boolean,
    public bounceTimeout?: number,
    public nextNodeId?: string,
    public defaultButton?: boolean,
    public hidden?: boolean,
    public variableValue?: string,
    public prefixText?: string,
    public postfixText?: string,
    public placeholderText?: string,
    public conditionMatchKey?: string,
    public conditionOperator?: string,
    public conditionMatchValue?: string,
    public postToChat?: boolean,
    public doesRepeat?: boolean,
    public repeatOn?: string,
    public repeatAs?: string,
    public startPosition?: number,
    public maxRepeats?: number,
    public advancedOptions?: boolean,
    public minLength?: number,
    public maxLength?: number,
    public defaultText?: string,
    public isMultiLine?: boolean,
    public contentId?: string,
    public contentEmotion?: string,
    public chatNode?: IChatNode
  ) {
    this.allowMultiple = this.allowMultiple || false;
    this.defaultButton = this.defaultButton || false;
    this.hidden = this.hidden || false;
    this.postToChat = this.postToChat || false;
    this.doesRepeat = this.doesRepeat || false;
    this.advancedOptions = this.advancedOptions || false;
    this.isMultiLine = this.isMultiLine || false;
  }
}
