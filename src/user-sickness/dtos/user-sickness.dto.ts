import { Expose, Transform } from 'class-transformer';
import { MedicationSickness } from '../../medication-sickness/medication-sickness.entity';

export class UserSicknessDto {
  @Expose()
  userSicknessId: number;

  @Expose()
  slug: string;

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
  @Transform(({ obj }) => obj.sickness.sicknessId)
  sicknessId: number;

  @Expose()
  @Transform(({ obj }) => obj.sickness.sicknessName)
  sicknessName: string;

  @Expose()
  @Transform(({ obj }) => obj.sickness.createdAt)
  sicknessCreatedAt: Date;

  @Expose()
  @Transform(({ obj }) => obj.medicationSicknesses)
  medicationSicknesses: MedicationSickness[];
}
