import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MedicationSickness } from '../medication-sickness/medication-sickness.entity';
import { UserAllergy } from '../user-allergy/user-allergy.entity';
import { UserTrackingValue } from '../user-tracking-value/user-tracking-value.entity';
import { UserSickness } from '../user-sickness/user-sickness.entity';
import { RoleAccount } from '../role-account/role-account.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  accountId: number;

  @Column({ unique: true })
  slug: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ nullable: true })
  verificationTokenExpiration: Date;

  @Column()
  activeRole: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  dni: string;

  @Column({ nullable: true })
  tutorFirstName: string;

  @Column({ nullable: true })
  tutorLastName: string;

  @Column({ nullable: true })
  tutorPhoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  verificationCode: number;

  @Column({ default: false })
  registerData: boolean;

  @Column({ nullable: true })
  verificationTokenUser: string;

  @Column({ default: true })
  isLogin: boolean;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  verification: boolean;

  @OneToMany(
    () => MedicationSickness,
    (medicationSickness) => medicationSickness.account,
    {
      cascade: true,
      onDelete: 'SET NULL',
    },
  )
  medicationSicknesses: MedicationSickness[];

  @OneToMany(() => UserAllergy, (userAllergy) => userAllergy.account, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  userAllergies: UserAllergy[];

  @OneToMany(
    () => UserAllergy,
    (userTrackingValue) => userTrackingValue.account,
    {
      cascade: true,
      onDelete: 'SET NULL',
    },
  )
  userTrackingValues: UserTrackingValue[];

  @OneToMany(() => UserSickness, (userSickness) => userSickness.account, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  userSicknesses: UserSickness[];

  @OneToMany(() => RoleAccount, (roleAccount) => roleAccount.account, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  rolesAccount: RoleAccount[];
}
