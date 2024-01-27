import { Allergy } from '../allergy/allergy.entity';
import { User } from '../user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class UserAllergy {
  @PrimaryGeneratedColumn()
  userAllergyId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.userAllergies, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Allergy, (allergies) => allergies.userAllergies, {
    onDelete: 'CASCADE',
  })
  allergy: Allergy;
}
