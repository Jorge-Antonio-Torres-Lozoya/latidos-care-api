import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateTrackingValueDto } from './dtos/create-tracking-value.dto';
import { UpdateTrackingValueDto } from './dtos/update-tracking-value.dto';
import { TrackingValue } from './tracking-value.entity';
import { TrackingValueService } from './tracking-value.service';
//import { client } from '../main';
import { AnyAuthGuard } from '../guards/any.guard';

@Controller('tracking-value')
export class TrackingValueController {
  constructor(private trackingValueService: TrackingValueService) {}

  @UseGuards(AnyAuthGuard)
  @Get()
  async getAllTrackingValue(): Promise<TrackingValue[]> {
    return await this.trackingValueService.getAll();
  }

  @UseGuards(AnyAuthGuard)
  @Get('/:id')
  async getTrackingValueById(
    @Param('id') trackingValueId: string,
  ): Promise<TrackingValue> {
    return await this.trackingValueService.getById(parseInt(trackingValueId));
  }

  @UseGuards(AnyAuthGuard)
  @Post()
  async createTrackingValue(
    @Body() body: CreateTrackingValueDto,
  ): Promise<TrackingValue> {
    return await this.trackingValueService.create(body);
  }

  @UseGuards(AnyAuthGuard)
  @Put('/:id')
  async updateTrackingValue(
    @Param('id') trackingValueId: string,
    @Body() body: UpdateTrackingValueDto,
  ): Promise<TrackingValue> {
    return await this.trackingValueService.edit(
      parseInt(trackingValueId),
      body,
    );
  }

  @UseGuards(AnyAuthGuard)
  @Delete('/:id')
  async deleteTrackingValue(
    @Param('id') trackingValueId: string,
  ): Promise<TrackingValue> {
    return this.trackingValueService.delete(parseInt(trackingValueId));
  }
}
