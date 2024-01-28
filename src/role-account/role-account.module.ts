import { Module } from '@nestjs/common';
import { RoleAccountController } from './role-account.controller';
import { RoleAccountService } from './role-account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleAccount } from './role-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleAccount])],
  controllers: [RoleAccountController],
  providers: [RoleAccountService],
  exports: [RoleAccountService],
})
export class RoleAccountModule {}
