import { Expose, Transform } from 'class-transformer';

export class CurrentValueDto {
  @Expose()
  currentNumber: number;

  @Expose()
  createdAt: Date;

  @Expose()
  @Transform(({ obj }) => obj.userTrackingValue.userTrackingValueId)
  userTrackingValueId: number;

  @Expose()
  @Transform(({ obj }) => obj.userTrackingValue.minLimit)
  minLimit: number;

  @Expose()
  @Transform(({ obj }) => obj.userTrackingValue.maxLimit)
  maxLimit: number;

  @Expose()
  @Transform(({ obj }) => obj.userTrackingValue.currentValue)
  currentValue: number;

  @Expose()
  @Transform(({ obj }) => obj.userTrackingValue.alertActivated)
  alertActivated: boolean;

  @Expose()
  @Transform(({ obj }) => obj.userTrackingValue.minValueAlertActivated)
  minValueAlertActivated: boolean;

  @Expose()
  @Transform(({ obj }) => obj.userTrackingValue.maxValueAlertActivated)
  maxValueAlertActivated: boolean;

  @Expose()
  @Transform(({ obj }) => obj.userTrackingValue.personalizedAlertMinValue)
  personalizedAlertMinValue: string;

  @Expose()
  @Transform(({ obj }) => obj.userTrackingValue.personalizedAlertMaxValue)
  personalizedAlertMaxValue: string;

  @Expose()
  @Transform(({ obj }) => obj.userTrackingValue.createdAt)
  userTrackingValueCreatedAt: Date;

  @Expose()
  @Transform(({ obj }) => obj.userTrackingValue.user.userId)
  userId: number;

  @Expose()
  @Transform(({ obj }) => obj.userTrackingValue.user.firstName)
  firstName: string;

  @Expose()
  @Transform(({ obj }) => obj.userTrackingValue.user.lastName)
  lastName?: string;

  @Expose()
  @Transform(({ obj }) => obj.userTrackingValue.trackingValue.trackingValueId)
  trackingValueId: number;

  @Expose()
  @Transform(({ obj }) => obj.userTrackingValue.trackingValue.trackingValueName)
  trackingValueName: string;

  @Expose()
  @Transform(({ obj }) => obj.userTrackingValue.trackingValue.createdAt)
  trackingValueCreatedAt: Date;
}
