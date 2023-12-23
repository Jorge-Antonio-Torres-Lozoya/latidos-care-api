import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Treatment } from './treatment.entity';
import { Repository } from 'typeorm';
import { Medication } from '../medication/medication.entity';
import { CreateTreatmentDto } from './dtos/create-treatment.dto';

@Injectable()
export class TreatmentService {
  constructor(
    @InjectRepository(Treatment) private repo: Repository<Treatment>,
    @InjectRepository(Medication)
    private repoMedication: Repository<Medication>,
  ) {}

  async getAll(): Promise<Treatment[]> {
    const treatments = await this.repo.find({
      relations: {
        medication: {
          user: true,
        },
      },
    });

    return treatments;
  }

  async getById(treatmentId: number): Promise<Treatment> {
    const treatment = await this.repo.findOne({
      where: { treatmentId },
      relations: {
        medication: {
          user: true,
        },
      },
    });

    if (!treatment) {
      throw new NotFoundException('El tratamiento no fue encontrado');
    }

    return treatment;
  }

  async getByMedication(medicationId: number): Promise<Treatment[]> {
    const medication = await this.repoMedication.findOne({
      where: { medicationId },
    });

    if (!medication) {
      throw new BadRequestException('La medicina no fue encontrada');
    }

    const treatments = await this.repo.find({
      where: { medication: { medicationId } },
      relations: {
        medication: {
          user: true,
        },
      },
    });

    return treatments;
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
      .andWhere(`treatment.medicationMedicationId = :medicationId`, {
        medicationId,
      })
      .getMany();
  }

  async create(createDto: CreateTreatmentDto): Promise<Treatment> {
    const medication = await this.repoMedication.findOne({
      where: { medicationId: createDto.medicationId },
    });

    if (!medication) {
      throw new BadRequestException('La medicina no fue encontrada');
    }

    const treatment = this.repo.create({
      taken: createDto.taken,
      medication,
    });

    await this.repo.save(treatment);

    const foundTreatment = await this.repo.findOne({
      where: { treatmentId: treatment.treatmentId },
      relations: {
        medication: {
          user: true,
        },
      },
    });

    if (!foundTreatment) {
      throw new NotFoundException('El tratamiento no fue encontrado');
    }

    return foundTreatment;
  }
}
