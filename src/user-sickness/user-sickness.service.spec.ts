import { Test, TestingModule } from '@nestjs/testing';
import { UserSicknessService } from './user-sickness.service';

describe('UserSicknessService', () => {
  let service: UserSicknessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSicknessService],
    }).compile();

    service = module.get<UserSicknessService>(UserSicknessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
