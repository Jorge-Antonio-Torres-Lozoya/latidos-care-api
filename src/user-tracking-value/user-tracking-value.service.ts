import { Injectable, NotFoundException } from '@nestjs/common';
import { UserTrackingValue } from './user-tracking-value.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { TrackingValueService } from '../tracking-value/tracking-value.service';
import { CurrentValueService } from '../current-value/current-value.service';
import { UpdateUserTrackingValueDto } from './dtos/update-user-tracking-value.dto';
import { CreateUserTrackingValueDto } from './dtos/create-user-tracking-value.dto';

@Injectable()
export class UserTrackingValueService {
  constructor(
    @InjectRepository(UserTrackingValue)
    private repo: Repository<UserTrackingValue>,
    private userService: UserService,
    private trackingValueService: TrackingValueService,
    private currentValueService: CurrentValueService,
  ) {}

  async getAll(): Promise<UserTrackingValue[]> {
    return await this.repo.find({
      relations: {
        currentValues: true,
        trackingValue: true,
        user: true,
      },
    });
  }

  async getById(userTrackingValueId: number): Promise<UserTrackingValue> {
    const userTrackingValue = await this.repo.findOne({
      where: { userTrackingValueId },
      relations: {
        currentValues: true,
        trackingValue: true,
        user: true,
      },
    });

    if (!userTrackingValue) {
      throw new NotFoundException('El valor no fue encontrado');
    }

    return userTrackingValue;
  }

  async getAllByUser(userId: number): Promise<UserTrackingValue[]> {
    return await this.repo.find({
      where: { user: { userId } },
      relations: {
        currentValues: true,
        trackingValue: true,
        user: true,
      },
    });
  }

  async create(
    createDto: CreateUserTrackingValueDto,
  ): Promise<UserTrackingValue> {
    const user = await this.userService.getOne(createDto.userId);
    const trackingValue = await this.trackingValueService.getById(
      createDto.trackingValueId,
    );
    const userTrackingValue = this.repo.create({
      currentValue: createDto.currentValue,
      minLimit: createDto.minLimit,
      maxLimit: createDto.maxLimit,
      user,
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
