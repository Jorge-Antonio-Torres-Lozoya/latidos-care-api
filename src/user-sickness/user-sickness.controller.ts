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
import { AnyAuthGuard } from '../guards/any.guard';

@Controller('user-sickness')
export class UserSicknessController {
  constructor(private userSicknessService: UserSicknessService) {}

  @UseGuards(AnyAuthGuard)
  @Serialize(UserSicknessDto)
  @Get('by-user')
  async getAllUserSicknessByAccount(
    @Query('accountId') accountId: string,
  ): Promise<UserSickness[]> {
    return await this.userSicknessService.getAllByAccount(parseInt(accountId));
  }

  @Serialize(UserSicknessDto)
  @Get('/:id')
  async getById(@Param('id') userSicknessId: string): Promise<UserSickness> {
    return await this.userSicknessService.getById(parseInt(userSicknessId));
  }

  @Get('by-slug/:slug')
  async getUserSicknessBySlug(
    @Param('slug') slug: string,
  ): Promise<UserSickness> {
    return await this.userSicknessService.getBySlug(slug);
  }

  @UseGuards(AnyAuthGuard)
  @Serialize(UserSicknessDto)
  @Post()
  async createUserSickness(
    @Body() body: CreateUserSicknessDto,
  ): Promise<UserSickness> {
    return await this.userSicknessService.create(body);
  }

  @UseGuards(AnyAuthGuard)
  @Serialize(UserSicknessDto)
  @Delete('/:id')
  async deleteUserSickness(
    @Param('id') userSicknessId: string,
  ): Promise<UserSickness> {
    return this.userSicknessService.delete(parseInt(userSicknessId));
  }
}
