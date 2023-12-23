import { IsOptional, IsString } from 'class-validator';

export class UpdateSicknessDto {
  @IsString()
  @IsOptional()
  sicknessName: string;
}
