import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Allergy } from './allergy.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CreateAllergyDto } from './dtos/create-allergy.dto';
import { CreateAllergiesDto } from './dtos/create-allergies.dto';

@Injectable()
export class AllergyService {
  constructor(
    @InjectRepository(Allergy) private repo: Repository<Allergy>,
    @InjectRepository(User) private repoUser: Repository<User>,
  ) {}

  async getAll(): Promise<Allergy[]> {
    const allergy = await this.repo.find();
    return allergy;
  }

  async getAllByUser(userId: number): Promise<Allergy[]> {
    const allergy = await this.repo.find({
      where: { user: { userId } },
    });
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
    const user = await this.repoUser.findOne({
      where: { userId: createDto.userId },
    });

    if (!user) {
      throw new BadRequestException('El usuario no fue encontrado.');
    }

    const allergy = this.repo.create({
      allergyName: createDto.allergyName,
      user,
    });

    await this.repo.save(allergy);

    const foundAllergy = await this.repo.findOne({
      where: { allergyId: allergy.allergyId },
    });

    if (!foundAllergy) {
      throw new NotFoundException('La alergia no fue encontrada');
    }

    return foundAllergy;
  }

  async createMany(createDto: CreateAllergiesDto): Promise<Allergy[]> {
    const user = await this.repoUser.findOne({
      where: { userId: createDto.userId },
    });

    if (!user) {
      throw new BadRequestException('El usuario no fue encontrado.');
    }

    const allergies: Allergy[] = [];

    for (let i = 0; i <= createDto.allergyName.length; i++) {
      const allergy = this.repo.create({
        allergyName: createDto.allergyName[i],
        user,
      });

      await this.repo.save(allergy);
      allergies.push(allergy);
    }

    user.registerData = true;
    await this.repoUser.save(user);

    return allergies;
  }

  async edit(allergyId: number, attrs: Partial<Allergy>): Promise<Allergy> {
    const allergy = await this.repo.findOne({
      where: { allergyId },
    });

    if (!allergy) {
      throw new NotFoundException('La alergia no fue encontrada');
    }

    Object.assign(allergy, attrs);
    return this.repo.save(allergy);
  }

  async delete(allergyId: number): Promise<Allergy> {
    const allergy = await this.repo.findOne({
      where: { allergyId },
    });

    if (!allergy) {
      throw new NotFoundException('La alergia no fue encontrada');
    }

    return this.repo.remove(allergy);
  }
}
