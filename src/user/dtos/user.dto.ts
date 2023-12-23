import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  userId: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: number;

  @Expose()
  dni: string;

  @Expose()
  tutorFirstName: string;

  @Expose()
  tutorLastName: string;

  @Expose()
  tutorPhoneNumber: number;

  @Expose()
  createdAt: Date;

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
}
