import { Module } from '@nestjs/common';
import { AllergyController } from './allergy.controller';
import { AllergyService } from './allergy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allergy } from './allergy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Allergy])],
  controllers: [AllergyController],
  providers: [AllergyService],
  exports: [AllergyService],
})
export class AllergyModule {}
