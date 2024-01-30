import { Module } from '@nestjs/common';
import { UserSicknessController } from './user-sickness.controller';
import { UserSicknessService } from './user-sickness.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SicknessModule } from '../sickness/sickness.module';
import { UserSickness } from './user-sickness.entity';
import { AccountModule } from '../account/account.module';
import { JwtAccountGuard } from '../account/account-auth/account-guards/account.jwt.guard';
import { VerificationTokenGuard } from '../guards/verification-token.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSickness]),
    AccountModule,
    SicknessModule,
  ],
  controllers: [UserSicknessController],
  providers: [UserSicknessService, JwtAccountGuard, VerificationTokenGuard],
  exports: [UserSicknessService],
})
export class UserSicknessModule {}
