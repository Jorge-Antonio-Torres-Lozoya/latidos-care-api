import { Test, TestingModule } from '@nestjs/testing';
import { TrackingValueService } from './tracking-value.service';

describe('TrackingValueService', () => {
  let service: TrackingValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackingValueService],
    }).compile();

    service = module.get<TrackingValueService>(TrackingValueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
