import { Module } from '@nestjs/common';
import { TreatmentController } from './treatment.controller';
import { TreatmentService } from './treatment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treatment } from './treatment.entity';
import { Medication } from '../medication/medication.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtUserGuard } from '../user/user-auth/user-guard/user.jwt.guard';
import { VerificationTokenQueryGuard } from '../guards/verification-token-query.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Treatment, Medication, User])],
  controllers: [TreatmentController],
  providers: [
    TreatmentService,
    UserService,
    JwtService,
    JwtUserGuard,
    VerificationTokenQueryGuard,
  ],
})
export class TreatmentModule {}
