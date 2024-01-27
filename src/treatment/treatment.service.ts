import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Treatment } from './treatment.entity';
import { Between, Repository } from 'typeorm';
import { CreateTreatmentDto } from './dtos/create-treatment.dto';
import { MedicationSicknessService } from '../medication-sickness/medication-sickness.service';

@Injectable()
export class TreatmentService {
  constructor(
    @InjectRepository(Treatment) private repo: Repository<Treatment>,
    private medicationSicknessService: MedicationSicknessService,
  ) {}

  async getAll(): Promise<Treatment[]> {
    return await this.repo.find({
      relations: {
        medicationSickness: {
          medication: true,
          user: true,
          userSickness: { sickness: true },
        },
      },
    });
  }

  async getById(treatmentId: number): Promise<Treatment> {
    const treatment = await this.repo.findOne({
      where: { treatmentId },
      relations: {
        medicationSickness: {
          medication: true,
          user: true,
          userSickness: { sickness: true },
        },
      },
    });

    if (!treatment) {
      throw new NotFoundException('El tratamiento no fue encontrado');
    }

    return treatment;
  }

  async getByMedication(medicationId: number): Promise<Treatment[]> {
    return await this.repo.find({
      where: { medicationSickness: { medication: { medicationId } } },
      relations: {
        medicationSickness: {
          medication: true,
          user: true,
          userSickness: { sickness: true },
        },
      },
    });
  }

  async getTreatmentsBetweenDates(
    medicationId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<Treatment[]> {
    if (!medicationId) {
      throw new BadRequestException(
        'No selecionó una medicina, debe selecionar una medicina.',
      );
    }
    return await this.repo
      .createQueryBuilder('treatment')
      .where('treatment.createdAt >= :startDate', { startDate })
      .andWhere('treatment.createdAt <= :endDate', { endDate })
      .andWhere(
        `treatment.medicationSickness.medication.medicationId = :medicationId`,
        {
          medicationId,
        },
      )
      .getMany();
  }

  async newGetTreatmentsBetweenDates(
    medicationId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<Treatment[]> {
    if (!medicationId) {
      throw new BadRequestException(
        'No selecionó una medicina, debe selecionar una medicina.',
      );
    }
    return this.repo.find({
      where: {
        medicationSickness: { medication: { medicationId } },
        createdAt: Between(startDate, endDate),
      },
      relations: {
        medicationSickness: {
          medication: true,
          user: true,
          userSickness: { sickness: true },
        },
      },
    });
  }

  async create(createDto: CreateTreatmentDto): Promise<Treatment> {
    const medicationSickness = await this.medicationSicknessService.getById(
      createDto.medicationSicknessId,
    );
    const treatment = this.repo.create({
      taken: createDto.taken,
      medicationSickness,
    });

    await this.repo.save(treatment);

    return await this.getById(treatment.treatmentId);
  }
}
