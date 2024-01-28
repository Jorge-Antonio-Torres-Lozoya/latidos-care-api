import { Expose, Transform } from 'class-transformer';

export class MedicationSicknessDto {
  @Expose()
  medicationSicknessId: number;

  @Expose()
  createdAt: Date;

  @Expose()
  timeConsumption: number;

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
  @Transform(({ obj }) => obj.userSickness.userSicknessId)
  userSicknessId: number;

  @Expose()
  @Transform(({ obj }) => obj.userSickness.createdAt)
  userSicknessCreatedAtId: number;

  @Expose()
  @Transform(({ obj }) => obj.userSickness.sickness.sicknessId)
  sicknessId: number;

  @Expose()
  @Transform(({ obj }) => obj.userSickness.sickness.sicknessName)
  sicknessName: string;

  @Expose()
  @Transform(({ obj }) => obj.userSickness.sickness.createdAt)
  sicknessCreatedAt: Date;

  @Expose()
  @Transform(({ obj }) => obj.medication.medicationId)
  medicationId: number;

  @Expose()
  @Transform(({ obj }) => obj.medication.medicationName)
  medicationName: string;

  @Expose()
  @Transform(({ obj }) => obj.medication.createdAt)
  medicationCreatedAt: Date;
}
