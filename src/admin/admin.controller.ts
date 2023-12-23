import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AdminDto } from './dtos/admin.dto';
import { SignUpAdminDto } from './dtos/signup_admin.dto';
import { JwtAdminGuard } from './admin-auth/admin-guards/admin.jwt.guard';
import { LocalAdminGuard } from './admin-auth/admin-guards/admin.guard';
import { UpdateAdminDto } from './dtos/update_admin.dto';
import { ChangePasswordAdminDto } from './dtos/change_password_admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Serialize(AdminDto)
  @Get()
  getAllAdmins() {
    return this.adminService.getAll();
  }

  @Serialize(AdminDto)
  @Get()
  getAllByEmail(@Query('email') email: string) {
    return this.adminService.getByEmail(email);
  }

  @Serialize(AdminDto)
  @Get('/:id')
  async getOneAdmin(@Param('id') adminId: string) {
    const foundAdmin = await this.adminService.getOne(parseInt(adminId));
    if (!foundAdmin) {
      throw new NotFoundException('The account does not exists');
    }

    return foundAdmin;
  }

  @Serialize(AdminDto)
  @Post('/signup')
  async signupAdmin(@Body() body: SignUpAdminDto) {
    const admin = await this.adminService.signupAdmin(
      body.firstName,
      body.email,
      body.password,
    );

    return admin;
  }

  @UseGuards(LocalAdminGuard)
  @Post('/login')
  async loginAccountAdmin(@Request() req: any) {
    return await this.adminService.jwtValidationAdmin(req.admin);
  }

  @UseGuards(JwtAdminGuard)
  @Serialize(AdminDto)
  @Put('/:id')
  async updateAdmin(
    @Param('id') adminId: string,
    @Body() body: UpdateAdminDto,
  ) {
    const updatedAdmin = await this.adminService.getOne(parseInt(adminId));

    if (!updatedAdmin) {
      throw new NotFoundException('The account does not exists');
    }

    return this.adminService.updateAdmin(parseInt(adminId), body);
  }

  @Serialize(AdminDto)
  @UseGuards(JwtAdminGuard)
  @Put('/change-password/:id')
  async changePasswordAdmin(
    @Param('id') adminId: string,
    @Body() body: ChangePasswordAdminDto,
  ) {
    const admin = await this.adminService.getOne(parseInt(adminId));

    if (!admin) {
      throw new NotFoundException('The account does not exists');
    }

    return this.adminService.updatePassword(
      parseInt(adminId),
      body.password,
      body.newPassword,
    );
  }

  @UseGuards(JwtAdminGuard)
  @Serialize(AdminDto)
  @Delete('/:id')
  async deleteAdmin(@Param('id') adminId: string) {
    const deleteAdmin = await this.adminService.getOne(parseInt(adminId));

    if (!deleteAdmin) {
      throw new NotFoundException('The account does not exists');
    }

    return this.adminService.delete(parseInt(adminId));
  }
}
