import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../domain/user.entity';
import { Authority } from '../domain/authority.entity';

export class SeedUsersRoles1570200490072 implements MigrationInterface {
  role1: Authority = { name: 'ROLE_ADMIN' };

  role2: Authority = { name: 'ROLE_USER' };

  user1: User = {
    login: 'system',
    password: 'system',
    firstName: 'System',
    lastName: 'System',
    email: 'system@localhost.it',
    imageUrl: '',
    activated: true,
    langKey: 'en',
    createdBy: 'system',
    lastModifiedBy: 'system'
  };

  user2: User = {
    login: 'anonymoususer',
    password: 'anonymoususer',
    firstName: 'Anonymous',
    lastName: 'User',
    email: 'anonymoususer@localhost.it',
    imageUrl: '',
    activated: true,
    langKey: 'en',
    createdBy: 'system',
    lastModifiedBy: 'system'
  };

  user3: User = {
    login: 'admin',
    password: 'admin',
    firstName: 'Administrator',
    lastName: 'Administrator',
    email: 'admin@localhost.it',
    imageUrl: '',
    activated: true,
    langKey: 'en',
    createdBy: 'system',
    lastModifiedBy: 'system'
  };

  user4: User = {
    login: 'user',
    password: 'user',
    firstName: 'User',
    lastName: 'User',
    email: 'user@localhost.it',
    imageUrl: '',
    activated: true,
    langKey: 'en',
    createdBy: 'system',
    lastModifiedBy: 'system'
  };

  public async up(queryRunner: QueryRunner): Promise<any> {
    const conn = queryRunner.connection;
    await conn
      .createQueryBuilder()
      .insert()
      .into(Authority)
      .values([this.role1, this.role2])
      .execute();

    await conn
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([this.user1, this.user2, this.user3, this.user4])
      .execute();

    await conn
      .createQueryBuilder()
      .relation(User, 'authorities')
      .of([this.user1, this.user3])
      .add([this.role1, this.role2]);

    await conn
      .createQueryBuilder()
      .relation(User, 'authorities')
      .of(this.user4)
      .add([this.role2]);
  }

  // eslint-disable-next-line
  public async down(queryRunner: QueryRunner): Promise<any> {}
}
