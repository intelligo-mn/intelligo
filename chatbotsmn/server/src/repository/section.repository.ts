import { EntityRepository, Repository } from 'typeorm';
import Section from '../domain/section.entity';

@EntityRepository(Section)
export class SectionRepository extends Repository<Section> {}
