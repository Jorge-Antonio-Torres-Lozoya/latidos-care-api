import { IsOptional, IsString } from 'class-validator';

export class UpdateMedicationDto {
  @IsString()
  @IsOptional()
  medicationName: string;
}
