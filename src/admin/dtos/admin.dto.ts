import { Expose } from 'class-transformer';

export class AdminDto {
  @Expose()
  adminId: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: number;

  @Expose()
  createdAt: Date;

  @Expose()
  tokenUser: string;

  @Expose()
  isLogin: boolean;

  @Expose()
  resetPasswordToken: string;

  @Expose()
  verification: boolean;
}
