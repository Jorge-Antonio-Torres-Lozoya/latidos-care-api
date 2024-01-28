import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserSicknessDto {
  @IsNumber()
  @IsNotEmpty()
  accountId: number;

  @IsNumber()
  @IsNotEmpty()
  sicknessId: number;
}
