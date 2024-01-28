import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserAllergyService } from './user-allergy.service';
import { UserAllergy } from './user-allergy.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserAllergyDto } from './dtos/user-allergy.dto';
import { CreateUserAllergyDto } from './dtos/create-user-allergy.dto';
import { RolesGuard } from '../account/account-auth/account-guards/roles.guard';
import { JwtAccountGuard } from '../account/account-auth/account-guards/account.jwt.guard';
import { Roles } from '../shared/roles.decorator';

@Controller('user-allergy')
export class UserAllergyController {
  constructor(private userAllergyService: UserAllergyService) {}

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin', 'User')
  @Serialize(UserAllergyDto)
  @Get('by-account')
  async getAllAccountAllergyByAccount(
    @Query('accountId') accountId: string,
  ): Promise<UserAllergy[]> {
    return await this.userAllergyService.getAllByAccount(parseInt(accountId));
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin', 'User')
  @Serialize(UserAllergyDto)
  @Post()
  async createUserAllergy(
    @Body() body: CreateUserAllergyDto,
  ): Promise<UserAllergy> {
    return await this.userAllergyService.create(body);
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin', 'User')
  @Serialize(UserAllergyDto)
  @Delete('/:id')
  async deleteUserAllergy(
    @Param('id') userAllergyId: string,
  ): Promise<UserAllergy> {
    return this.userAllergyService.delete(parseInt(userAllergyId));
  }
}
