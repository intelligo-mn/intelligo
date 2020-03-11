import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import ChatProject from '../domain/chat-project.entity';
import { ChatProjectRepository } from '../repository/chat-project.repository';

@Injectable()
export class ChatProjectService {
  logger = new Logger('ChatProjectService');

  constructor(@InjectRepository(ChatProjectRepository) private chatProjectRepository: ChatProjectRepository) {}

  async findById(id: string): Promise<ChatProject | undefined> {
    return await this.chatProjectRepository.findOne(id);
  }

  async findByfields(options: FindOneOptions<ChatProject>): Promise<ChatProject | undefined> {
    return await this.chatProjectRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<ChatProject>): Promise<[ChatProject[], number]> {
    return await this.chatProjectRepository.findAndCount(options);
  }

  async save(chatProject: ChatProject): Promise<ChatProject | undefined> {
    return await this.chatProjectRepository.save(chatProject);
  }

  async update(chatProject: ChatProject): Promise<ChatProject | undefined> {
    return await this.save(chatProject);
  }

  async delete(chatProject: ChatProject): Promise<ChatProject | undefined> {
    return await this.chatProjectRepository.remove(chatProject);
  }
}
