import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;
}
