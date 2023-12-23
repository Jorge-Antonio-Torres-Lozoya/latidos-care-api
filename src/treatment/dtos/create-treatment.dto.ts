import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTreatmentDto {
  @IsNumber()
  @IsNotEmpty()
  medicationId: number;

  @IsBoolean()
  @IsNotEmpty()
  taken: boolean;
}
