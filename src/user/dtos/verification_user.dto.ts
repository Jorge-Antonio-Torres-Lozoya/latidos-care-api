import { IsNotEmpty, IsNumber } from 'class-validator';

export class VerificationUserDto {
  @IsNumber()
  @IsNotEmpty()
  verificationCode: number;
}
