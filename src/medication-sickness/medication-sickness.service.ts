import { Injectable, NotFoundException } from '@nestjs/common';
import { MedicationSickness } from './medication-sickness.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSicknessService } from '../user-sickness/user-sickness.service';
import { MedicationService } from '../medication/medication.service';
import { CreateMedicationSicknessDto } from './dtos/create-medication-sickness.dto';
import { AccountService } from '../account/account.service';

@Injectable()
export class MedicationSicknessService {
  constructor(
    @InjectRepository(MedicationSickness)
    private repo: Repository<MedicationSickness>,
    private accountService: AccountService,
    private userSicknessService: UserSicknessService,
    private medicationService: MedicationService,
  ) {}

  async getById(medicationSicknessId: number): Promise<MedicationSickness> {
    const medicationSickness = await this.repo.findOne({
      where: { medicationSicknessId },
      relations: {
        account: true,
        userSickness: { sickness: true },
        medication: true,
      },
    });
    if (!medicationSickness) {
      throw new NotFoundException('La medicina no fue encontrada');
    }
    return medicationSickness;
  }

  async getAllByAccount(accountId: number): Promise<MedicationSickness[]> {
    return await this.repo.find({
      where: { account: { accountId } },
      relations: {
        account: true,
        userSickness: { sickness: true },
        medication: true,
      },
    });
  }

  async create(
    createDto: CreateMedicationSicknessDto,
  ): Promise<MedicationSickness> {
    const account = await this.accountService.getById(createDto.accountId);
    const userSickness = await this.userSicknessService.getById(
      createDto.userSicknessId,
    );
    const medication = await this.medicationService.getById(
      createDto.medicationId,
    );

    const medicationSickness = this.repo.create({
      account,
      medication,
      userSickness,
      timeConsumption: createDto.timeConsumption,
    });

    await this.repo.save(medicationSickness);

    return await this.getById(medicationSickness.medicationSicknessId);
  }

  async edit(
    medicationSicknessId: number,
    attrs: Partial<MedicationSickness>,
  ): Promise<MedicationSickness> {
    const medicationSickness = await this.getById(medicationSicknessId);

    Object.assign(medicationSickness, attrs);
    return await this.repo.save(medicationSickness);
  }

  async delete(medicationSicknessId: number): Promise<MedicationSickness> {
    const medicationSickness = await this.getById(medicationSicknessId);
    await this.repo.remove(medicationSickness);
    medicationSickness.medicationSicknessId = medicationSicknessId;
    return medicationSickness;
  }
}
