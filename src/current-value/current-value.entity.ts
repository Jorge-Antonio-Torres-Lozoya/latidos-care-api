import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { UserTrackingValue } from '../user-tracking-value/user-tracking-value.entity';

@Entity()
export class CurrentValue {
  @PrimaryGeneratedColumn()
  currentValueId: number;

  @Column()
  currentNumber: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(
    () => UserTrackingValue,
    (userTrackingValue) => userTrackingValue.currentValues,
    {
      onDelete: 'CASCADE',
    },
  )
  userTrackingValue: UserTrackingValue;
}
