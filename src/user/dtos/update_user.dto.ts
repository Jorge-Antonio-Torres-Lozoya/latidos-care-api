import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

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
  @IsNumber()
  phoneNumber: number;

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
  @IsNumber()
  tutorPhoneNumber: number;
}
