import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import ChatFlow from '../domain/chat-flow.entity';
import { ChatFlowRepository } from '../repository/chat-flow.repository';

@Injectable()
export class ChatFlowService {
  logger = new Logger('ChatFlowService');

  constructor(@InjectRepository(ChatFlowRepository) private chatFlowRepository: ChatFlowRepository) {}

  async findById(id: string): Promise<ChatFlow | undefined> {
    return await this.chatFlowRepository.findOne(id);
  }

  async findByfields(options: FindOneOptions<ChatFlow>): Promise<ChatFlow | undefined> {
    return await this.chatFlowRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<ChatFlow>): Promise<[ChatFlow[], number]> {
    return await this.chatFlowRepository.findAndCount(options);
  }

  async save(chatFlow: ChatFlow): Promise<ChatFlow | undefined> {
    return await this.chatFlowRepository.save(chatFlow);
  }

  async update(chatFlow: ChatFlow): Promise<ChatFlow | undefined> {
    return await this.save(chatFlow);
  }

  async delete(chatFlow: ChatFlow): Promise<ChatFlow | undefined> {
    return await this.chatFlowRepository.remove(chatFlow);
  }
}
