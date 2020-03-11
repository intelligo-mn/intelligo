import { IChatFlow } from 'app/shared/model/chat-flow.model';

export interface IChatProject {
  id?: number;
  name?: string;
  status?: string;
  userId?: string;
  flow?: IChatFlow;
}

export class ChatProject implements IChatProject {
  constructor(public id?: number, public name?: string, public status?: string, public userId?: string, public flow?: IChatFlow) {}
}
