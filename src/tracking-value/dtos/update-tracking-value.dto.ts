import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTrackingValueDto {
  @IsString()
  @IsOptional()
  trackingValueName?: string;

  @IsNumber()
  @IsOptional()
  minLimit?: number;

  @IsNumber()
  @IsOptional()
  maxLimit?: number;
}
