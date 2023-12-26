import { Medication } from '../medication/medication.entity';
import { CurrentValue } from '../current-value/current-value.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrackingValue } from '../tracking-value/tracking-value.entity';
import { Sickness } from '../sickness/sickness.entity';
import { Allergy } from '../allergy/allergy.entity';

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

  @OneToMany(() => TrackingValue, (trackingValue) => trackingValue.user, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  trackingValues: TrackingValue[];

  @OneToMany(() => Sickness, (sicknesses) => sicknesses.user, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  sicknesses: Sickness[];

  @OneToMany(() => Allergy, (allergies) => allergies.user, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  allergies: Allergy[];

  @OneToMany(() => Medication, (medication) => medication.user, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  medications: Medication[];

  @OneToMany(() => CurrentValue, (currentValue) => currentValue.user, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  currentValues: CurrentValue[];
}
