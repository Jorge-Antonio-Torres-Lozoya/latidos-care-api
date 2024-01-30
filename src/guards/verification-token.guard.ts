import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountService } from '../account/account.service';

@Injectable()
export class VerificationTokenGuard implements CanActivate {
  constructor(private readonly accountService: AccountService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: string = request.query.token;
    const accountId: string = request.query.accountId;

    if (!token) {
      throw new UnauthorizedException('No esta autorizado');
    }

    const isValid = await this.accountService.validateToken(+accountId, token);

    if (!isValid) {
      throw new UnauthorizedException('No esta autorizado');
    }

    return true;
  }
}
