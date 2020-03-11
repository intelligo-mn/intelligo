import { EntityRepository, Repository } from 'typeorm';
import ChatProject from '../domain/chat-project.entity';

@EntityRepository(ChatProject)
export class ChatProjectRepository extends Repository<ChatProject> {}
