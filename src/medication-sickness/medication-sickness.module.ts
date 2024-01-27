import { Module } from '@nestjs/common';
import { MedicationSicknessController } from './medication-sickness.controller';
import { MedicationSicknessService } from './medication-sickness.service';

@Module({
  controllers: [MedicationSicknessController],
  providers: [MedicationSicknessService]
})
export class MedicationSicknessModule {}
