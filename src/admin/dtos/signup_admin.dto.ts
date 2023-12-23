import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpAdminDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
