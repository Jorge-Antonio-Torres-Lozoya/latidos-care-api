import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sickness } from './sickness.entity';
import { Repository } from 'typeorm';
import { CreateSicknessDto } from './dtos/create-sickness.dto';

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

  async create(createDto: CreateSicknessDto): Promise<Sickness> {
    const sickness = this.repo.create({
      sicknessName: createDto.sicknessName,
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
