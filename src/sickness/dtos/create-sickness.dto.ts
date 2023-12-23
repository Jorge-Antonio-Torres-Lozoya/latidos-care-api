import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSicknessDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  sicknessName: string;
}
