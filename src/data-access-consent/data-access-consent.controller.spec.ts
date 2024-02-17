import { Test, TestingModule } from '@nestjs/testing';
import { DataAccessConsentController } from './data-access-consent.controller';

describe('DataAccessConsentController', () => {
  let controller: DataAccessConsentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataAccessConsentController],
    }).compile();

    controller = module.get<DataAccessConsentController>(
      DataAccessConsentController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
