import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class VerificationTokenQueryGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: string = request.query.token; // Assuming the token is in query parameters
    const userId: string = request.query.userId; // Assuming the user id is in the URL as a parameter

    if (!token) {
      throw new UnauthorizedException('No esta autorizado');
    }

    const isValid = await this.userService.validateToken(+userId, token);

    if (!isValid) {
      throw new UnauthorizedException('No esta autorizado');
    }

    return true;
  }
}
