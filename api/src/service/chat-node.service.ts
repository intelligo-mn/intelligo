import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import ChatNode from '../domain/chat-node.entity';
import { ChatNodeRepository } from '../repository/chat-node.repository';

@Injectable()
export class ChatNodeService {
  logger = new Logger('ChatNodeService');

  constructor(@InjectRepository(ChatNodeRepository) private chatNodeRepository: ChatNodeRepository) {}

  async findById(id: string): Promise<ChatNode | undefined> {
    return await this.chatNodeRepository.findOne(id);
  }

  async findByfields(options: FindOneOptions<ChatNode>): Promise<ChatNode | undefined> {
    return await this.chatNodeRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<ChatNode>): Promise<[ChatNode[], number]> {
    return await this.chatNodeRepository.findAndCount(options);
  }

  async save(chatNode: ChatNode): Promise<ChatNode | undefined> {
    return await this.chatNodeRepository.save(chatNode);
  }

  async update(chatNode: ChatNode): Promise<ChatNode | undefined> {
    return await this.save(chatNode);
  }

  async delete(chatNode: ChatNode): Promise<ChatNode | undefined> {
    return await this.chatNodeRepository.remove(chatNode);
  }
}
