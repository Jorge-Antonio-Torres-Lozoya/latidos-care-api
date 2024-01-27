import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserSicknessDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  sicknessId: number;
}
