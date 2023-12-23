import { Expose } from 'class-transformer';
import { TrackingValue } from '../../tracking-value/tracking-value.entity';

export class CurrentValueDto {
  @Expose()
  currentNumber: number;

  @Expose()
  createdAt: Date;

  @Expose()
  trackingValue: TrackingValue;
}
