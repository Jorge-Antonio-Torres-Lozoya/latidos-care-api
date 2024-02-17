import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataAccessConsent } from './data-access-consent.entity';
import { Repository } from 'typeorm';
import { CreateDataAccessConsentDto } from './dtos/create-data-access-consent.dto';
import { AccountService } from '../account/account.service';

@Injectable()
export class DataAccessConsentService {
  constructor(
    @InjectRepository(DataAccessConsent)
    private repo: Repository<DataAccessConsent>,
    private accountService: AccountService,
  ) {}

  async getAll(): Promise<DataAccessConsent[]> {
    const consent = await this.repo.find();
    return consent;
  }

  async getById(consentId: number): Promise<DataAccessConsent> {
    const consent = await this.repo.findOne({
      where: { consentId },
    });

    if (!consent) {
      throw new NotFoundException('El consentimiento no fue encontrado');
    }

    return consent;
  }

  async create(
    createDto: CreateDataAccessConsentDto,
  ): Promise<DataAccessConsent> {
    const account = await this.accountService.getById(createDto.accountId);
    const consent = this.repo.create({
      consent: createDto.consent,
      account,
    });

    return await this.repo.save(consent);
  }

  async delete(consentId: number): Promise<DataAccessConsent> {
    const consent = await this.getById(consentId);
    await this.repo.remove(consent);
    consent.consentId = consentId;
    return consent;
  }
}
