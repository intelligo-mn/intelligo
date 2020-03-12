import { Test, TestingModule } from '@nestjs/testing';
import { ManagementController } from '../../src/web/rest/management.controller';

describe('Management Controller', () => {
  let controller: ManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagementController]
    }).compile();

    controller = module.get<ManagementController>(ManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
