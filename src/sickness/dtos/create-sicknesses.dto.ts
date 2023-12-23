import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

export class CreateSicknessesDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsArray()
  //@ValidateNested({ each: true })
  sicknessName: string[];
}
