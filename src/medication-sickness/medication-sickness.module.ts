import { Module } from '@nestjs/common';
import { MedicationSicknessController } from './medication-sickness.controller';
import { MedicationSicknessService } from './medication-sickness.service';
import { MedicationModule } from '../medication/medication.module';
import { UserSicknessModule } from '../user-sickness/user-sickness.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationSickness } from './medication-sickness.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicationSickness]),
    UserModule,
    MedicationModule,
    UserSicknessModule,
  ],
  controllers: [MedicationSicknessController],
  providers: [MedicationSicknessService],
})
export class MedicationSicknessModule {}
