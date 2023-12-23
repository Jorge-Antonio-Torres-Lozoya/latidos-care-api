import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAllergyDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  allergyName: string;
}
