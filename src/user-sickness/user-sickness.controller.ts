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
import { AnyAuthGuard } from '../guards/any.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserSickness } from './user-sickness.entity';
import { UserSicknessDto } from './dtos/user-sickness.dto';
import { CreateUserSicknessDto } from './dtos/create-user-sickness.dto';

@Controller('user-sickness')
export class UserSicknessController {
  constructor(private userSicknessService: UserSicknessService) {}

  @UseGuards(AnyAuthGuard)
  @Serialize(UserSicknessDto)
  @Get('/:id')
  async getUserSicknessById(
    @Param('id') userSicknessId: string,
  ): Promise<UserSickness> {
    return await this.userSicknessService.getById(parseInt(userSicknessId));
  }

  @UseGuards(AnyAuthGuard)
  @Serialize(UserSicknessDto)
  @Get('by-user')
  async getAllUserSicknessByUser(
    @Query('userId') userId: string,
  ): Promise<UserSickness[]> {
    return await this.userSicknessService.getAllByUser(parseInt(userId));
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
