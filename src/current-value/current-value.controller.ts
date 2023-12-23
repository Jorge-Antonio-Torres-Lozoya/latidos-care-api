import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CurrentValueService } from './current-value.service';
import { AnyQueryAuthGuard } from '../guards/any-query.guard';

@Controller('current-value')
export class CurrentValueController {
  constructor(private currentValueService: CurrentValueService) {}
  @UseGuards(AnyQueryAuthGuard)
  @Get('between-dates')
  async getCurrentValuesBetweenDates(
    @Query('userId') userId: string,
    @Query('startDate') startDateString: string,
    @Query('endDate') endDateString: string,
  ) {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    return await this.currentValueService.getCurrentValuesBetweenDates(
      parseInt(userId),
      startDate,
      endDate,
    );
  }
}
