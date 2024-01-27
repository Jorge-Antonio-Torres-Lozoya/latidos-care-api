import { Module } from '@nestjs/common';
import { UserAllergyController } from './user-allergy.controller';
import { UserAllergyService } from './user-allergy.service';
import { UserAllergy } from './user-allergy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserAllergy])],
  controllers: [UserAllergyController],
  providers: [UserAllergyService],
  exports: [UserAllergyService],
})
export class UserAllergyModule {}
