import { Module } from '@nestjs/common';
import { CurrentValueController } from './current-value.controller';
import { CurrentValueService } from './current-value.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentValue } from './current-value.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtUserGuard } from '../user/user-auth/user-guard/user.jwt.guard';
import { VerificationTokenQueryGuard } from '../guards/verification-token-query.guard';

@Module({
  imports: [TypeOrmModule.forFeature([CurrentValue])],
  controllers: [CurrentValueController],
  providers: [
    CurrentValueService,
    UserService,
    JwtService,
    JwtUserGuard,
    VerificationTokenQueryGuard,
  ],
  exports: [CurrentValueService],
})
export class CurrentValueModule {}
