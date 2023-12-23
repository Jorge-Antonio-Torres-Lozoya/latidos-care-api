import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medication } from './medication.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Treatment } from '../treatment/treatment.entity';
import { CreateMedicationDto } from './dtos/create-medication.dto';
import { Sickness } from '../sickness/sickness.entity';

@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(Medication) private repo: Repository<Medication>,
    @InjectRepository(User) private repoUser: Repository<User>,
    @InjectRepository(Treatment) private repoTreatment: Repository<Treatment>,
    @InjectRepository(Sickness)
    private repoSickness: Repository<Sickness>,
  ) {}

  async getAll(): Promise<Medication[]> {
    const medications = await this.repo.find({
      relations: {
        treatments: true,
      },
    });
    return medications;
  }

  async getById(medicationId: number): Promise<Medication> {
    const medication = await this.repo.findOne({
      where: { medicationId },
      relations: {
        treatments: true,
      },
    });

    if (!medication) {
      throw new NotFoundException('La medicina no fue encontrada');
    }

    return medication;
  }

  async create(createDto: CreateMedicationDto): Promise<Medication> {
    const user = await this.repoUser.findOne({
      where: { userId: createDto.userId },
    });

    if (!user) {
      throw new BadRequestException('El usuario no fue encontrado.');
    }

    const sickness = await this.repoSickness.findOne({
      where: { sicknessId: createDto.sicknessId },
    });

    if (!sickness) {
      throw new BadRequestException('La enfermedad no fue encontrada');
    }

    const medication = this.repo.create({
      medicationName: createDto.medicationName,
      timeConsumption: createDto.timeConsumption,
      user,
      sickness,
    });

    await this.repo.save(medication);

    const foundMedication = await this.repo.findOne({
      where: { medicationId: medication.medicationId },
      relations: {
        treatments: true,
        sickness: true,
      },
    });

    if (!foundMedication) {
      throw new NotFoundException('La medicina no fue encontrada');
    }

    return foundMedication;
  }

  async edit(
    medicationId: number,
    attrs: Partial<Medication>,
  ): Promise<Medication> {
    const medication = await this.repo.findOne({
      where: { medicationId },
      relations: {
        treatments: true,
      },
    });

    if (!medication) {
      throw new NotFoundException('La medicina no fue encontrada');
    }

    Object.assign(medication, attrs);
    return this.repo.save(medication);
  }

  async delete(medicationId: number): Promise<Medication> {
    const medication = await this.repo.findOne({
      where: { medicationId },
      relations: {
        treatments: true,
      },
    });

    if (!medication) {
      throw new NotFoundException('La medicina no fue encontrada');
    }

    return this.repo.remove(medication);
  }
}
