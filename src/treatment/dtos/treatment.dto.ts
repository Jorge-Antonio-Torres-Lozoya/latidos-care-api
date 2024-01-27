import { Expose, Transform } from 'class-transformer';

export class TreatmentDto {
  @Expose()
  taken: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  @Transform(({ obj }) => obj.medicationSickness.medicationSicknessId)
  medicationSicknessId: number;

  @Expose()
  @Transform(({ obj }) => obj.medicationSickness.medicationSicknessId)
  medicationSicknessCreatedAt: Date;

  @Expose()
  @Transform(({ obj }) => obj.medicationSickness.medicationSicknessId)
  timeConsumption: number;

  @Expose()
  @Transform(({ obj }) => obj.medicationSickness.user.userId)
  userId: number;

  @Expose()
  @Transform(({ obj }) => obj.medicationSickness.user.firstName)
  firstName: string;

  @Expose()
  @Transform(({ obj }) => obj.medicationSickness.user.lastName)
  lastName?: string;

  @Expose()
  @Transform(({ obj }) => obj.medicationSickness.userSickness.userSicknessId)
  userSicknessId: number;

  @Expose()
  @Transform(({ obj }) => obj.medicationSickness.userSickness.createdAt)
  userSicknessCreatedAtId: number;

  @Expose()
  @Transform(
    ({ obj }) => obj.medicationSickness.userSickness.sickness.sicknessId,
  )
  sicknessId: number;

  @Expose()
  @Transform(
    ({ obj }) => obj.medicationSickness.userSickness.sickness.sicknessName,
  )
  sicknessName: string;

  @Expose()
  @Transform(
    ({ obj }) => obj.medicationSickness.userSickness.sickness.createdAt,
  )
  sicknessCreatedAt: Date;

  @Expose()
  @Transform(({ obj }) => obj.medicationSickness.medication.medicationId)
  medicationId: number;

  @Expose()
  @Transform(({ obj }) => obj.medicationSickness.medication.medicationName)
  medicationName: string;

  @Expose()
  @Transform(({ obj }) => obj.medicationSickness.medication.createdAt)
  medicationCreatedAt: Date;
}
