import { EntityRepository, Repository } from 'typeorm';
import ChatFlow from '../domain/chat-flow.entity';

@EntityRepository(ChatFlow)
export class ChatFlowRepository extends Repository<ChatFlow> {}
