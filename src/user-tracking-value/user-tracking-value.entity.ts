import { User } from '../user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { CurrentValue } from '../current-value/current-value.entity';
import { TrackingValue } from '../tracking-value/tracking-value.entity';

@Entity()
export class UserTrackingValue {
  @PrimaryGeneratedColumn()
  userTrackingValueId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.userTrackingValues, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(
    () => CurrentValue,
    (currentValue) => currentValue.userTrackingValue,
    {
      cascade: true,
      onDelete: 'SET NULL',
    },
  )
  currentValues: CurrentValue[];

  @ManyToOne(
    () => TrackingValue,
    (trackingValue) => trackingValue.userTrackingValues,
    {
      onDelete: 'CASCADE',
    },
  )
  trackingValue: TrackingValue;
}
