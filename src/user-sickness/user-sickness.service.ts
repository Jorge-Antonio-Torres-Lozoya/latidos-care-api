import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSickness } from './user-sickness.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SicknessService } from '../sickness/sickness.service';
import { CreateUserSicknessDto } from './dtos/create-user-sickness.dto';
import { AccountService } from '../account/account.service';
import { generateComplexSlug } from '../shared/helpersFunc';

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
      relations: {
        account: true,
        sickness: true,
        medicationSicknesses: { medication: true },
      },
    });
    if (!userSickness) {
      throw new NotFoundException('La enfermedad no fue encontrada');
    }
    return userSickness;
  }

  async getAllByAccount(accountId: number): Promise<UserSickness[]> {
    const userSickness = await this.repo.find({
      where: { account: { accountId } },
      relations: {
        account: true,
        sickness: true,
        medicationSicknesses: { medication: true },
      },
    });
    return userSickness;
  }

  async getBySlug(slug: string): Promise<UserSickness> {
    const medication = await this.repo.findOne({
      where: { slug },
    });

    if (!medication) {
      throw new NotFoundException('La medicina no fue encontrada');
    }

    return medication;
  }

  async getAllBySlug(slug: string): Promise<UserSickness[]> {
    return await this.repo.find({
      where: { slug },
    });
  }

  async create(createDto: CreateUserSicknessDto): Promise<UserSickness> {
    const account = await this.accountService.getById(createDto.accountId);
    const sickness = await this.sicknessService.getById(createDto.sicknessId);
    let baseSlug = generateComplexSlug(
      sickness.sicknessName,
      account.firstName,
    );
    let foundMedications = await this.getAllBySlug(baseSlug);
    while (foundMedications.length > 0) {
      const randomDigit = Math.floor(Math.random() * 100);
      baseSlug = `${baseSlug}${randomDigit}`;
      foundMedications = await this.getAllBySlug(baseSlug);
    }

    const userSickness = this.repo.create({
      sickness,
      account,
      slug: baseSlug,
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
