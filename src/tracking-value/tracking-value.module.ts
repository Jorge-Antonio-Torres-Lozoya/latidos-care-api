import { Module } from '@nestjs/common';
import { TrackingValueController } from './tracking-value.controller';
import { TrackingValueService } from './tracking-value.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingValue } from './tracking-value.entity';
import { User } from '../user/user.entity';
import { CurrentValue } from '../current-value/current-value.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtUserGuard } from '../user/user-auth/user-guard/user.jwt.guard';
import { VerificationTokenGuard } from '../guards/verification-token.guard';

@Module({
  imports: [TypeOrmModule.forFeature([TrackingValue, User, CurrentValue])],
  controllers: [TrackingValueController],
  providers: [
    TrackingValueService,
    UserService,
    JwtService,
    JwtUserGuard,
    VerificationTokenGuard,
  ],
})
export class TrackingValueModule {}
