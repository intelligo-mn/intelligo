import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Section from '../domain/section.entity';
import { SectionRepository } from '../repository/section.repository';

@Injectable()
export class SectionService {
  logger = new Logger('SectionService');

  constructor(@InjectRepository(SectionRepository) private sectionRepository: SectionRepository) {}

  async findById(id: string): Promise<Section | undefined> {
    return await this.sectionRepository.findOne(id);
  }

  async findByfields(options: FindOneOptions<Section>): Promise<Section | undefined> {
    return await this.sectionRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Section>): Promise<[Section[], number]> {
    return await this.sectionRepository.findAndCount(options);
  }

  async save(section: Section): Promise<Section | undefined> {
    return await this.sectionRepository.save(section);
  }

  async update(section: Section): Promise<Section | undefined> {
    return await this.save(section);
  }

  async delete(section: Section): Promise<Section | undefined> {
    return await this.sectionRepository.remove(section);
  }
}
