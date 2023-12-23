import { IsOptional, IsString } from 'class-validator';

export class UpdateAllergyDto {
  @IsString()
  @IsOptional()
  allergyName: string;
}
