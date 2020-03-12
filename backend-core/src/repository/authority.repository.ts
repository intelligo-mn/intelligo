import { EntityRepository, Repository } from 'typeorm';
import { Authority } from '../domain/authority.entity';

@EntityRepository(Authority)
export class AuthorityRepository extends Repository<Authority> {}
