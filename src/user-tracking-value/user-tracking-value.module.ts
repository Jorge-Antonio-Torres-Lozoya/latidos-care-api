import { Module } from '@nestjs/common';
import { UserTrackingValueController } from './user-tracking-value.controller';
import { UserTrackingValueService } from './user-tracking-value.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTrackingValue } from './user-tracking-value.entity';
import { UserModule } from '../user/user.module';
import { TrackingValueModule } from '../tracking-value/tracking-value.module';
import { CurrentValueModule } from '../current-value/current-value.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTrackingValue]),
    UserModule,
    TrackingValueModule,
    CurrentValueModule,
  ],
  controllers: [UserTrackingValueController],
  providers: [UserTrackingValueService],
  exports: [UserTrackingValueService],
})
export class UserTrackingValueModule {}
