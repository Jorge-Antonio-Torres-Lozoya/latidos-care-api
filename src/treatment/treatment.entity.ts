import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { Medication } from '../medication/medication.entity';

@Entity()
export class Treatment {
  @PrimaryGeneratedColumn()
  treatmentId: number;

  @Column({ default: false })
  taken: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Medication, (medication) => medication.treatments, {
    onDelete: 'CASCADE',
  })
  medication: Medication;
}
