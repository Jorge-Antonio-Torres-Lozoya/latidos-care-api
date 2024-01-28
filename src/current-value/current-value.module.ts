import { Module } from '@nestjs/common';
import { CurrentValueController } from './current-value.controller';
import { CurrentValueService } from './current-value.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentValue } from './current-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CurrentValue])],
  controllers: [CurrentValueController],
  providers: [CurrentValueService],
  exports: [CurrentValueService],
})
export class CurrentValueModule {}
