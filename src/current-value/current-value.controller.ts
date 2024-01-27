import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CurrentValueService } from './current-value.service';
import { AnyQueryAuthGuard } from '../guards/any-query.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentValueDto } from './dtos/current-value.dto';

@Controller('current-value')
export class CurrentValueController {
  constructor(private currentValueService: CurrentValueService) {}
  @Serialize(CurrentValueDto)
  @UseGuards(AnyQueryAuthGuard)
  @Get('between-dates')
  async getCurrentValuesBetweenDates(
    @Query('userId') userId: string,
    @Query('startDate') startDateString: string,
    @Query('endDate') endDateString: string,
  ) {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    return await this.currentValueService.newGetCurrentValuesBetweenDates(
      parseInt(userId),
      startDate,
      endDate,
    );
  }
}
