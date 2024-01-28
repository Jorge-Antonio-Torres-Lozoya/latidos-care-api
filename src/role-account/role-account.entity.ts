import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from '../account/account.entity';
import { Role } from '../role/role.entity';

@Entity()
export class RoleAccount {
  @PrimaryGeneratedColumn()
  roleAccountId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.rolesAccount, {
    onDelete: 'CASCADE',
  })
  account: Account;

  @ManyToOne(() => Role, (account) => account.rolesAccount, {
    onDelete: 'CASCADE',
  })
  role: Role;
}
