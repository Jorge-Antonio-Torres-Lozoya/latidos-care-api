import { Test, TestingModule } from '@nestjs/testing';
import { MedicationSicknessService } from './medication-sickness.service';

describe('MedicationSicknessService', () => {
  let service: MedicationSicknessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicationSicknessService],
    }).compile();

    service = module.get<MedicationSicknessService>(MedicationSicknessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
