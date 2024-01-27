import { IsOptional, IsString } from 'class-validator';

export class UpdateTrackingValueDto {
  @IsString()
  @IsOptional()
  trackingValueName: string;
}
