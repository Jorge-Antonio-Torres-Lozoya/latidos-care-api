import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserAllergyDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  allergyId: number;
}
