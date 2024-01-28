import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAllergiesDto {
  @IsNumber()
  @IsNotEmpty()
  accountId: number;

  @IsArray()
  allergyName: string[];
}
