import { Module } from '@nestjs/common';
import { TreatmentController } from './treatment.controller';
import { TreatmentService } from './treatment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treatment } from './treatment.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtUserGuard } from '../user/user-auth/user-guard/user.jwt.guard';
import { VerificationTokenQueryGuard } from '../guards/verification-token-query.guard';
import { MedicationSicknessModule } from '../medication-sickness/medication-sickness.module';

@Module({
  imports: [TypeOrmModule.forFeature([Treatment]), MedicationSicknessModule],
  controllers: [TreatmentController],
  providers: [
    TreatmentService,
    UserService,
    JwtService,
    JwtUserGuard,
    VerificationTokenQueryGuard,
  ],
  exports: [TreatmentService],
})
export class TreatmentModule {}
