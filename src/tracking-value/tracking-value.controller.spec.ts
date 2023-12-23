import { Test, TestingModule } from '@nestjs/testing';
import { TrackingValueController } from './tracking-value.controller';

describe('TrackingValueController', () => {
  let controller: TrackingValueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrackingValueController],
    }).compile();

    controller = module.get<TrackingValueController>(TrackingValueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
