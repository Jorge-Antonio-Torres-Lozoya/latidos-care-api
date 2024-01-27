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
import { AnyAuthGuard } from '../guards/any.guard';
import { AdminJwtStrategy } from '../admin/admin-auth/admin.jwt.strategy';

@Controller('sickness')
export class SicknessController {
  constructor(private sicknessService: SicknessService) {}

  @UseGuards(AnyAuthGuard)
  @Get()
  async getAllSickness(): Promise<Sickness[]> {
    return await this.sicknessService.getAll();
  }

  @UseGuards(AnyAuthGuard)
  @Get('/:id')
  async getSicknessById(@Param('id') sicknessId: string): Promise<Sickness> {
    return await this.sicknessService.getById(parseInt(sicknessId));
  }

  @UseGuards(AdminJwtStrategy)
  @Post()
  async createSickness(@Body() body: CreateSicknessDto): Promise<Sickness> {
    return await this.sicknessService.create(body);
  }

  @UseGuards(AdminJwtStrategy)
  @Put('/:id')
  async updateSickness(
    @Param('id') sicknessId: string,
    @Body() body: UpdateSicknessDto,
  ): Promise<Sickness> {
    return await this.sicknessService.edit(parseInt(sicknessId), body);
  }

  @UseGuards(AdminJwtStrategy)
  @Delete('/:id')
  async deleteSickness(@Param('id') sicknessId: string): Promise<Sickness> {
    return this.sicknessService.delete(parseInt(sicknessId));
  }
}
