import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { User } from '../src/domain/user.entity';
import { UserRepository } from '../src/repository/user.repository';

describe('User', () => {
  let app: INestApplication;
  let repository: UserRepository;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };

  const testUser: User = {
    login: 'userTestLogin',
    password: '',
    firstName: 'UserTest',
    lastName: 'UserTest',
    email: 'usertest@localhost.it',
    imageUrl: '',
    activated: true,
    langKey: 'en',
    createdBy: 'testadmin',
    lastModifiedBy: 'testadmin'
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    repository = moduleFixture.get<UserRepository>(UserRepository);
  });

  it('/POST create user', async () => {
    const createdUser: User = (
      await request(app.getHttpServer())
        .post('/api/users')
        .send(testUser)
        .expect(201)
    ).body;

    expect(createdUser.login).toEqual(testUser.login);
    await repository.remove(createdUser);
  });

  it('/GET all users', () => {
    request(app.getHttpServer())
      .get('/api/users')
      .expect(200);
  });

  it('/PUT update user', async () => {
    const savedUser: User = await repository.save(testUser);
    savedUser.firstName = 'Updated Name';

    const updatedUser: User = (
      await request(app.getHttpServer())
        .put('/api/users')
        .send(savedUser)
        .expect(201)
    ).body;

    expect(updatedUser).toEqual(savedUser);

    await repository.remove(savedUser);
  });

  it('/GET user with a login name', async () => {
    const savedUser: User = await repository.save(testUser);

    const getUser: User = (
      await request(app.getHttpServer())
        .get('/api/users/' + savedUser.login)
        .expect(200)
    ).body;

    expect(getUser).toEqual(savedUser);

    await repository.remove(savedUser);
  });

  it('/DELETE user', async () => {
    const savedUser: User = await repository.save(testUser);

    await request(app.getHttpServer())
      .delete('/api/users/' + savedUser.login)
      .expect(204);

    const userUndefined = await repository.findOne(savedUser.id);
    expect(userUndefined).toBeUndefined();
  });

  afterEach(async () => {
    await app.close();
  });
});
