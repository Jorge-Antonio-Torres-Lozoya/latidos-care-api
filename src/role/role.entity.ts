import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleAccount } from '../role-account/role-account.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column()
  roleName: string;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => RoleAccount, (roleAccount) => roleAccount.role, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  rolesAccount: RoleAccount[];
}
