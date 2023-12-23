import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { Treatment } from '../treatment/treatment.entity';
import { User } from '../user/user.entity';
import { Sickness } from '../sickness/sickness.entity';

@Entity()
export class Medication {
  @PrimaryGeneratedColumn()
  medicationId: number;

  @Column()
  medicationName: string;

  @Column()
  timeConsumption: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.medications, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Sickness, (sickness) => sickness.medications, {
    onDelete: 'CASCADE',
  })
  sickness: Sickness;

  @OneToMany(() => Treatment, (treatment) => treatment.medication, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  treatments: Treatment[];
}
