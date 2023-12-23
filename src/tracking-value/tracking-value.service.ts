import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackingValue } from './tracking-value.entity';
import { CreateTrackingValueDto } from './dtos/create-tracking-value.dto';
import { User } from '../user/user.entity';
import { CurrentValue } from '../current-value/current-value.entity';
import { TrackingCurrentValueDto } from './dtos/update-tracking-current-value.dto';

@Injectable()
export class TrackingValueService {
  constructor(
    @InjectRepository(TrackingValue) private repo: Repository<TrackingValue>,
    @InjectRepository(User) private repoUser: Repository<User>,
    @InjectRepository(CurrentValue)
    private repoCurrentValue: Repository<CurrentValue>,
  ) {}

  async getAll(): Promise<TrackingValue[]> {
    const allTrackingValues = await this.repo.find({
      relations: {
        user: true,
        currentValues: true,
      },
    });
    return allTrackingValues;
  }

  async getById(trackingValueId: number): Promise<TrackingValue> {
    const trackingValue = await this.repo.findOne({
      where: { trackingValueId },
      relations: {
        user: true,
        currentValues: true,
      },
    });

    if (!trackingValue) {
      throw new NotFoundException('El valor no fue encontrado');
    }

    return trackingValue;
  }

  async getAllByUser(userId: number): Promise<TrackingValue[]> {
    const user = this.repoUser.findOne({
      where: { userId },
    });

    if (!user) {
      throw new BadRequestException('El usuario no existe');
    }

    const trackingValues = await this.repo.find({
      where: { user: { userId } },
      relations: {
        user: true,
        currentValues: true,
      },
    });

    return trackingValues;
  }

  async create(createDto: CreateTrackingValueDto): Promise<TrackingValue> {
    const user = await this.repoUser.findOne({
      where: { userId: createDto.userId },
    });

    if (!user) {
      throw new BadRequestException('El usuario no existe');
    }
    const trackingValue = this.repo.create({
      currentValue: createDto.currentValue,
      trackingValueName: createDto.trackingValueName,
      minLimit: createDto.minLimit,
      maxLimit: createDto.maxLimit,
      user,
    });

    await this.repo.save(trackingValue);

    const createdCurrentValue = this.repoCurrentValue.create({
      currentNumber: createDto.currentValue,
      user,
      trackingValue,
    });

    await this.repoCurrentValue.save(createdCurrentValue);

    const foundTrackingValue = await this.repo.findOne({
      where: {
        trackingValueId: trackingValue.trackingValueId,
      },
      relations: {
        user: true,
        currentValues: true,
      },
    });

    if (!foundTrackingValue) {
      throw new NotFoundException('El valor que estás buscando no existe');
    }

    return foundTrackingValue;
  }

  async edit(
    trackingValueId: number,
    attrs: Partial<TrackingValue>,
  ): Promise<TrackingValue> {
    const trackingValue = await this.repo.findOne({
      where: { trackingValueId },
      relations: {
        user: true,
        currentValues: true,
      },
    });

    if (!trackingValue) {
      throw new NotFoundException('El valor no fue encontrado');
    }

    Object.assign(trackingValue, attrs);
    return this.repo.save(trackingValue);
  }

  async editCurrentValue(
    trackingValueId: number,
    updateDto: TrackingCurrentValueDto,
  ): Promise<TrackingValue> {
    const trackingValue = await this.repo.findOne({
      where: { trackingValueId },
      relations: {
        user: true,
        currentValues: true,
      },
    });

    if (!trackingValue) {
      throw new NotFoundException('El valor no fue encontrado');
    }

    const user = await this.repoUser.findOne({
      where: { userId: updateDto.userId },
    });

    if (!user) {
      throw new BadRequestException('El usuario no existe');
    }

    trackingValue.currentValue = updateDto.currentValue;
    await this.repo.save(trackingValue);

    const newCurrentValue = this.repoCurrentValue.create({
      currentNumber: updateDto.currentValue,
      trackingValue,
      user,
    });

    await this.repoCurrentValue.save(newCurrentValue);

    return trackingValue;
  }

  async delete(trackingValueId: number): Promise<TrackingValue> {
    const trackingValue = await this.repo.findOne({
      where: { trackingValueId },
      relations: {
        user: true,
        currentValues: true,
      },
    });

    if (!trackingValue) {
      throw new NotFoundException('El valor no fue encontrado');
    }

    return this.repo.remove(trackingValue);
  }
}
