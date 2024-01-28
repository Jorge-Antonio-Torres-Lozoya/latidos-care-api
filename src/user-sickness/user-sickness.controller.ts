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
import { UserSicknessService } from './user-sickness.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserSickness } from './user-sickness.entity';
import { UserSicknessDto } from './dtos/user-sickness.dto';
import { CreateUserSicknessDto } from './dtos/create-user-sickness.dto';
import { RolesGuard } from '../account/account-auth/account-guards/roles.guard';
import { JwtAccountGuard } from '../account/account-auth/account-guards/account.jwt.guard';
import { Roles } from '../shared/roles.decorator';

@Controller('user-sickness')
export class UserSicknessController {
  constructor(private userSicknessService: UserSicknessService) {}

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin', 'User')
  @Serialize(UserSicknessDto)
  @Get('by-user')
  async getAllUserSicknessByAccount(
    @Query('accountId') accountId: string,
  ): Promise<UserSickness[]> {
    return await this.userSicknessService.getAllByAccount(parseInt(accountId));
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin', 'User')
  @Serialize(UserSicknessDto)
  @Post()
  async createUserSickness(
    @Body() body: CreateUserSicknessDto,
  ): Promise<UserSickness> {
    return await this.userSicknessService.create(body);
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin', 'User')
  @Serialize(UserSicknessDto)
  @Delete('/:id')
  async deleteUserSickness(
    @Param('id') userSicknessId: string,
  ): Promise<UserSickness> {
    return this.userSicknessService.delete(parseInt(userSicknessId));
  }
}
