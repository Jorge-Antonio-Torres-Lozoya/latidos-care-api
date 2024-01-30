import { Module } from '@nestjs/common';
import { MedicationSicknessController } from './medication-sickness.controller';
import { MedicationSicknessService } from './medication-sickness.service';
import { MedicationModule } from '../medication/medication.module';
import { UserSicknessModule } from '../user-sickness/user-sickness.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationSickness } from './medication-sickness.entity';
import { AccountModule } from '../account/account.module';
import { JwtAccountGuard } from '../account/account-auth/account-guards/account.jwt.guard';
import { VerificationTokenGuard } from '../guards/verification-token.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicationSickness]),
    AccountModule,
    MedicationModule,
    UserSicknessModule,
  ],
  controllers: [MedicationSicknessController],
  providers: [
    MedicationSicknessService,
    JwtAccountGuard,
    VerificationTokenGuard,
  ],
  exports: [MedicationSicknessService],
})
export class MedicationSicknessModule {}
