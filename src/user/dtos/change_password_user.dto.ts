import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
