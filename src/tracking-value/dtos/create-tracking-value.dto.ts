import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTrackingValueDto {
  @IsString()
  @IsNotEmpty()
  trackingValueName: string;
}
