import { Expose, Transform } from 'class-transformer';

export class UserSicknessDto {
  @Expose()
  userSicknessId: number;

  @Expose()
  createdAt: Date;

  @Expose()
  @Transform(({ obj }) => obj.user.userId)
  userId: number;

  @Expose()
  @Transform(({ obj }) => obj.user.firstName)
  firstName: string;

  @Expose()
  @Transform(({ obj }) => obj.user.lastName)
  lastName?: string;

  @Expose()
  @Transform(({ obj }) => obj.sickness.sicknessId)
  sicknessId: number;

  @Expose()
  @Transform(({ obj }) => obj.sickness.sicknessName)
  sicknessName: string;

  @Expose()
  @Transform(({ obj }) => obj.sickness.createdAt)
  sicknessCreatedAt: Date;
}
