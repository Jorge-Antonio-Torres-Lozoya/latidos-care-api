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
import { Roles } from '../shared/roles.decorator';
import { RolesGuard } from '../account/account-auth/account-guards/roles.guard';
import { JwtAccountGuard } from '../account/account-auth/account-guards/account.jwt.guard';

@Controller('allergy')
export class AllergyController {
  constructor(private allergyService: AllergyService) {}

  //@UseGuards(JwtAccountGuard, RolesGuard)
  //@Roles('Admin', 'User')
  @Get()
  async getAllAllergy(): Promise<Allergy[]> {
    return await this.allergyService.getAll();
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin', 'User')
  @Get('/:id')
  async getAllergyById(@Param('id') allergyId: string): Promise<Allergy> {
    return await this.allergyService.getById(parseInt(allergyId));
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin')
  @Post()
  async createAllergy(@Body() body: CreateAllergyDto): Promise<Allergy> {
    return await this.allergyService.create(body);
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin')
  @Put('/:id')
  async updateAllergy(
    @Param('id') allergyId: string,
    @Body() body: UpdateAllergyDto,
  ): Promise<Allergy> {
    return await this.allergyService.edit(parseInt(allergyId), body);
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin')
  @Delete('/:id')
  async deleteAllergy(@Param('id') allergyId: string): Promise<Allergy> {
    return this.allergyService.delete(parseInt(allergyId));
  }
}
