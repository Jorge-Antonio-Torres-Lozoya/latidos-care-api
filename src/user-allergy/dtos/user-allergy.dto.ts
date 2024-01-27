import { Expose, Transform } from 'class-transformer';

export class UserAllergyDto {
  @Expose()
  userAllergyId: number;

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
  @Transform(({ obj }) => obj.allergy.allergyId)
  allergy: number;

  @Expose()
  @Transform(({ obj }) => obj.allergy.allergyName)
  allergyName: string;

  @Expose()
  @Transform(({ obj }) => obj.allergy.createdAt)
  allergyCreatedAt: Date;
}
