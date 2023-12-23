import { Module } from '@nestjs/common';
import { SicknessController } from './sickness.controller';
import { SicknessService } from './sickness.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Sickness } from './sickness.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtUserGuard } from '../user/user-auth/user-guard/user.jwt.guard';
import { VerificationTokenGuard } from '../guards/verification-token.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Sickness, User])],
  controllers: [SicknessController],
  providers: [
    SicknessService,
    UserService,
    JwtService,
    JwtUserGuard,
    VerificationTokenGuard,
  ],
})
export class SicknessModule {}
