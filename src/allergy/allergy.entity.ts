import { User } from '../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Allergy {
  @PrimaryGeneratedColumn()
  allergyId: number;

  @Column()
  allergyName: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.allergies, {
    onDelete: 'CASCADE',
  })
  user: User;
}
