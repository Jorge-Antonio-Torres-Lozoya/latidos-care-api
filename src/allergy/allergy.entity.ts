import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserAllergy } from '../user-allergy/user-allergy.entity';

@Entity()
export class Allergy {
  @PrimaryGeneratedColumn()
  allergyId: number;

  @Column()
  allergyName: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserAllergy, (userAllergy) => userAllergy.allergy, {
    onDelete: 'CASCADE',
  })
  userAllergies: UserAllergy;
}
