import { Account } from '../account/account.entity';
import { Allergy } from '../allergy/allergy.entity';
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

  @ManyToOne(() => Account, (account) => account.userAllergies, {
    onDelete: 'CASCADE',
  })
  account: Account;

  @ManyToOne(() => Allergy, (allergies) => allergies.userAllergies, {
    onDelete: 'CASCADE',
  })
  allergy: Allergy;
}
