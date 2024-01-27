import { User } from '../user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { MedicationSickness } from '../medication-sickness/medication-sickness.entity';
import { Sickness } from '../sickness/sickness.entity';

@Entity()
export class UserSickness {
  @PrimaryGeneratedColumn()
  userSicknessId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.userSicknesses, {
    onDelete: 'CASCADE',
  })
  user: User;

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
