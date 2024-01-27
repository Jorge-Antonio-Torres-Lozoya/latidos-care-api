import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTreatmentDto {
  @IsNumber()
  @IsNotEmpty()
  medicationSicknessId: number;

  @IsBoolean()
  @IsNotEmpty()
  taken: boolean;
}
