import { Injectable, NotFoundException } from '@nestjs/common';
import { UserTrackingValue } from './user-tracking-value.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackingValueService } from '../tracking-value/tracking-value.service';
import { CurrentValueService } from '../current-value/current-value.service';
import { UpdateUserTrackingValueDto } from './dtos/update-user-tracking-value.dto';
import { CreateUserTrackingValueDto } from './dtos/create-user-tracking-value.dto';
import { AccountService } from '../account/account.service';

@Injectable()
export class UserTrackingValueService {
  constructor(
    @InjectRepository(UserTrackingValue)
    private repo: Repository<UserTrackingValue>,
    private accountService: AccountService,
    private trackingValueService: TrackingValueService,
    private currentValueService: CurrentValueService,
  ) {}

  async getAll(): Promise<UserTrackingValue[]> {
    return await this.repo.find({
      relations: {
        currentValues: true,
        trackingValue: true,
        account: true,
      },
    });
  }

  async getById(userTrackingValueId: number): Promise<UserTrackingValue> {
    const userTrackingValue = await this.repo.findOne({
      where: { userTrackingValueId },
      relations: {
        currentValues: true,
        trackingValue: true,
        account: true,
      },
    });

    if (!userTrackingValue) {
      throw new NotFoundException('El valor no fue encontrado');
    }

    return userTrackingValue;
  }

  async getAllByAccount(accountId: number): Promise<UserTrackingValue[]> {
    return await this.repo.find({
      where: { account: { accountId } },
      relations: {
        account: true,
        currentValues: true,
        trackingValue: true,
      },
    });
  }

  async create(
    createDto: CreateUserTrackingValueDto,
  ): Promise<UserTrackingValue> {
    const account = await this.accountService.getById(createDto.accountId);
    const trackingValue = await this.trackingValueService.getById(
      createDto.trackingValueId,
    );
    const userTrackingValue = this.repo.create({
      currentValue: createDto.currentValue,
      minLimit: createDto.minLimit,
      maxLimit: createDto.maxLimit,
      account,
      trackingValue,
    });

    await this.repo.save(userTrackingValue);

    const createdUserTrackingValue = await this.getById(
      userTrackingValue.userTrackingValueId,
    );

    await this.currentValueService.create(
      createdUserTrackingValue,
      createDto.currentValue,
    );

    return await this.getById(userTrackingValue.userTrackingValueId);
  }

  async update(
    userTrackingValueId: number,
    updateDto: UpdateUserTrackingValueDto,
  ): Promise<UserTrackingValue> {
    const userTrackingValue = await this.getById(userTrackingValueId);

    if (updateDto.alertActivated) {
      userTrackingValue.alertActivated = updateDto.alertActivated;
    }

    if (updateDto.minValueAlertActivated) {
      userTrackingValue.minValueAlertActivated =
        updateDto.minValueAlertActivated;
    }

    if (updateDto.maxValueAlertActivated) {
      userTrackingValue.maxValueAlertActivated =
        updateDto.maxValueAlertActivated;
    }

    if (updateDto.personalizedAlertMinValue) {
      userTrackingValue.personalizedAlertMinValue =
        updateDto.personalizedAlertMinValue;
    }

    if (updateDto.personalizedAlertMaxValue) {
      userTrackingValue.personalizedAlertMaxValue =
        updateDto.personalizedAlertMaxValue;
    }

    if (updateDto.minLimit) {
      userTrackingValue.minLimit = updateDto.minLimit;
    }

    if (updateDto.maxLimit) {
      userTrackingValue.maxLimit = updateDto.maxLimit;
    }
    await this.repo.save(userTrackingValue);

    const updatedUserTrackingValue = await this.getById(userTrackingValueId);

    if (updateDto.currentValue) {
      await this.currentValueService.create(
        updatedUserTrackingValue,
        updateDto.currentValue,
      );
    }

    return await this.getById(userTrackingValueId);
  }

  async delete(userTrackingValueId: number): Promise<UserTrackingValue> {
    const userTrackingValue = await this.getById(userTrackingValueId);

    await this.repo.remove(userTrackingValue);
    userTrackingValue.userTrackingValueId = userTrackingValueId;
    return userTrackingValue;
  }
}
