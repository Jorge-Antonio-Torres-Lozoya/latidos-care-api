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
    let jwtGuardResult: boolean | Observable<boolean> = false;
    try {
      jwtGuardResult = await this.jwtUserGuard.canActivate(context);
    } catch (e) {
      console.error('Error in JWT Guard:', e);
      // Optionally handle specific errors or rethrow if necessary
    }

    if (jwtGuardResult) {
      return true; // jwtUserGuard passed, no need to check the next guard
    }

    // If jwtUserGuard did not pass, check verificationTokenGuard
    try {
      return await this.verificationTokenGuard.canActivate(context);
    } catch (e) {
      console.error('Error in Verification Token Guard:', e);
      // If verificationTokenGuard also fails, throw an UnauthorizedException
      throw new UnauthorizedException('No esta autorizado');
    }
  }
}
