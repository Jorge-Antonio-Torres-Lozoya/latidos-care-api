import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class TrackingCurrentValueDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsOptional()
  currentValue: number;
}
