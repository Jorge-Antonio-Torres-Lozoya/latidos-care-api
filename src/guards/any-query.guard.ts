import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { JwtUserGuard } from '../user/user-auth/user-guard/user.jwt.guard';
import { VerificationTokenQueryGuard } from './verification-token-query.guard';
import { Observable } from 'rxjs';

@Injectable()
export class AnyQueryAuthGuard implements CanActivate {
  constructor(
    private jwtUserGuard: JwtUserGuard,
    private verificationTokenGuard: VerificationTokenQueryGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const jwtGuardResult: boolean | Observable<boolean> =
        await this.jwtUserGuard.canActivate(context);

      if (jwtGuardResult === true) {
        return true;
      }

      const verificationGuardResult: boolean | Observable<boolean> =
        await this.verificationTokenGuard.canActivate(context);

      if (verificationGuardResult === true) {
        return true;
      }
    } catch (e) {
      console.error('Error in guards:', e);
      // Optionally handle specific errors or rethrow if necessary
    }

    throw new UnauthorizedException('No esta autorizado');
  }
}
