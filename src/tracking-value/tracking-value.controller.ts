import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateTrackingValueDto } from './dtos/create-tracking-value.dto';
import { UpdateTrackingValueDto } from './dtos/update-tracking-value.dto';
import { TrackingValue } from './tracking-value.entity';
import { TrackingValueService } from './tracking-value.service';
//import { client } from '../main';
import { TrackingCurrentValueDto } from './dtos/update-tracking-current-value.dto';
import { UpdateTrackingAlertsDto } from './dtos/update-tracking-alerts.dto';
import { AnyAuthGuard } from '../guards/any.guard';

@Controller('tracking-value')
export class TrackingValueController {
  constructor(private trackingValueService: TrackingValueService) {}

  @UseGuards(AnyAuthGuard)
  @Get('by-user')
  async getTrackingValueByUser(
    @Query('userId') userId: string,
  ): Promise<TrackingValue[]> {
    const allTrackingValue = await this.trackingValueService.getAllByUser(
      parseInt(userId),
    );

    return allTrackingValue;
  }

  @UseGuards(AnyAuthGuard)
  @Get()
  getAllTrackingValue(): Promise<TrackingValue[]> {
    return this.trackingValueService.getAll();
  }

  @UseGuards(AnyAuthGuard)
  @Get('/:id')
  async getTrackingValueById(
    @Param('id') trackingValueId: string,
  ): Promise<TrackingValue> {
    const trackingValue = await this.trackingValueService.getById(
      parseInt(trackingValueId),
    );
    return trackingValue;
  }

  @UseGuards(AnyAuthGuard)
  @Post()
  async createTrackingValue(
    @Body() body: CreateTrackingValueDto,
  ): Promise<TrackingValue> {
    const trackingValue = await this.trackingValueService.create(body);
    //envio de mensaje de whatsapp
    /*if (trackingValue.alertActivated) {
      if (trackingValue.maxValueAlertActivated) {
        if (trackingValue.currentValue > trackingValue.maxLimit) {
          client.messages
            .create({
              from: 'whatsapp: +17125812832',
              body: trackingValue.personalizedAlertMaxValue,
              to: `whatsapp: ${trackingValue.user.phoneNumber}`,
            })
            .then((message) => console.log(message.sid));
        }
        if (
          trackingValue.user.tutorPhoneNumber &&
          trackingValue.currentValue > trackingValue.maxLimit
        ) {
          client.messages
            .create({
              from: 'whatsapp:+17125812832',
              body: trackingValue.personalizedAlertMaxValue,
              to: `whatsapp: ${trackingValue.user.tutorPhoneNumber}`,
            })
            .then((message) => console.log(message.sid));
        }
      }

      if (trackingValue.minValueAlertActivated) {
        if (trackingValue.currentValue < trackingValue.minLimit) {
          client.messages
            .create({
              from: 'whatsapp:+17125812832',
              body: trackingValue.personalizedAlertMinValue,
              to: `whatsapp: ${trackingValue.user.phoneNumber}`,
            })
            .then((message) => console.log(message.sid));
        }

        if (
          trackingValue.user.tutorPhoneNumber &&
          trackingValue.currentValue < trackingValue.minLimit
        ) {
          client.messages
            .create({
              from: 'whatsapp:+17125812832',
              body: trackingValue.personalizedAlertMinValue,
              to: `whatsapp: ${trackingValue.user.tutorPhoneNumber}`,
            })
            .then((message) => console.log(message.sid));
        }
      }
    }*/
    return trackingValue;
  }

  @UseGuards(AnyAuthGuard)
  @Put('/:id')
  async updateTrackingValue(
    @Param('id') trackingValueId: string,
    @Body() body: UpdateTrackingValueDto,
  ): Promise<TrackingValue> {
    const trackingValue = await this.trackingValueService.edit(
      parseInt(trackingValueId),
      body,
    );
    return trackingValue;
  }

  @UseGuards(AnyAuthGuard)
  @Put('alerts/:id')
  async updateTrackingValueAlerts(
    @Param('id') trackingValueId: string,
    @Body() body: UpdateTrackingAlertsDto,
  ): Promise<TrackingValue> {
    const trackingValue = await this.trackingValueService.edit(
      parseInt(trackingValueId),
      body,
    );
    return trackingValue;
  }

  @UseGuards(AnyAuthGuard)
  @Put('current-value/:id')
  async updateCurrentValue(
    @Param('id') trackingValueId: string,
    @Body() body: TrackingCurrentValueDto,
  ): Promise<TrackingValue> {
    const trackingValue = await this.trackingValueService.editCurrentValue(
      parseInt(trackingValueId),
      body,
    );
    //envio de mensaje de whatsapp
    /*if (trackingValue.alertActivated) {
      if (trackingValue.maxValueAlertActivated) {
        if (trackingValue.currentValue > trackingValue.maxLimit) {
          client.messages
            .create({
              from: 'whatsapp:+17125812832',
              body: trackingValue.personalizedAlertMaxValue,
              to: `whatsapp: ${trackingValue.user.phoneNumber}`,
            })
            .then((message) => console.log(message.sid));
        }
        if (
          trackingValue.user.tutorPhoneNumber &&
          trackingValue.currentValue > trackingValue.maxLimit
        ) {
          client.messages
            .create({
              from: 'whatsapp:+17125812832',
              body: trackingValue.personalizedAlertMaxValue,
              to: `whatsapp: ${trackingValue.user.tutorPhoneNumber}`,
            })
            .then((message) => console.log(message.sid));
        }
      }

      if (trackingValue.minValueAlertActivated) {
        if (trackingValue.currentValue < trackingValue.minLimit) {
          client.messages
            .create({
              from: 'whatsapp:+17125812832',
              body: trackingValue.personalizedAlertMinValue,
              to: `whatsapp: ${trackingValue.user.phoneNumber}`,
            })
            .then((message) => console.log(message.sid));
        }

        if (
          trackingValue.user.tutorPhoneNumber &&
          trackingValue.currentValue < trackingValue.minLimit
        ) {
          client.messages
            .create({
              from: 'whatsapp:+17125812832',
              body: trackingValue.personalizedAlertMinValue,
              to: `whatsapp: ${trackingValue.user.tutorPhoneNumber}`,
            })
            .then((message) => console.log(message.sid));
        }
      }
    }*/

    return trackingValue;
  }

  @UseGuards(AnyAuthGuard)
  @Delete('/:id')
  async deleteTrackingValue(
    @Param('id') trackingValueId: string,
  ): Promise<TrackingValue> {
    return this.trackingValueService.delete(parseInt(trackingValueId));
  }
}
