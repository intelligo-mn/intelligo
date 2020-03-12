import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Button from '../domain/button.entity';
import { ButtonRepository } from '../repository/button.repository';

@Injectable()
export class ButtonService {
  logger = new Logger('ButtonService');

  constructor(@InjectRepository(ButtonRepository) private buttonRepository: ButtonRepository) {}

  async findById(id: string): Promise<Button | undefined> {
    return await this.buttonRepository.findOne(id);
  }

  async findByfields(options: FindOneOptions<Button>): Promise<Button | undefined> {
    return await this.buttonRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Button>): Promise<[Button[], number]> {
    return await this.buttonRepository.findAndCount(options);
  }

  async save(button: Button): Promise<Button | undefined> {
    return await this.buttonRepository.save(button);
  }

  async update(button: Button): Promise<Button | undefined> {
    return await this.save(button);
  }

  async delete(button: Button): Promise<Button | undefined> {
    return await this.buttonRepository.remove(button);
  }
}
