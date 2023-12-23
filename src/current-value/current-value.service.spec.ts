import { Test, TestingModule } from '@nestjs/testing';
import { CurrentValueService } from './current-value.service';

describe('CurrentValueService', () => {
  let service: CurrentValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrentValueService],
    }).compile();

    service = module.get<CurrentValueService>(CurrentValueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
