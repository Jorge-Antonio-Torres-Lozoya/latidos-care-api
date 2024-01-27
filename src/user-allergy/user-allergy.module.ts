import { Module } from '@nestjs/common';
import { UserAllergyController } from './user-allergy.controller';
import { UserAllergyService } from './user-allergy.service';
import { UserAllergy } from './user-allergy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AllergyModule } from '../allergy/allergy.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserAllergy]), UserModule, AllergyModule],
  controllers: [UserAllergyController],
  providers: [UserAllergyService],
  exports: [UserAllergyService],
})
export class UserAllergyModule {}
