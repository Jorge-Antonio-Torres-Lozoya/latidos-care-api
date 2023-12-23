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
import { MedicationService } from './medication.service';
import { Medication } from './medication.entity';
import { CreateMedicationDto } from './dtos/create-medication.dto';
import { UpdateMedicationDto } from './dtos/update-medication.dto';
import { AnyAuthGuard } from '../guards/any.guard';

@Controller('medication')
export class MedicationController {
  constructor(private medicationService: MedicationService) {}

  @UseGuards(AnyAuthGuard)
  @Get('/:id')
  async getMedicationById(
    @Param('id') medicationId: string,
  ): Promise<Medication> {
    const medication = await this.medicationService.getById(
      parseInt(medicationId),
    );

    return medication;
  }

  @UseGuards(AnyAuthGuard)
  @Post()
  async createMedication(
    @Body() body: CreateMedicationDto,
  ): Promise<Medication> {
    const medication = await this.medicationService.create(body);

    return medication;
  }

  @UseGuards(AnyAuthGuard)
  @Put('/:id')
  async updateMedication(
    @Param('id') medicationId: string,
    @Body() body: UpdateMedicationDto,
  ): Promise<Medication> {
    const medication = await this.medicationService.edit(
      parseInt(medicationId),
      body,
    );

    return medication;
  }

  @UseGuards(AnyAuthGuard)
  @Delete('/:id')
  async deleteMedication(
    @Param('id') medicationId: string,
  ): Promise<Medication> {
    return this.medicationService.delete(parseInt(medicationId));
  }
}
