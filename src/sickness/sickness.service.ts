import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sickness } from './sickness.entity';
import { Repository } from 'typeorm';
import { CreateSicknessDto } from './dtos/create-sickness.dto';
import { generateSlug } from '../shared/helpersFunc';

@Injectable()
export class SicknessService {
  constructor(@InjectRepository(Sickness) private repo: Repository<Sickness>) {}

  async getAll(): Promise<Sickness[]> {
    const sickness = await this.repo.find();
    return sickness;
  }

  async getById(sicknessId: number): Promise<Sickness> {
    const sickness = await this.repo.findOne({
      where: { sicknessId },
    });

    if (!sickness) {
      throw new NotFoundException('La enfermedad no fue encontrada');
    }

    return sickness;
  }

  async getBySlug(slug: string): Promise<Sickness> {
    const medication = await this.repo.findOne({
      where: { slug },
    });

    if (!medication) {
      throw new NotFoundException('La medicina no fue encontrada');
    }

    return medication;
  }

  async getAllBySlug(slug: string): Promise<Sickness[]> {
    return await this.repo.find({
      where: { slug },
    });
  }

  async create(createDto: CreateSicknessDto): Promise<Sickness> {
    let baseSlug = generateSlug(createDto.sicknessName);
    let foundMedications = await this.getAllBySlug(baseSlug);
    while (foundMedications.length > 0) {
      const randomDigit = Math.floor(Math.random() * 100);
      baseSlug = `${baseSlug}${randomDigit}`;
      foundMedications = await this.getAllBySlug(baseSlug);
    }
    const sickness = this.repo.create({
      sicknessName: createDto.sicknessName,
      slug: baseSlug,
    });

    return await this.repo.save(sickness);
  }

  async edit(sicknessId: number, attrs: Partial<Sickness>): Promise<Sickness> {
    const sickness = await this.getById(sicknessId);

    Object.assign(sickness, attrs);
    return await this.repo.save(sickness);
  }

  async delete(sicknessId: number): Promise<Sickness> {
    const sickness = await this.getById(sicknessId);

    await this.repo.remove(sickness);
    sickness.sicknessId = sicknessId;
    return sickness;
  }
}
