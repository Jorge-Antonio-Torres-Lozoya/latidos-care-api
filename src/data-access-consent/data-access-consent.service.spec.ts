import { Test, TestingModule } from '@nestjs/testing';
import { DataAccessConsentService } from './data-access-consent.service';

describe('DataAccessConsentService', () => {
  let service: DataAccessConsentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataAccessConsentService],
    }).compile();

    service = module.get<DataAccessConsentService>(DataAccessConsentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
