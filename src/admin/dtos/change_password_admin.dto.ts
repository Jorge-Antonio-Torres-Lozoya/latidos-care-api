import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordAdminDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
