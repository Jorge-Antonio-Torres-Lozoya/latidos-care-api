import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AdminService } from '../admin.service';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(
  Strategy,
  'local-admin',
) {
  constructor(private adminService: AdminService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string) {
    const admin = await this.adminService.loginAdmin(email, password);
    if (!admin) {
      throw new UnauthorizedException('Error, la información es incorrecta');
    }

    return admin;
  }
}
