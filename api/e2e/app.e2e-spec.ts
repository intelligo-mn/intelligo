import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { UserLoginDTO } from '../src/service/dto/user-login.dto';

describe('App', () => {
  let app: INestApplication;

  const infoService = {
    activeProfiles: 'no',
    'display-ribbon-on-profiles': 'no'
  };
  const testUserLogin: UserLoginDTO = {
    username: 'system',
    password: 'system',
    rememberMe: true
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET up running info OK', () =>
    request(app.getHttpServer())
      .get('/management/info')
      .expect(200)
      .expect(infoService));

  it('/POST security jwt adding OK', () =>
    request(app.getHttpServer())
      .post('/api/authenticate')
      .send(testUserLogin)
      .expect(201));

  afterEach(async () => {
    await app.close();
  });
});
