import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

import { MedicationSickness } from '../medication-sickness/medication-sickness.entity';

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

  @OneToMany(
    () => MedicationSickness,
    (medicationSickness) => medicationSickness.medication,
    {
      cascade: true,
      onDelete: 'SET NULL',
    },
  )
  medicationSicknesses: MedicationSickness[];
}
