import { Injectable, NotFoundException } from '@nestjs/common';
import { MedicationSickness } from './medication-sickness.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { UserSicknessService } from '../user-sickness/user-sickness.service';
import { MedicationService } from '../medication/medication.service';
import { CreateMedicationSicknessDto } from './dtos/create-medication-sickness.dto';

@Injectable()
export class MedicationSicknessService {
  constructor(
    @InjectRepository(MedicationSickness)
    private repo: Repository<MedicationSickness>,
    private userService: UserService,
    private userSicknessService: UserSicknessService,
    private medicationService: MedicationService,
  ) {}

  async getById(medicationSicknessId: number): Promise<MedicationSickness> {
    const medicationSickness = await this.repo.findOne({
      where: { medicationSicknessId },
      relations: {
        user: true,
        userSickness: { sickness: true },
        medication: true,
      },
    });
    if (!medicationSickness) {
      throw new NotFoundException('La medicina no fue encontrada');
    }
    return medicationSickness;
  }

  async getAllByUser(userId: number): Promise<MedicationSickness[]> {
    return await this.repo.find({
      where: { user: { userId } },
      relations: {
        user: true,
        userSickness: { sickness: true },
        medication: true,
      },
    });
  }

  async create(
    createDto: CreateMedicationSicknessDto,
  ): Promise<MedicationSickness> {
    const user = await this.userService.getOne(createDto.userId);
    const userSickness = await this.userSicknessService.getById(
      createDto.userSicknessId,
    );
    const medication = await this.medicationService.getById(
      createDto.medicationId,
    );

    const medicationSickness = this.repo.create({
      user,
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
    return this.repo.save(medicationSickness);
  }

  async delete(medicationSicknessId: number): Promise<MedicationSickness> {
    const medicationSickness = await this.getById(medicationSicknessId);
    await this.repo.remove(medicationSickness);
    medicationSickness.medicationSicknessId = medicationSicknessId;
    return medicationSickness;
  }
}
