import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserAllergyDto {
  @IsNumber()
  @IsNotEmpty()
  accountId: number;

  @IsNumber()
  @IsNotEmpty()
  allergyId: number;
}
