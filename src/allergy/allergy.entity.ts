import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
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

  @OneToMany(() => UserAllergy, (userAllergy) => userAllergy.allergy, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  userAllergies: UserAllergy[];
}
