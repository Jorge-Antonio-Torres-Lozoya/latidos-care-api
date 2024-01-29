import { Injectable, NotFoundException } from '@nestjs/common';
import { MedicationSickness } from './medication-sickness.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSicknessService } from '../user-sickness/user-sickness.service';
import { MedicationService } from '../medication/medication.service';
import { CreateMedicationSicknessDto } from './dtos/create-medication-sickness.dto';
import { AccountService } from '../account/account.service';
import { generateComplexSlug } from '../shared/helpersFunc';

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

  async getBySlug(slug: string): Promise<MedicationSickness> {
    const medicationSickness = await this.repo.findOne({
      where: { slug },
    });

    if (!medicationSickness) {
      throw new NotFoundException('La medicina no fue encontrada');
    }

    return medicationSickness;
  }

  async getAllBySlug(slug: string): Promise<MedicationSickness[]> {
    return await this.repo.find({
      where: { slug },
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

    let baseSlug = generateComplexSlug(
      medication.medicationName,
      userSickness.sickness.sicknessName,
    );
    let foundMedications = await this.getAllBySlug(baseSlug);
    while (foundMedications.length > 0) {
      const randomDigit = Math.floor(Math.random() * 100);
      baseSlug = `${baseSlug}${randomDigit}`;
      foundMedications = await this.getAllBySlug(baseSlug);
    }

    const medicationSickness = this.repo.create({
      account,
      medication,
      userSickness,
      timeConsumption: createDto.timeConsumption,
      slug: baseSlug,
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
