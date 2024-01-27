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
import { JwtAdminGuard } from '../admin/admin-auth/admin-guards/admin.jwt.guard';

@Controller('medication')
export class MedicationController {
  constructor(private medicationService: MedicationService) {}

  @UseGuards(AnyAuthGuard)
  @Get()
  async getAllMedications(): Promise<Medication[]> {
    return await this.medicationService.getAll();
  }

  @UseGuards(AnyAuthGuard)
  @Get('/:id')
  async getMedicationById(
    @Param('id') medicationId: string,
  ): Promise<Medication> {
    return await this.medicationService.getById(parseInt(medicationId));
  }

  @UseGuards(JwtAdminGuard)
  @Post()
  async createMedication(
    @Body() body: CreateMedicationDto,
  ): Promise<Medication> {
    return await this.medicationService.create(body);
  }

  @UseGuards(JwtAdminGuard)
  @Put('/:id')
  async updateMedication(
    @Param('id') medicationId: string,
    @Body() body: UpdateMedicationDto,
  ): Promise<Medication> {
    return await this.medicationService.edit(parseInt(medicationId), body);
  }

  @UseGuards(JwtAdminGuard)
  @Delete('/:id')
  async deleteMedication(
    @Param('id') medicationId: string,
  ): Promise<Medication> {
    return this.medicationService.delete(parseInt(medicationId));
  }
}
