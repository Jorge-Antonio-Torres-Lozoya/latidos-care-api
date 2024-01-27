import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMedicationDto {
  @IsString()
  @IsNotEmpty()
  medicationName: string;
}
