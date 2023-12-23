import { Test, TestingModule } from '@nestjs/testing';
import { CurrentValueController } from './current-value.controller';

describe('CurrentValueController', () => {
  let controller: CurrentValueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrentValueController],
    }).compile();

    controller = module.get<CurrentValueController>(CurrentValueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
