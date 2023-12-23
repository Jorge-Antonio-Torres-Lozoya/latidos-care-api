import { User } from '../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Medication } from '../medication/medication.entity';

@Entity()
export class Sickness {
  @PrimaryGeneratedColumn()
  sicknessId: number;

  @Column()
  sicknessName: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.sicknesses, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Medication, (medication) => medication.sickness, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  medications: Medication[];
}
