import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ChatFlow from '../src/domain/chat-flow.entity';
import { ChatFlowService } from '../src/service/chat-flow.service';

describe('ChatFlow Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId'
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    delete: (): any => entityMock
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(ChatFlowService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all chat-flows ', async () => {
    const getEntities: ChatFlow[] = (
      await request(app.getHttpServer())
        .get('/api/chat-flows')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET chat-flows by id', async () => {
    const getEntity: ChatFlow = (
      await request(app.getHttpServer())
        .get('/api/chat-flows/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create chat-flows', async () => {
    const createdEntity: ChatFlow = (
      await request(app.getHttpServer())
        .post('/api/chat-flows')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update chat-flows', async () => {
    const updatedEntity: ChatFlow = (
      await request(app.getHttpServer())
        .put('/api/chat-flows')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE chat-flows', async () => {
    const deletedEntity: ChatFlow = (
      await request(app.getHttpServer())
        .delete('/api/chat-flows/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
