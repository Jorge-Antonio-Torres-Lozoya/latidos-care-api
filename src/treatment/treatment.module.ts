import { Module } from '@nestjs/common';
import { TreatmentController } from './treatment.controller';
import { TreatmentService } from './treatment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treatment } from './treatment.entity';
import { MedicationSicknessModule } from '../medication-sickness/medication-sickness.module';

@Module({
  imports: [TypeOrmModule.forFeature([Treatment]), MedicationSicknessModule],
  controllers: [TreatmentController],
  providers: [TreatmentService],
  exports: [TreatmentService],
})
export class TreatmentModule {}
