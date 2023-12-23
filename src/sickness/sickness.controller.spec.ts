import { Test, TestingModule } from '@nestjs/testing';
import { SicknessController } from './sickness.controller';

describe('SicknessController', () => {
  let controller: SicknessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SicknessController],
    }).compile();

    controller = module.get<SicknessController>(SicknessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
