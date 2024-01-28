import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medication } from './medication.entity';
import { Repository } from 'typeorm';
import { CreateMedicationDto } from './dtos/create-medication.dto';
import { generateSlug } from '../shared/helpersFunc';

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

  async getBySlug(slug: string): Promise<Medication> {
    const medication = await this.repo.findOne({
      where: { slug },
    });

    if (!medication) {
      throw new NotFoundException('La medicina no fue encontrada');
    }

    return medication;
  }

  async getAllBySlug(slug: string): Promise<Medication[]> {
    return await this.repo.find({
      where: { slug },
    });
  }

  async create(createDto: CreateMedicationDto): Promise<Medication> {
    let baseSlug = generateSlug(createDto.medicationName);
    let foundMedications = await this.getAllBySlug(baseSlug);
    while (foundMedications.length > 0) {
      const randomDigit = Math.floor(Math.random() * 100);
      baseSlug = `${baseSlug}${randomDigit}`;
      foundMedications = await this.getAllBySlug(baseSlug);
    }
    const medication = this.repo.create({
      medicationName: createDto.medicationName,
      slug: baseSlug,
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
