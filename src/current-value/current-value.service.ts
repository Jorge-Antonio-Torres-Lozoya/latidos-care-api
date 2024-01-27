import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CurrentValue } from './current-value.entity';
import { UserTrackingValue } from '../user-tracking-value/user-tracking-value.entity';

@Injectable()
export class CurrentValueService {
  constructor(
    @InjectRepository(CurrentValue)
    private repo: Repository<CurrentValue>,
  ) {}

  async create(
    userTrackingValue: UserTrackingValue,
    currentNumber: number,
  ): Promise<CurrentValue> {
    const currentValue = this.repo.create({
      currentNumber,
      userTrackingValue,
    });

    return await this.repo.save(currentValue);
  }

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
      .andWhere('currentValue.userTrackingValue.user.userId <= :userId', {
        userId,
      })
      .getMany();
  }

  async newGetCurrentValuesBetweenDates(
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<CurrentValue[]> {
    return await this.repo.find({
      where: {
        userTrackingValue: { user: { userId } },
        createdAt: Between(startDate, endDate),
      },
      relations: { userTrackingValue: { user: true, trackingValue: true } },
    });
  }
}
