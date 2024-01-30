import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { VerificationTokenGuard } from './verification-token.guard';
import { JwtAccountGuard } from '../account/account-auth/account-guards/account.jwt.guard';

@Injectable()
export class AnyAuthGuard implements CanActivate {
  constructor(
    private jwtAccountGuard: JwtAccountGuard,
    private verificationTokenGuard: VerificationTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      return <boolean>await this.jwtAccountGuard.canActivate(context);
    } catch (e) {
      console.error(e);
    }

    try {
      return <boolean>await this.verificationTokenGuard.canActivate(context);
    } catch (e) {
      // verification token guard also failed
      throw new UnauthorizedException(
        'No esta autorizado a realizar esta operación',
      );
    }
  }
}
