import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserTrackingValueDto {
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

  @IsNumber()
  @IsOptional()
  minLimit?: number;

  @IsNumber()
  @IsOptional()
  maxLimit?: number;

  @IsNumber()
  @IsOptional()
  currentValue: number;
}
