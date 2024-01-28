import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleAccount } from './role-account.entity';
import { Repository } from 'typeorm';
import { Account } from '../account/account.entity';
import { Role } from '../role/role.entity';

@Injectable()
export class RoleAccountService {
  constructor(
    @InjectRepository(RoleAccount) private repo: Repository<RoleAccount>,
  ) {}

  async create(account: Account, role: Role): Promise<RoleAccount> {
    const roleAccount = this.repo.create({
      account,
      role,
    });

    await this.repo.save(roleAccount);
    return roleAccount;
  }

  async delete(accountId: number, roleName: string): Promise<RoleAccount> {
    const roleAccount = await this.repo.findOne({
      where: { account: { accountId }, role: { roleName } },
    });
    return this.repo.remove(roleAccount);
  }
}
