import { Expose, Transform } from 'class-transformer';
import { CurrentValue } from '../../current-value/current-value.entity';

export class UserTrackingValueDto {
  @Expose()
  userTrackingValueId: number;

  @Expose()
  minLimit: number;

  @Expose()
  maxLimit: number;

  @Expose()
  currentValue: number;

  @Expose()
  alertActivated: boolean;

  @Expose()
  minValueAlertActivated: boolean;

  @Expose()
  maxValueAlertActivated: boolean;

  @Expose()
  personalizedAlertMinValue: string;

  @Expose()
  personalizedAlertMaxValue: string;

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
  @Transform(({ obj }) => obj.trackingValue.trackingValueId)
  trackingValueId: number;

  @Expose()
  @Transform(({ obj }) => obj.trackingValue.trackingValueName)
  trackingValueName: string;

  @Expose()
  @Transform(({ obj }) => obj.trackingValue.createdAt)
  trackingValueCreatedAt: Date;

  @Expose()
  @Transform(({ obj }) => obj.currentValues)
  currentValues: CurrentValue[];
}
