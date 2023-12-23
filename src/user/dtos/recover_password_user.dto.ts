import { IsNotEmpty, IsString } from 'class-validator';

export class RecoverPasswordUserDto {
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
