import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CurrentValueService } from './current-value.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentValueDto } from './dtos/current-value.dto';
import { AnyAuthGuard } from '../guards/any.guard';

@Controller('current-value')
export class CurrentValueController {
  constructor(private currentValueService: CurrentValueService) {}
  @UseGuards(AnyAuthGuard)
  @Serialize(CurrentValueDto)
  @Get('between-dates')
  async getCurrentValuesBetweenDates(
    @Query('accountId') accountId: string,
    @Query('startDate') startDateString: string,
    @Query('endDate') endDateString: string,
  ) {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    return await this.currentValueService.newGetCurrentValuesBetweenDates(
      parseInt(accountId),
      startDate,
      endDate,
    );
  }
}
