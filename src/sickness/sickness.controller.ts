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
import { SicknessService } from './sickness.service';
import { CreateSicknessDto } from './dtos/create-sickness.dto';
import { Sickness } from './sickness.entity';
import { UpdateSicknessDto } from './dtos/update-sickness.dto';
import { JwtAccountGuard } from '../account/account-auth/account-guards/account.jwt.guard';
import { RolesGuard } from '../account/account-auth/account-guards/roles.guard';
import { Roles } from '../shared/roles.decorator';

@Controller('sickness')
export class SicknessController {
  constructor(private sicknessService: SicknessService) {}

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin', 'User')
  @Get()
  async getAllSickness(): Promise<Sickness[]> {
    return await this.sicknessService.getAll();
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin', 'User')
  @Get('/:id')
  async getSicknessById(@Param('id') sicknessId: string): Promise<Sickness> {
    return await this.sicknessService.getById(parseInt(sicknessId));
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin', 'User')
  @Get('by-slug/:slug')
  async getSicknessBySlug(@Param('slug') slug: string): Promise<Sickness> {
    return await this.sicknessService.getBySlug(slug);
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin')
  @Post()
  async createSickness(@Body() body: CreateSicknessDto): Promise<Sickness> {
    return await this.sicknessService.create(body);
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin')
  @Put('/:id')
  async updateSickness(
    @Param('id') sicknessId: string,
    @Body() body: UpdateSicknessDto,
  ): Promise<Sickness> {
    return await this.sicknessService.edit(parseInt(sicknessId), body);
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin')
  @Delete('/:id')
  async deleteSickness(@Param('id') sicknessId: string): Promise<Sickness> {
    return this.sicknessService.delete(parseInt(sicknessId));
  }
}
