import { Module } from '@nestjs/common';
import { SicknessController } from './sickness.controller';
import { SicknessService } from './sickness.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sickness } from './sickness.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sickness])],
  controllers: [SicknessController],
  providers: [SicknessService],
  exports: [SicknessService],
})
export class SicknessModule {}
