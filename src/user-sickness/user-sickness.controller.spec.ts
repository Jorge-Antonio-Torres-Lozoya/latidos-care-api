import { Test, TestingModule } from '@nestjs/testing';
import { UserSicknessController } from './user-sickness.controller';

describe('UserSicknessController', () => {
  let controller: UserSicknessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSicknessController],
    }).compile();

    controller = module.get<UserSicknessController>(UserSicknessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
