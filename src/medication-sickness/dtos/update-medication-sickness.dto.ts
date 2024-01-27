import { IsNumber, IsOptional } from 'class-validator';

export class UpdateMedicationSicknessDto {
  @IsNumber()
  @IsOptional()
  timeConsumption: number;
}
