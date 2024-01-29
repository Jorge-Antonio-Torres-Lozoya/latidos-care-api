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
import { Serialize } from '../interceptors/serialize.interceptor';
import { MedicationSicknessDto } from './dtos/medication-sickness.dto';
import { MedicationSickness } from './medication-sickness.entity';
import { UpdateMedicationSicknessDto } from './dtos/update-medication-sickness.dto';
import { CreateMedicationSicknessDto } from './dtos/create-medication-sickness.dto';
import { JwtAccountGuard } from '../account/account-auth/account-guards/account.jwt.guard';
import { RolesGuard } from '../account/account-auth/account-guards/roles.guard';
import { Roles } from '../shared/roles.decorator';

@Controller('medication-sickness')
export class MedicationSicknessController {
  constructor(private medicationSicknessService: MedicationSicknessService) {}

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin', 'User')
  @Serialize(MedicationSicknessDto)
  @Get('by-account')
  async getAllMedicationSicknessByAccount(
    @Query('accountId') accountId: string,
  ): Promise<MedicationSickness[]> {
    return await this.medicationSicknessService.getAllByAccount(
      parseInt(accountId),
    );
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin', 'User')
  @Get('by-slug/:slug')
  async getMedicationSicknessBySlug(
    @Param('slug') slug: string,
  ): Promise<MedicationSickness> {
    return await this.medicationSicknessService.getBySlug(slug);
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin', 'User')
  @Serialize(MedicationSicknessDto)
  @Post()
  async createMedicationSickness(
    @Body() body: CreateMedicationSicknessDto,
  ): Promise<MedicationSickness> {
    return await this.medicationSicknessService.create(body);
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin', 'User')
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

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin', 'User')
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
