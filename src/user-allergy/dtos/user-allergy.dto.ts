import { Expose, Transform } from 'class-transformer';

export class UserAllergyDto {
  @Expose()
  userAllergyId: number;

  @Expose()
  createdAt: Date;

  @Expose()
  @Transform(({ obj }) => obj.account.accountId)
  accountId: number;

  @Expose()
  @Transform(({ obj }) => obj.account.firstName)
  firstName: string;

  @Expose()
  @Transform(({ obj }) => obj.account.lastName)
  lastName?: string;

  @Expose()
  @Transform(({ obj }) => obj.allergy.allergyId)
  allergyId: number;

  @Expose()
  @Transform(({ obj }) => obj.allergy.allergyName)
  allergyName: string;

  @Expose()
  @Transform(({ obj }) => obj.allergy.createdAt)
  allergyCreatedAt: Date;
}
