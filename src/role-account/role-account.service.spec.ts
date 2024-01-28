import { Test, TestingModule } from '@nestjs/testing';
import { RoleAccountService } from './role-account.service';

describe('RoleAccountService', () => {
  let service: RoleAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleAccountService],
    }).compile();

    service = module.get<RoleAccountService>(RoleAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
