import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMedicationSicknessDto {
  @IsNumber()
  @IsNotEmpty()
  accountId: number;

  @IsNumber()
  @IsNotEmpty()
  userSicknessId: number;

  @IsNumber()
  @IsNotEmpty()
  medicationId: number;

  @IsNumber()
  @IsNotEmpty()
  timeConsumption: number;
}
