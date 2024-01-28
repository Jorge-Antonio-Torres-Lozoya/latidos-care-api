import { Expose, Transform } from 'class-transformer';
import { RoleAccount } from '../../role-account/role-account.entity';

export class AccountDto {
  @Expose()
  accountId: number;

  @Expose()
  active: boolean;

  @Expose()
  activeRole: string;

  @Expose()
  createdAt: Date;

  @Expose()
  firstName: string;

  @Expose()
  slug: boolean;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  dni: string;

  @Expose()
  tutorFirstName: string;

  @Expose()
  tutorLastName: string;

  @Expose()
  tutorPhoneNumber: string;

  @Expose()
  tokenUser: string;

  @Expose()
  registerData: boolean;

  @Expose()
  verificationTokenUser: string;

  @Expose()
  isLogin: boolean;

  @Expose()
  resetPasswordToken: string;

  @Expose()
  verification: boolean;

  @Expose()
  @Transform(({ obj }) => obj.rolesAccount)
  roles: RoleAccount[];
}
