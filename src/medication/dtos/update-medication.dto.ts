import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMedicationDto {
  @IsString()
  @IsOptional()
  medicationName: string;

  @IsNumber()
  @IsOptional()
  timeConsumption: number;
}
