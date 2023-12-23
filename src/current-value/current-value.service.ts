import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrentValue } from './current-value.entity';

@Injectable()
export class CurrentValueService {
  constructor(
    @InjectRepository(CurrentValue)
    private repo: Repository<CurrentValue>,
  ) {}

  async getCurrentValuesBetweenDates(
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<CurrentValue[]> {
    return await this.repo
      .createQueryBuilder('currentValue')
      .leftJoin('currentValue.trackingValue', 'trackingValue')
      .addSelect(['trackingValue.trackingValueName'])
      .where('currentValue.createdAt >= :startDate', { startDate })
      .andWhere('currentValue.createdAt <= :endDate', { endDate })
      .andWhere('currentValue.userUserId <= :userId', { userId })
      .getMany();
  }
}
