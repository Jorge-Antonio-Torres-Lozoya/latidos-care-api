import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserTrackingValueDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

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
