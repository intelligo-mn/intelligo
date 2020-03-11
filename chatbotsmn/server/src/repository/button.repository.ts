import { EntityRepository, Repository } from 'typeorm';
import Button from '../domain/button.entity';

@EntityRepository(Button)
export class ButtonRepository extends Repository<Button> {}
