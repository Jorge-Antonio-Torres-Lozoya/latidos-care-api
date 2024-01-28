import { IsNotEmpty, IsString } from 'class-validator';

export class AccountRoleDto {
  @IsNotEmpty()
  @IsString()
  roleName: string;
}
