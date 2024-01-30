import { Module } from '@nestjs/common';
import { UserTrackingValueController } from './user-tracking-value.controller';
import { UserTrackingValueService } from './user-tracking-value.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTrackingValue } from './user-tracking-value.entity';
import { TrackingValueModule } from '../tracking-value/tracking-value.module';
import { CurrentValueModule } from '../current-value/current-value.module';
import { AccountModule } from '../account/account.module';
import { JwtAccountGuard } from '../account/account-auth/account-guards/account.jwt.guard';
import { VerificationTokenGuard } from '../guards/verification-token.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTrackingValue]),
    AccountModule,
    TrackingValueModule,
    CurrentValueModule,
  ],
  controllers: [UserTrackingValueController],
  providers: [
    UserTrackingValueService,
    JwtAccountGuard,
    VerificationTokenGuard,
  ],
  exports: [UserTrackingValueService],
})
export class UserTrackingValueModule {}
