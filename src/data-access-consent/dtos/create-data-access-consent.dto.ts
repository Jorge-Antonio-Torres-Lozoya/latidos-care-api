import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDataAccessConsentDto {
  @IsNumber()
  @IsNotEmpty()
  accountId: number;

  @IsBoolean()
  @IsNotEmpty()
  consent: boolean;
}
