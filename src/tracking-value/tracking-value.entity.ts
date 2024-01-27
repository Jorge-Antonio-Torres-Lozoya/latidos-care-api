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
