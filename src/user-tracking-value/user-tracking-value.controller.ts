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
import { UserTrackingValueService } from './user-tracking-value.service';
import { AnyAuthGuard } from '../guards/any.guard';
import { UserTrackingValue } from './user-tracking-value.entity';
import { JwtAdminGuard } from '../admin/admin-auth/admin-guards/admin.jwt.guard';
import { CreateUserTrackingValueDto } from './dtos/create-user-tracking-value.dto';
import { UpdateUserTrackingValueDto } from './dtos/update-user-tracking-value.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserTrackingValueDto } from './dtos/user-tracking-value.dto';
//import { client } from '../main';

@Controller('user-tracking-value')
export class UserTrackingValueController {
  constructor(private userTrackingValueService: UserTrackingValueService) {}

  @UseGuards(AnyAuthGuard)
  @Serialize(UserTrackingValueDto)
  @Get('by-user')
  async getUserTrackingValueByUser(
    @Query('userId') userId: string,
  ): Promise<UserTrackingValue[]> {
    return await this.userTrackingValueService.getAllByUser(parseInt(userId));
  }

  @UseGuards(JwtAdminGuard)
  @Serialize(UserTrackingValueDto)
  @Get()
  getAllUserTrackingValue(): Promise<UserTrackingValue[]> {
    return this.userTrackingValueService.getAll();
  }

  @UseGuards(AnyAuthGuard)
  @Serialize(UserTrackingValueDto)
  @Post()
  async createUserTrackingValue(
    @Body() body: CreateUserTrackingValueDto,
  ): Promise<UserTrackingValue> {
    const userTrackingValue = await this.userTrackingValueService.create(body);
    //envio de mensaje de whatsapp
    /*if (userTrackingValue.alertActivated) {
        if (userTrackingValue.maxValueAlertActivated) {
          if (userTrackingValue.currentValue > userTrackingValue.maxLimit) {
            client.messages
              .create({
                from: 'whatsapp: +17125812832',
                body: userTrackingValue.personalizedAlertMaxValue,
                to: `whatsapp: ${userTrackingValue.user.phoneNumber}`,
              })
              .then((message) => console.log(message.sid));
          }
          if (
            userTrackingValue.user.tutorPhoneNumber &&
            userTrackingValue.currentValue > userTrackingValue.maxLimit
          ) {
            client.messages
              .create({
                from: 'whatsapp:+17125812832',
                body: userTrackingValue.personalizedAlertMaxValue,
                to: `whatsapp: ${userTrackingValue.user.tutorPhoneNumber}`,
              })
              .then((message) => console.log(message.sid));
          }
        }
  
        if (userTrackingValue.minValueAlertActivated) {
          if (userTrackingValue.currentValue < userTrackingValue.minLimit) {
            client.messages
              .create({
                from: 'whatsapp:+17125812832',
                body: userTrackingValue.personalizedAlertMinValue,
                to: `whatsapp: ${userTrackingValue.user.phoneNumber}`,
              })
              .then((message) => console.log(message.sid));
          }
  
          if (
            userTrackingValue.user.tutorPhoneNumber &&
            userTrackingValue.currentValue < userTrackingValue.minLimit
          ) {
            client.messages
              .create({
                from: 'whatsapp:+17125812832',
                body: userTrackingValue.personalizedAlertMinValue,
                to: `whatsapp: ${userTrackingValue.user.tutorPhoneNumber}`,
              })
              .then((message) => console.log(message.sid));
          }
        }
      }*/
    return userTrackingValue;
  }

  @UseGuards(AnyAuthGuard)
  @Serialize(UserTrackingValueDto)
  @Put('/:id')
  async updateUserTrackingValue(
    @Param('id') trackingValueId: string,
    @Body() body: UpdateUserTrackingValueDto,
  ): Promise<UserTrackingValue> {
    const userTrackingValue = await this.userTrackingValueService.update(
      parseInt(trackingValueId),
      body,
    );
    //envio de mensaje de whatsapp
    /*if (body.currentValue) {
      if (userTrackingValue.alertActivated) {
        if (userTrackingValue.maxValueAlertActivated) {
          if (userTrackingValue.currentValue > userTrackingValue.maxLimit) {
            client.messages
              .create({
                from: 'whatsapp:+17125812832',
                body: userTrackingValue.personalizedAlertMaxValue,
                to: `whatsapp: ${userTrackingValue.user.phoneNumber}`,
              })
              .then((message) => console.log(message.sid));
          }
          if (
            userTrackingValue.user.tutorPhoneNumber &&
            userTrackingValue.currentValue > userTrackingValue.maxLimit
          ) {
            client.messages
              .create({
                from: 'whatsapp:+17125812832',
                body: userTrackingValue.personalizedAlertMaxValue,
                to: `whatsapp: ${userTrackingValue.user.tutorPhoneNumber}`,
              })
              .then((message) => console.log(message.sid));
          }
        }

        if (userTrackingValue.minValueAlertActivated) {
          if (userTrackingValue.currentValue < userTrackingValue.minLimit) {
            client.messages
              .create({
                from: 'whatsapp:+17125812832',
                body: userTrackingValue.personalizedAlertMinValue,
                to: `whatsapp: ${userTrackingValue.user.phoneNumber}`,
              })
              .then((message) => console.log(message.sid));
          }

          if (
            userTrackingValue.user.tutorPhoneNumber &&
            userTrackingValue.currentValue < userTrackingValue.minLimit
          ) {
            client.messages
              .create({
                from: 'whatsapp:+17125812832',
                body: userTrackingValue.personalizedAlertMinValue,
                to: `whatsapp: ${userTrackingValue.user.tutorPhoneNumber}`,
              })
              .then((message) => console.log(message.sid));
          }
        }
      }
    }*/
    return userTrackingValue;
  }

  @UseGuards(AnyAuthGuard)
  @Serialize(UserTrackingValueDto)
  @Delete('/:id')
  async deleteUserTrackingValue(
    @Param('id') userTrackingValueId: string,
  ): Promise<UserTrackingValue> {
    return this.userTrackingValueService.delete(parseInt(userTrackingValueId));
  }
}
