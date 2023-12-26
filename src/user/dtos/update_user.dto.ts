import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
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

  @IsOptional()
  @IsString()
  dni: string;

  @IsOptional()
  @IsString()
  tutorFirstName: string;

  @IsOptional()
  @IsString()
  tutorLastName: string;

  @IsOptional()
  @IsString()
  tutorPhoneNumber: string;
}
