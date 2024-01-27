import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { MedicationSickness } from '../medication-sickness/medication-sickness.entity';

@Entity()
export class Treatment {
  @PrimaryGeneratedColumn()
  treatmentId: number;

  @Column({ default: false })
  taken: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(
    () => MedicationSickness,
    (medicationSickness) => medicationSickness.treatments,
    {
      onDelete: 'CASCADE',
    },
  )
  medicationSickness: MedicationSickness;
}
