import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sickness } from './sickness.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CreateSicknessDto } from './dtos/create-sickness.dto';
import { CreateSicknessesDto } from './dtos/create-sicknesses.dto';

@Injectable()
export class SicknessService {
  constructor(
    @InjectRepository(Sickness) private repo: Repository<Sickness>,
    @InjectRepository(User) private repoUser: Repository<User>,
  ) {}

  async getAll(): Promise<Sickness[]> {
    const sickness = await this.repo.find({
      relations: {
        medications: true,
      },
    });
    return sickness;
  }

  async getAllByUser(userId: number): Promise<Sickness[]> {
    const sickness = await this.repo.find({
      relations: {
        medications: true,
      },
      where: { user: { userId } },
    });
    return sickness;
  }

  async getById(sicknessId: number): Promise<Sickness> {
    const sickness = await this.repo.findOne({
      where: { sicknessId },
      relations: {
        medications: true,
      },
    });

    if (!sickness) {
      throw new NotFoundException('La enfermedad no fue encontrada');
    }

    return sickness;
  }

  async create(createDto: CreateSicknessDto): Promise<Sickness> {
    const user = await this.repoUser.findOne({
      where: { userId: createDto.userId },
    });

    if (!user) {
      throw new BadRequestException('El usuario no fue encontrado.');
    }

    const sickness = this.repo.create({
      sicknessName: createDto.sicknessName,
      user,
    });

    await this.repo.save(sickness);

    const foundSickness = await this.repo.findOne({
      where: { sicknessId: sickness.sicknessId },
      relations: {
        medications: true,
      },
    });

    if (!foundSickness) {
      throw new NotFoundException('La enfermedad no fue encontrada');
    }

    return foundSickness;
  }

  async createMany(createDto: CreateSicknessesDto): Promise<Sickness[]> {
    const user = await this.repoUser.findOne({
      where: { userId: createDto.userId },
    });

    if (!user) {
      throw new BadRequestException('El usuario no fue encontrado.');
    }

    const sicknesses: Sickness[] = [];

    for (let i = 0; i <= createDto.sicknessName.length; i++) {
      const sickness = this.repo.create({
        sicknessName: createDto.sicknessName[i],
        user,
      });
      await this.repo.save(sickness);
      sicknesses.push(sickness);
    }

    user.registerData = true;
    await this.repoUser.save(user);

    return sicknesses;
  }

  async edit(sicknessId: number, attrs: Partial<Sickness>): Promise<Sickness> {
    const sickness = await this.repo.findOne({
      where: { sicknessId },
      relations: {
        medications: true,
      },
    });

    if (!sickness) {
      throw new NotFoundException('La enfermedad no fue encontrada');
    }

    Object.assign(sickness, attrs);
    return this.repo.save(sickness);
  }

  async delete(sicknessId: number): Promise<Sickness> {
    const sickness = await this.repo.findOne({
      where: { sicknessId },
    });

    if (!sickness) {
      throw new NotFoundException('La enfermedad no fue encontrada');
    }

    return this.repo.remove(sickness);
  }
}
