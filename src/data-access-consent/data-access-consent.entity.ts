import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Account } from '../account/account.entity';

@Entity()
export class DataAccessConsent {
  @PrimaryGeneratedColumn()
  consentId: number;

  @Column()
  consent: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.dataAccessConsents, {
    onDelete: 'CASCADE',
  })
  account: Account;
}
