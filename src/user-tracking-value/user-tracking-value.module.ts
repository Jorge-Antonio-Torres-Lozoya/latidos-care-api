import { Module } from '@nestjs/common';
import { UserTrackingValueController } from './user-tracking-value.controller';
import { UserTrackingValueService } from './user-tracking-value.service';

@Module({
  controllers: [UserTrackingValueController],
  providers: [UserTrackingValueService]
})
export class UserTrackingValueModule {}
