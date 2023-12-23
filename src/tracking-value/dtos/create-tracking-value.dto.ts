import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackingValueDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  trackingValueName: string;

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
