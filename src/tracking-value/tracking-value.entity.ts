import { User } from '../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { CurrentValue } from '../current-value/current-value.entity';

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

  @ManyToOne(() => User, (user) => user.trackingValues, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => CurrentValue, (currentValue) => currentValue.trackingValue, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  currentValues: CurrentValue[];
}
