import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSicknessDto {
  @IsString()
  @IsNotEmpty()
  sicknessName: string;
}
