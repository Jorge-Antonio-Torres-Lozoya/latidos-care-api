import { Module } from '@nestjs/common';
import { MedicationSicknessController } from './medication-sickness.controller';
import { MedicationSicknessService } from './medication-sickness.service';
import { MedicationModule } from '../medication/medication.module';
import { UserSicknessModule } from '../user-sickness/user-sickness.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationSickness } from './medication-sickness.entity';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicationSickness]),
    AccountModule,
    MedicationModule,
    UserSicknessModule,
  ],
  controllers: [MedicationSicknessController],
  providers: [MedicationSicknessService],
  exports: [MedicationSicknessService],
})
export class MedicationSicknessModule {}
