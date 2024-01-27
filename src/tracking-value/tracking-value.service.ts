import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackingValue } from './tracking-value.entity';
import { CreateTrackingValueDto } from './dtos/create-tracking-value.dto';

@Injectable()
export class TrackingValueService {
  constructor(
    @InjectRepository(TrackingValue) private repo: Repository<TrackingValue>,
  ) {}

  async getAll(): Promise<TrackingValue[]> {
    return await this.repo.find();
  }

  async getById(trackingValueId: number): Promise<TrackingValue> {
    const trackingValue = await this.repo.findOne({
      where: { trackingValueId },
    });

    if (!trackingValue) {
      throw new NotFoundException('El valor no fue encontrado');
    }

    return trackingValue;
  }

  async create(createDto: CreateTrackingValueDto): Promise<TrackingValue> {
    const trackingValue = this.repo.create({
      trackingValueName: createDto.trackingValueName,
    });

    return await this.repo.save(trackingValue);
  }

  async edit(
    trackingValueId: number,
    attrs: Partial<TrackingValue>,
  ): Promise<TrackingValue> {
    const trackingValue = await this.getById(trackingValueId);
    Object.assign(trackingValue, attrs);
    return await this.repo.save(trackingValue);
  }

  async delete(trackingValueId: number): Promise<TrackingValue> {
    const trackingValue = await this.getById(trackingValueId);
    await this.repo.remove(trackingValue);
    trackingValue.trackingValueId = trackingValueId;
    return trackingValue;
  }
}
