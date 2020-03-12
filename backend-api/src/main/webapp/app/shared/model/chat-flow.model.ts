import { IChatNode } from 'app/shared/model/chat-node.model';
import { IChatProject } from 'app/shared/model/chat-project.model';

export interface IChatFlow {
  id?: number;
  createdOn?: string;
  updatedOn?: string;
  nodeLocations?: string;
  chatNodes?: IChatNode[];
  chatProject?: IChatProject;
}

export class ChatFlow implements IChatFlow {
  constructor(
    public id?: number,
    public createdOn?: string,
    public updatedOn?: string,
    public nodeLocations?: string,
    public chatNodes?: IChatNode[],
    public chatProject?: IChatProject
  ) {}
}
