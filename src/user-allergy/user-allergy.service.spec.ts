import { Test, TestingModule } from '@nestjs/testing';
import { UserAllergyService } from './user-allergy.service';

describe('UserAllergyService', () => {
  let service: UserAllergyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAllergyService],
    }).compile();

    service = module.get<UserAllergyService>(UserAllergyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
