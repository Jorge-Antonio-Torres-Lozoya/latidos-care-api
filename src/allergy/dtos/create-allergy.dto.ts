import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAllergyDto {
  @IsString()
  @IsNotEmpty()
  allergyName: string;
}
