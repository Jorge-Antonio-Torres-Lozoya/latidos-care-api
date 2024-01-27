import { Test, TestingModule } from '@nestjs/testing';
import { UserTrackingValueService } from './user-tracking-value.service';

describe('UserTrackingValueService', () => {
  let service: UserTrackingValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTrackingValueService],
    }).compile();

    service = module.get<UserTrackingValueService>(UserTrackingValueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
