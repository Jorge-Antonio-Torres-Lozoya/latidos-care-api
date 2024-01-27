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
import { AllergyService } from './allergy.service';
import { Allergy } from './allergy.entity';
import { CreateAllergyDto } from './dtos/create-allergy.dto';
import { UpdateAllergyDto } from './dtos/update-allergy.dto';
import { AnyAuthGuard } from '../guards/any.guard';
import { JwtAdminGuard } from '../admin/admin-auth/admin-guards/admin.jwt.guard';

@Controller('allergy')
export class AllergyController {
  constructor(private allergyService: AllergyService) {}

  @UseGuards(AnyAuthGuard)
  @Get()
  async getAllAllergy(): Promise<Allergy[]> {
    return await this.allergyService.getAll();
  }

  @UseGuards(AnyAuthGuard)
  @Get('/:id')
  async getAllergyById(@Param('id') allergyId: string): Promise<Allergy> {
    return await this.allergyService.getById(parseInt(allergyId));
  }

  @UseGuards(JwtAdminGuard)
  @Post()
  async createAllergy(@Body() body: CreateAllergyDto): Promise<Allergy> {
    return await this.allergyService.create(body);
  }

  @UseGuards(JwtAdminGuard)
  @Put('/:id')
  async updateAllergy(
    @Param('id') allergyId: string,
    @Body() body: UpdateAllergyDto,
  ): Promise<Allergy> {
    return await this.allergyService.edit(parseInt(allergyId), body);
  }

  @UseGuards(JwtAdminGuard)
  @Delete('/:id')
  async deleteAllergy(@Param('id') allergyId: string): Promise<Allergy> {
    return this.allergyService.delete(parseInt(allergyId));
  }
}
