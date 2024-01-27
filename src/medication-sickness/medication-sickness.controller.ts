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
import { MedicationSicknessService } from './medication-sickness.service';
import { AnyAuthGuard } from '../guards/any.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { MedicationSicknessDto } from './dtos/medication-sickness.dto';
import { MedicationSickness } from './medication-sickness.entity';
import { UpdateMedicationSicknessDto } from './dtos/update-medication-sickness.dto';
import { CreateMedicationSicknessDto } from './dtos/create-medication-sickness.dto';

@Controller('medication-sickness')
export class MedicationSicknessController {
  constructor(private medicationSicknessService: MedicationSicknessService) {}

  @UseGuards(AnyAuthGuard)
  @Serialize(MedicationSicknessDto)
  @Get('by-user')
  async getAllMedicationSicknessByUser(
    @Query('userId') userId: string,
  ): Promise<MedicationSickness[]> {
    return await this.medicationSicknessService.getAllByUser(parseInt(userId));
  }

  @UseGuards(AnyAuthGuard)
  @Serialize(MedicationSicknessDto)
  @Post()
  async createMedicationSickness(
    @Body() body: CreateMedicationSicknessDto,
  ): Promise<MedicationSickness> {
    return await this.medicationSicknessService.create(body);
  }

  @UseGuards(AnyAuthGuard)
  @Serialize(MedicationSicknessDto)
  @Put('/:id')
  async updateMedicationSickness(
    @Param('id') medicationSicknessId: string,
    @Body() body: UpdateMedicationSicknessDto,
  ): Promise<MedicationSickness> {
    return await this.medicationSicknessService.edit(
      parseInt(medicationSicknessId),
      body,
    );
  }

  @UseGuards(AnyAuthGuard)
  @Serialize(MedicationSicknessDto)
  @Delete('/:id')
  async deleteMedicationSickness(
    @Param('id') medicationSicknessId: string,
  ): Promise<MedicationSickness> {
    return this.medicationSicknessService.delete(
      parseInt(medicationSicknessId),
    );
  }
}
