import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { Treatment } from '../treatment/treatment.entity';
import { Medication } from '../medication/medication.entity';
import { UserSickness } from '../user-sickness/user-sickness.entity';
import { Account } from '../account/account.entity';

@Entity()
export class MedicationSickness {
  @PrimaryGeneratedColumn()
  medicationSicknessId: number;

  @Column()
  timeConsumption: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.medicationSicknesses, {
    onDelete: 'CASCADE',
  })
  account: Account;

  @ManyToOne(
    () => UserSickness,
    (userSickness) => userSickness.medicationSicknesses,
    {
      onDelete: 'CASCADE',
    },
  )
  userSickness: UserSickness;

  @OneToMany(() => Treatment, (treatment) => treatment.medicationSickness, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  treatments: Treatment[];

  @ManyToOne(
    () => Medication,
    (medication) => medication.medicationSicknesses,
    {
      onDelete: 'CASCADE',
    },
  )
  medication: Medication;
}
