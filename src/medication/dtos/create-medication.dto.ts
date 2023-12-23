import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMedicationDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  sicknessId: number;

  @IsString()
  @IsNotEmpty()
  medicationName: string;

  @IsNumber()
  @IsNotEmpty()
  timeConsumption: number;
}
