import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserTrackingValueDto {
  @IsNumber()
  @IsNotEmpty()
  accountId: number;

  @IsNumber()
  @IsNotEmpty()
  trackingValueId: number;

  @IsNumber()
  @IsNotEmpty()
  minLimit: number;

  @IsNumber()
  @IsNotEmpty()
  maxLimit: number;

  @IsNumber()
  @IsNotEmpty()
  currentValue: number;
}
