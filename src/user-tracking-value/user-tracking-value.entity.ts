import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { CurrentValue } from '../current-value/current-value.entity';
import { TrackingValue } from '../tracking-value/tracking-value.entity';
import { Account } from '../account/account.entity';

@Entity()
export class UserTrackingValue {
  @PrimaryGeneratedColumn()
  userTrackingValueId: number;

  @Column()
  minLimit: number;

  @Column()
  maxLimit: number;

  @Column()
  currentValue: number;

  @Column({ default: false })
  alertActivated: boolean;

  @Column({ default: false })
  minValueAlertActivated: boolean;

  @Column({ default: false })
  maxValueAlertActivated: boolean;

  @Column({ type: 'text', nullable: true })
  personalizedAlertMinValue: string;

  @Column({ type: 'text', nullable: true })
  personalizedAlertMaxValue: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.userTrackingValues, {
    onDelete: 'CASCADE',
  })
  account: Account;

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
