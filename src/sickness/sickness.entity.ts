import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { UserSickness } from '../user-sickness/user-sickness.entity';

@Entity()
export class Sickness {
  @PrimaryGeneratedColumn()
  sicknessId: number;

  @Column()
  sicknessName: string;

  @Column({ unique: true })
  slug: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => UserSickness, (userSickness) => userSickness.sickness, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  userSicknesses: UserSickness[];
}
