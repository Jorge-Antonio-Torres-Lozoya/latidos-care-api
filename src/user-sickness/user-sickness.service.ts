import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSickness } from './user-sickness.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SicknessService } from '../sickness/sickness.service';
import { CreateUserSicknessDto } from './dtos/create-user-sickness.dto';
import { AccountService } from '../account/account.service';

@Injectable()
export class UserSicknessService {
  constructor(
    @InjectRepository(UserSickness) private repo: Repository<UserSickness>,
    private accountService: AccountService,
    private sicknessService: SicknessService,
  ) {}

  async getById(userSicknessId: number): Promise<UserSickness> {
    const userSickness = await this.repo.findOne({
      where: { userSicknessId },
      relations: { account: true, sickness: true },
    });
    if (!userSickness) {
      throw new NotFoundException('La enfermedad no fue encontrada');
    }
    return userSickness;
  }

  async getAllByAccount(accountId: number): Promise<UserSickness[]> {
    const userSickness = await this.repo.find({
      where: { account: { accountId } },
      relations: { account: true, sickness: true },
    });
    return userSickness;
  }

  async create(createDto: CreateUserSicknessDto): Promise<UserSickness> {
    const account = await this.accountService.getById(createDto.accountId);
    const sickness = await this.sicknessService.getById(createDto.sicknessId);

    const userSickness = this.repo.create({
      sickness,
      account,
    });

    await this.repo.save(userSickness);

    return await this.getById(userSickness.userSicknessId);
  }

  async delete(userSicknessId: number): Promise<UserSickness> {
    const userSickness = await this.getById(userSicknessId);
    await this.repo.remove(userSickness);
    userSickness.userSicknessId = userSicknessId;
    return userSickness;
  }
}
