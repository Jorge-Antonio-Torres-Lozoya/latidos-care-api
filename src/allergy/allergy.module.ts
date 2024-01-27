import { Module } from '@nestjs/common';
import { AllergyController } from './allergy.controller';
import { AllergyService } from './allergy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allergy } from './allergy.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtUserGuard } from '../user/user-auth/user-guard/user.jwt.guard';
import { VerificationTokenGuard } from '../guards/verification-token.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Allergy])],
  controllers: [AllergyController],
  providers: [
    AllergyService,
    UserService,
    JwtService,
    JwtUserGuard,
    VerificationTokenGuard,
  ],
  exports: [AllergyService],
})
export class AllergyModule {}
