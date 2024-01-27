import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserAllergyService } from './user-allergy.service';
import { AnyAuthGuard } from '../guards/any.guard';
import { UserAllergy } from './user-allergy.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserAllergyDto } from './dtos/user-allergy.dto';

@Controller('user-allergy')
export class UserAllergyController {
  constructor(private userAllergyService: UserAllergyService) {}

  @UseGuards(AnyAuthGuard)
  @Serialize(UserAllergyDto)
  @Get('/:id')
  async getUserAllergyById(
    @Param('id') userAllergyId: string,
  ): Promise<UserAllergy> {
    return await this.userAllergyService.getById(parseInt(userAllergyId));
  }

  @UseGuards(AnyAuthGuard)
  @Serialize(UserAllergyDto)
  @Get('by-user')
  async getAllAllergyByUser(
    @Query('userId') userId: string,
  ): Promise<UserAllergy[]> {
    return await this.userAllergyService.getAllByUser(parseInt(userId));
  }

  @UseGuards(AnyAuthGuard)
  @Serialize(UserAllergyDto)
  @Delete('/:id')
  async deleteUserAllergy(
    @Param('id') userAllergyId: string,
  ): Promise<UserAllergy> {
    return this.userAllergyService.delete(parseInt(userAllergyId));
  }
}
