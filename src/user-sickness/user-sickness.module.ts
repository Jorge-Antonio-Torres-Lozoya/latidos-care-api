import { Module } from '@nestjs/common';
import { UserSicknessController } from './user-sickness.controller';
import { UserSicknessService } from './user-sickness.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SicknessModule } from '../sickness/sickness.module';
import { UserSickness } from './user-sickness.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSickness]),
    UserModule,
    SicknessModule,
  ],
  controllers: [UserSicknessController],
  providers: [UserSicknessService],
  exports: [UserSicknessService],
})
export class UserSicknessModule {}
