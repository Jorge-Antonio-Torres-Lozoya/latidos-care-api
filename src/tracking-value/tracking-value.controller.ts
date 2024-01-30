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
import { JwtAccountGuard } from '../account/account-auth/account-guards/account.jwt.guard';
import { RolesGuard } from '../account/account-auth/account-guards/roles.guard';
import { Roles } from '../shared/roles.decorator';
//import { client } from '../main';

@Controller('tracking-value')
export class TrackingValueController {
  constructor(private trackingValueService: TrackingValueService) {}

  //@UseGuards(JwtAccountGuard, RolesGuard)
  //@Roles('Admin', 'User')
  @Get()
  async getAllTrackingValue(): Promise<TrackingValue[]> {
    return await this.trackingValueService.getAll();
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin', 'User')
  @Get('/:id')
  async getTrackingValueById(
    @Param('id') trackingValueId: string,
  ): Promise<TrackingValue> {
    return await this.trackingValueService.getById(parseInt(trackingValueId));
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin', 'User')
  @Post()
  async createTrackingValue(
    @Body() body: CreateTrackingValueDto,
  ): Promise<TrackingValue> {
    return await this.trackingValueService.create(body);
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin', 'User')
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

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin', 'User')
  @Delete('/:id')
  async deleteTrackingValue(
    @Param('id') trackingValueId: string,
  ): Promise<TrackingValue> {
    return this.trackingValueService.delete(parseInt(trackingValueId));
  }
}
