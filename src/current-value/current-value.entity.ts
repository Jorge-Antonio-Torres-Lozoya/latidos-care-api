import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { User } from '../user/user.entity';
import { TrackingValue } from '../tracking-value/tracking-value.entity';

@Entity()
export class CurrentValue {
  @PrimaryGeneratedColumn()
  currentValueId: number;

  @Column()
  currentNumber: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.currentValues, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(
    () => TrackingValue,
    (trackingValue) => trackingValue.currentValues,
    {
      onDelete: 'CASCADE',
    },
  )
  trackingValue: TrackingValue;
}
