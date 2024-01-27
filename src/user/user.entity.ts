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
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

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

  @Column({ nullable: true })
  verificationTokenExpiration: Date;

  @Column({
    type: 'uuid',
    unique: true,
    name: 'reset_password_token',
    nullable: true,
  })
  resetPasswordToken: string;

  @Column({ nullable: true })
  verification: boolean;

  @OneToMany(
    () => MedicationSickness,
    (medicationSickness) => medicationSickness.user,
    {
      cascade: true,
      onDelete: 'SET NULL',
    },
  )
  medicationSicknesses: MedicationSickness[];

  @OneToMany(() => UserAllergy, (userAllergy) => userAllergy.user, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  userAllergies: UserAllergy[];

  @OneToMany(() => UserAllergy, (userTrackingValue) => userTrackingValue.user, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  userTrackingValues: UserTrackingValue[];

  @OneToMany(() => UserSickness, (userSickness) => userSickness.user, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  userSicknesses: UserSickness[];
}
