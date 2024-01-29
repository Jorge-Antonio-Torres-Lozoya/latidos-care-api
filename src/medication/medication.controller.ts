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
import { JwtAccountGuard } from '../account/account-auth/account-guards/account.jwt.guard';
import { RolesGuard } from '../account/account-auth/account-guards/roles.guard';
import { Roles } from '../shared/roles.decorator';

@Controller('medication')
export class MedicationController {
  constructor(private medicationService: MedicationService) {}

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin', 'User')
  @Get()
  async getAllMedications(): Promise<Medication[]> {
    return await this.medicationService.getAll();
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin', 'User')
  @Get('/:id')
  async getMedicationById(
    @Param('id') medicationId: string,
  ): Promise<Medication> {
    return await this.medicationService.getById(parseInt(medicationId));
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin')
  @Post()
  async createMedication(
    @Body() body: CreateMedicationDto,
  ): Promise<Medication> {
    return await this.medicationService.create(body);
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin')
  @Put('/:id')
  async updateMedication(
    @Param('id') medicationId: string,
    @Body() body: UpdateMedicationDto,
  ): Promise<Medication> {
    return await this.medicationService.edit(parseInt(medicationId), body);
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin')
  @Delete('/:id')
  async deleteMedication(
    @Param('id') medicationId: string,
  ): Promise<Medication> {
    return this.medicationService.delete(parseInt(medicationId));
  }
}
