import { Module } from '@nestjs/common';
import { TreatmentController } from './treatment.controller';
import { TreatmentService } from './treatment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treatment } from './treatment.entity';
import { MedicationSicknessModule } from '../medication-sickness/medication-sickness.module';
import { AccountModule } from '../account/account.module';
import { JwtAccountGuard } from '../account/account-auth/account-guards/account.jwt.guard';
import { VerificationTokenGuard } from '../guards/verification-token.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Treatment]),
    MedicationSicknessModule,
    AccountModule,
  ],
  controllers: [TreatmentController],
  providers: [TreatmentService, JwtAccountGuard, VerificationTokenGuard],
  exports: [TreatmentService],
})
export class TreatmentModule {}
