import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medication } from './medication.entity';
import { Repository } from 'typeorm';
import { CreateMedicationDto } from './dtos/create-medication.dto';

@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(Medication) private repo: Repository<Medication>,
  ) {}

  async getAll(): Promise<Medication[]> {
    return await this.repo.find();
  }

  async getById(medicationId: number): Promise<Medication> {
    const medication = await this.repo.findOne({
      where: { medicationId },
    });

    if (!medication) {
      throw new NotFoundException('La medicina no fue encontrada');
    }

    return medication;
  }

  async create(createDto: CreateMedicationDto): Promise<Medication> {
    const medication = this.repo.create({
      medicationName: createDto.medicationName,
    });

    return await this.repo.save(medication);
  }

  async edit(
    medicationId: number,
    attrs: Partial<Medication>,
  ): Promise<Medication> {
    const medication = await this.getById(medicationId);

    Object.assign(medication, attrs);
    return await this.repo.save(medication);
  }

  async delete(medicationId: number): Promise<Medication> {
    const medication = await this.getById(medicationId);

    await this.repo.remove(medication);
    medication.medicationId = medicationId;
    return medication;
  }
}
