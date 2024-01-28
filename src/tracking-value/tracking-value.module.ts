import { Module } from '@nestjs/common';
import { TrackingValueController } from './tracking-value.controller';
import { TrackingValueService } from './tracking-value.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingValue } from './tracking-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackingValue])],
  controllers: [TrackingValueController],
  providers: [TrackingValueService],
  exports: [TrackingValueService],
})
export class TrackingValueModule {}
