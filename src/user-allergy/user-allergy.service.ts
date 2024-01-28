import { Injectable, NotFoundException } from '@nestjs/common';
import { UserAllergy } from './user-allergy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllergyService } from '../allergy/allergy.service';
import { CreateUserAllergyDto } from './dtos/create-user-allergy.dto';
import { AccountService } from '../account/account.service';

@Injectable()
export class UserAllergyService {
  constructor(
    @InjectRepository(UserAllergy) private repo: Repository<UserAllergy>,
    private accountService: AccountService,
    private allergyService: AllergyService,
  ) {}

  async getById(userAllergyId: number): Promise<UserAllergy> {
    const userAllergy = await this.repo.findOne({
      where: { userAllergyId },
      relations: { account: true, allergy: true },
    });
    if (!userAllergy) {
      throw new NotFoundException('La alergia no fue encontrada');
    }
    return userAllergy;
  }

  async getAllByAccount(accountId: number): Promise<UserAllergy[]> {
    return await this.repo.find({
      where: { account: { accountId } },
      relations: { account: true, allergy: true },
    });
  }

  async create(createDto: CreateUserAllergyDto): Promise<UserAllergy> {
    const account = await this.accountService.getById(createDto.accountId);
    const allergy = await this.allergyService.getById(createDto.allergyId);

    const userAllergy = this.repo.create({
      allergy,
      account,
    });

    await this.repo.save(userAllergy);

    return await this.getById(userAllergy.userAllergyId);
  }

  async delete(userAllergyId: number): Promise<UserAllergy> {
    const userAllergy = await this.getById(userAllergyId);
    await this.repo.remove(userAllergy);
    userAllergy.userAllergyId = userAllergyId;
    return userAllergy;
  }
}
