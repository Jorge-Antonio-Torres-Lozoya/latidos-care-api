import { Expose } from 'class-transformer';

export class VerificationToken {
  @Expose()
  verificationToken: string;
}
