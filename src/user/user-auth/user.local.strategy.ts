import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../user.service';

@Injectable()
export class UserLocalStrategy extends PassportStrategy(
  Strategy,
  'local-user',
) {
  constructor(private userService: UserService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string) {
    const user = await this.userService.loginUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Error, la información es incorrecta');
    }

    return user;
  }
}
