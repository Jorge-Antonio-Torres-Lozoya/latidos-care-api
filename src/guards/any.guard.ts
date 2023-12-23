import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { JwtUserGuard } from '../user/user-auth/user-guard/user.jwt.guard';
import { VerificationTokenGuard } from './verification-token.guard';

@Injectable()
export class AnyAuthGuard implements CanActivate {
  constructor(
    private jwtUserGuard: JwtUserGuard,
    private verificationTokenGuard: VerificationTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      return <boolean>await this.jwtUserGuard.canActivate(context);
    } catch (e) {
      console.error(e);
    }

    try {
      return <boolean>await this.verificationTokenGuard.canActivate(context);
    } catch (e) {
      // verification token guard also failed
      throw new UnauthorizedException('You are not authorized');
    }
  }
}
