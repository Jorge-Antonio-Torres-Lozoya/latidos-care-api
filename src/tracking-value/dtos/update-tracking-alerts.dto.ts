import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateTrackingAlertsDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsBoolean()
  @IsOptional()
  alertActivated: boolean;

  @IsBoolean()
  @IsOptional()
  minValueAlertActivated: boolean;

  @IsBoolean()
  @IsOptional()
  maxValueAlertActivated: boolean;

  @IsString()
  @IsOptional()
  personalizedAlertMinValue: string;

  @IsString()
  @IsOptional()
  personalizedAlertMaxValue: string;
}
