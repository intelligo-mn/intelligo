import { EntityRepository, Repository } from 'typeorm';
import ChatNode from '../domain/chat-node.entity';

@EntityRepository(ChatNode)
export class ChatNodeRepository extends Repository<ChatNode> {}
