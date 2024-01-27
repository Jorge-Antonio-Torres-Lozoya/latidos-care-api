import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserTrackingValue } from '../user-tracking-value/user-tracking-value.entity';

@Entity()
export class TrackingValue {
  @PrimaryGeneratedColumn()
  trackingValueId: number;

  @Column()
  trackingValueName: string;

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

  @OneToMany(
    () => UserTrackingValue,
    (userTrackingValue) => userTrackingValue.trackingValue,
    {
      cascade: true,
      onDelete: 'SET NULL',
    },
  )
  userTrackingValues: UserTrackingValue[];
}
