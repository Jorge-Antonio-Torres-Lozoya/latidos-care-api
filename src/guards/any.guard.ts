import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { JwtUserGuard } from '../user/user-auth/user-guard/user.jwt.guard';
import { VerificationTokenGuard } from './verification-token.guard';
import { Observable } from 'rxjs';

@Injectable()
export class AnyAuthGuard implements CanActivate {
  constructor(
    private jwtUserGuard: JwtUserGuard,
    private verificationTokenGuard: VerificationTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let jwtGuardResult: boolean | Observable<boolean> = false;
    try {
      jwtGuardResult = await this.jwtUserGuard.canActivate(context);
    } catch (e) {
      console.error('Error in JWT Guard:', e);
    }

    if (jwtGuardResult) {
      return true; // jwtUserGuard passed, no need to check the next guard
    }

    try {
      return await this.verificationTokenGuard.canActivate(context);
    } catch (e) {
      console.error('Error in Verification Token Guard:', e);
      // verification token guard also failed
      throw new UnauthorizedException('You are not authorized');
    }
  }
}
