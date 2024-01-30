import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { MedicationSickness } from '../medication-sickness/medication-sickness.entity';
import { Sickness } from '../sickness/sickness.entity';
import { Account } from '../account/account.entity';

@Entity()
export class UserSickness {
  @PrimaryGeneratedColumn()
  userSicknessId: number;

  @Column({ unique: true })
  slug: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.userSicknesses, {
    onDelete: 'CASCADE',
  })
  account: Account;

  @ManyToOne(() => Sickness, (sickness) => sickness.userSicknesses, {
    onDelete: 'CASCADE',
  })
  sickness: Sickness;

  @OneToMany(
    () => MedicationSickness,
    (medicationSickness) => medicationSickness.userSickness,
    {
      cascade: true,
      onDelete: 'SET NULL',
    },
  )
  medicationSicknesses: MedicationSickness[];
}
