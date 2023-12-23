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
import { SicknessService } from './sickness.service';
import { CreateSicknessDto } from './dtos/create-sickness.dto';
import { Sickness } from './sickness.entity';
import { UpdateSicknessDto } from './dtos/update-sickness.dto';
import { AnyAuthGuard } from '../guards/any.guard';
import { CreateSicknessesDto } from './dtos/create-sicknesses.dto';

@Controller('sickness')
export class SicknessController {
  constructor(private sicknessService: SicknessService) {}

  @UseGuards(AnyAuthGuard)
  @Get()
  async getAllSickness(): Promise<Sickness[]> {
    const sickness = await this.sicknessService.getAll();

    return sickness;
  }

  @UseGuards(AnyAuthGuard)
  @Get('by-user')
  async getAllSicknessByUser(
    @Query('userId') userId: string,
  ): Promise<Sickness[]> {
    const sickness = await this.sicknessService.getAllByUser(parseInt(userId));

    return sickness;
  }

  @UseGuards(AnyAuthGuard)
  @Get('/:id')
  async getSicknessById(@Param('id') sicknessId: string): Promise<Sickness> {
    const sickness = await this.sicknessService.getById(parseInt(sicknessId));

    return sickness;
  }

  @UseGuards(AnyAuthGuard)
  @Post()
  async createSickness(@Body() body: CreateSicknessDto): Promise<Sickness> {
    const sickness = await this.sicknessService.create(body);

    return sickness;
  }

  @UseGuards(AnyAuthGuard)
  @Post('many')
  async createSicknessMany(
    @Body() body: CreateSicknessesDto,
  ): Promise<Sickness[]> {
    const sicknesses = await this.sicknessService.createMany(body);

    return sicknesses;
  }

  @UseGuards(AnyAuthGuard)
  @Put('/:id')
  async updateSickness(
    @Param('id') sicknessId: string,
    @Body() body: UpdateSicknessDto,
  ): Promise<Sickness> {
    const sickness = await this.sicknessService.edit(
      parseInt(sicknessId),
      body,
    );

    return sickness;
  }

  @UseGuards(AnyAuthGuard)
  @Delete('/:id')
  async deleteSickness(@Param('id') sicknessId: string): Promise<Sickness> {
    return this.sicknessService.delete(parseInt(sicknessId));
  }
}
