import { Test, TestingModule } from '@nestjs/testing';
import { MedicationSicknessController } from './medication-sickness.controller';

describe('MedicationSicknessController', () => {
  let controller: MedicationSicknessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicationSicknessController],
    }).compile();

    controller = module.get<MedicationSicknessController>(
      MedicationSicknessController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
