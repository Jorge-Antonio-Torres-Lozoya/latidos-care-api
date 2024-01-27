import { Module } from '@nestjs/common';
import { MedicationController } from './medication.controller';
import { MedicationService } from './medication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medication } from './medication.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtUserGuard } from '../user/user-auth/user-guard/user.jwt.guard';
import { VerificationTokenGuard } from '../guards/verification-token.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Medication])],
  controllers: [MedicationController],
  providers: [
    MedicationService,
    UserService,
    JwtService,
    JwtUserGuard,
    VerificationTokenGuard,
  ],
  exports: [MedicationService],
})
export class MedicationModule {}
