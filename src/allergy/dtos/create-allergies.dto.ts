import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAllergiesDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsArray()
  allergyName: string[];
}
