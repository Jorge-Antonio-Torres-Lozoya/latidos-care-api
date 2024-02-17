import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DataAccessConsentService } from './data-access-consent.service';
import { JwtAccountGuard } from '../account/account-auth/account-guards/account.jwt.guard';
import { CreateDataAccessConsentDto } from './dtos/create-data-access-consent.dto';
import { DataAccessConsent } from './data-access-consent.entity';

@Controller('data-access-consent')
export class DataAccessConsentController {
  constructor(private dataAccessConsentService: DataAccessConsentService) {}

  @Post()
  @UseGuards(JwtAccountGuard)
  async createConsent(
    @Body() body: CreateDataAccessConsentDto,
  ): Promise<DataAccessConsent> {
    return await this.dataAccessConsentService.create(body);
  }
}
