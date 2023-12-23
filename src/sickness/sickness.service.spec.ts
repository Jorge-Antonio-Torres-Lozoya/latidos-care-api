import { Test, TestingModule } from '@nestjs/testing';
import { SicknessService } from './sickness.service';

describe('SicknessService', () => {
  let service: SicknessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SicknessService],
    }).compile();

    service = module.get<SicknessService>(SicknessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
