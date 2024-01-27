import { Module } from '@nestjs/common';
import { UserSicknessController } from './user-sickness.controller';
import { UserSicknessService } from './user-sickness.service';

@Module({
  controllers: [UserSicknessController],
  providers: [UserSicknessService]
})
export class UserSicknessModule {}
