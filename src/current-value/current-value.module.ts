import { Module } from '@nestjs/common';
import { CurrentValueController } from './current-value.controller';
import { CurrentValueService } from './current-value.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentValue } from './current-value.entity';
import { JwtAccountGuard } from '../account/account-auth/account-guards/account.jwt.guard';
import { VerificationTokenGuard } from '../guards/verification-token.guard';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([CurrentValue]), AccountModule],
  controllers: [CurrentValueController],
  providers: [CurrentValueService, JwtAccountGuard, VerificationTokenGuard],
  exports: [CurrentValueService],
})
export class CurrentValueModule {}
