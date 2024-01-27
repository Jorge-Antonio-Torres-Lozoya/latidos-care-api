import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Allergy } from './allergy.entity';
import { Repository } from 'typeorm';
import { CreateAllergyDto } from './dtos/create-allergy.dto';

@Injectable()
export class AllergyService {
  constructor(@InjectRepository(Allergy) private repo: Repository<Allergy>) {}

  async getAll(): Promise<Allergy[]> {
    const allergy = await this.repo.find();
    return allergy;
  }

  async getById(allergyId: number): Promise<Allergy> {
    const allergy = await this.repo.findOne({
      where: { allergyId },
    });

    if (!allergy) {
      throw new NotFoundException('La alergia no fue encontrada');
    }

    return allergy;
  }

  async create(createDto: CreateAllergyDto): Promise<Allergy> {
    const allergy = this.repo.create({
      allergyName: createDto.allergyName,
    });

    return await this.repo.save(allergy);
  }

  async edit(allergyId: number, attrs: Partial<Allergy>): Promise<Allergy> {
    const allergy = await this.getById(allergyId);

    Object.assign(allergy, attrs);
    return this.repo.save(allergy);
  }

  async delete(allergyId: number): Promise<Allergy> {
    const allergy = await this.getById(allergyId);
    await this.repo.remove(allergy);
    allergy.allergyId = allergyId;
    return allergy;
  }
}
