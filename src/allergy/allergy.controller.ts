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
import { AllergyService } from './allergy.service';
import { Allergy } from './allergy.entity';
import { CreateAllergyDto } from './dtos/create-allergy.dto';
import { UpdateAllergyDto } from './dtos/update-allergy.dto';
import { AnyAuthGuard } from '../guards/any.guard';
import { CreateAllergiesDto } from './dtos/create-allergies.dto';

@Controller('allergy')
export class AllergyController {
  constructor(private allergyService: AllergyService) {}

  @UseGuards(AnyAuthGuard)
  @Get()
  async getAllAllergy(): Promise<Allergy[]> {
    const allergy = await this.allergyService.getAll();

    return allergy;
  }

  @UseGuards(AnyAuthGuard)
  @Get('by-user')
  async getAllAllergyByUser(
    @Query('userId') userId: string,
  ): Promise<Allergy[]> {
    const allergy = await this.allergyService.getAllByUser(parseInt(userId));

    return allergy;
  }

  @UseGuards(AnyAuthGuard)
  @Get('/:id')
  async getAllergyById(@Param('id') allergyId: string): Promise<Allergy> {
    const allergy = await this.allergyService.getById(parseInt(allergyId));

    return allergy;
  }

  @UseGuards(AnyAuthGuard)
  @Post()
  async createAllergy(@Body() body: CreateAllergyDto): Promise<Allergy> {
    const allergy = await this.allergyService.create(body);

    return allergy;
  }

  @UseGuards(AnyAuthGuard)
  @Post('many')
  async createAllergyMany(
    @Body() body: CreateAllergiesDto,
  ): Promise<Allergy[]> {
    const allergies = await this.allergyService.createMany(body);

    return allergies;
  }

  @UseGuards(AnyAuthGuard)
  @Put('/:id')
  async updateAllergy(
    @Param('id') allergyId: string,
    @Body() body: UpdateAllergyDto,
  ): Promise<Allergy> {
    const allergy = await this.allergyService.edit(parseInt(allergyId), body);

    return allergy;
  }

  @UseGuards(AnyAuthGuard)
  @Delete('/:id')
  async deleteAllergy(@Param('id') allergyId: string): Promise<Allergy> {
    return this.allergyService.delete(parseInt(allergyId));
  }
}
