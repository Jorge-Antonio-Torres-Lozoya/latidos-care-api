import { Expose, Transform } from 'class-transformer';

export class RoleAccountDto {
  @Expose()
  roleAccountId: number;

  @Expose()
  @Transform(({ obj }) => obj.role.roleName)
  roleName: string;
}
