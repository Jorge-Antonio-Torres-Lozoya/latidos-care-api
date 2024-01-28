import { Test, TestingModule } from '@nestjs/testing';
import { RoleAccountController } from './role-account.controller';

describe('RoleAccountController', () => {
  let controller: RoleAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleAccountController],
    }).compile();

    controller = module.get<RoleAccountController>(RoleAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
