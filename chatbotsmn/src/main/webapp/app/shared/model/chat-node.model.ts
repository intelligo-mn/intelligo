import { ISection } from 'app/shared/model/section.model';
import { IButton } from 'app/shared/model/button.model';
import { APIMethod } from 'app/shared/model/enumerations/api-method.model';

export interface IChatNode {
  id?: number;
  name?: string;
  emotion?: string;
  chatNodeType?: string;
  variableName?: string;
  apiMethod?: APIMethod;
  apiUrl?: string;
  apiResponseDataRoot?: string;
  nextNodeId?: string;
  requiredVariables?: string;
  groupName?: string;
  cardHeader?: string;
  cardFooter?: string;
  isStartNode?: boolean;
  isGoalNode?: boolean;
  targetBotId?: string;
  targetNodeId?: string;
  sections?: ISection;
  buttons?: IButton;
}

export class ChatNode implements IChatNode {
  constructor(
    public id?: number,
    public name?: string,
    public emotion?: string,
    public chatNodeType?: string,
    public variableName?: string,
    public apiMethod?: APIMethod,
    public apiUrl?: string,
    public apiResponseDataRoot?: string,
    public nextNodeId?: string,
    public requiredVariables?: string,
    public groupName?: string,
    public cardHeader?: string,
    public cardFooter?: string,
    public isStartNode?: boolean,
    public isGoalNode?: boolean,
    public targetBotId?: string,
    public targetNodeId?: string,
    public sections?: ISection,
    public buttons?: IButton
  ) {
    this.isStartNode = this.isStartNode || false;
    this.isGoalNode = this.isGoalNode || false;
  }
}
