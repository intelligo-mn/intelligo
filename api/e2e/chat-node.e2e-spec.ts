import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ChatNode from '../src/domain/chat-node.entity';
import { ChatNodeService } from '../src/service/chat-node.service';

describe('ChatNode Controller', () => {
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
      .overrideProvider(ChatNodeService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all chat-nodes ', async () => {
    const getEntities: ChatNode[] = (
      await request(app.getHttpServer())
        .get('/api/chat-nodes')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET chat-nodes by id', async () => {
    const getEntity: ChatNode = (
      await request(app.getHttpServer())
        .get('/api/chat-nodes/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create chat-nodes', async () => {
    const createdEntity: ChatNode = (
      await request(app.getHttpServer())
        .post('/api/chat-nodes')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update chat-nodes', async () => {
    const updatedEntity: ChatNode = (
      await request(app.getHttpServer())
        .put('/api/chat-nodes')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE chat-nodes', async () => {
    const deletedEntity: ChatNode = (
      await request(app.getHttpServer())
        .delete('/api/chat-nodes/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
