import { Module } from '@nestjs/common';
import { DataAccessConsentController } from './data-access-consent.controller';
import { DataAccessConsentService } from './data-access-consent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataAccessConsent } from './data-access-consent.entity';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([DataAccessConsent]), AccountModule],
  controllers: [DataAccessConsentController],
  providers: [DataAccessConsentService],
  exports: [DataAccessConsentService],
})
export class DataAccessConsentModule {}
