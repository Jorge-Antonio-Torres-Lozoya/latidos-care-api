import { Injectable, NotFoundException } from '@nestjs/common';
import { UserAllergy } from './user-allergy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { AllergyService } from '../allergy/allergy.service';
import { CreateUserAllergyDto } from './dtos/create-user-allergy.dto';

@Injectable()
export class UserAllergyService {
  constructor(
    @InjectRepository(UserAllergy) private repo: Repository<UserAllergy>,
    private userService: UserService,
    private allergyService: AllergyService,
  ) {}

  async getById(userAllergyId: number): Promise<UserAllergy> {
    const userAllergy = await this.repo.findOne({
      where: { userAllergyId },
      relations: { user: true, allergy: true },
    });
    if (!userAllergy) {
      throw new NotFoundException('La alergia no fue encontrada');
    }
    return userAllergy;
  }

  async getAllByUser(userId: number): Promise<UserAllergy[]> {
    return await this.repo.find({
      where: { user: { userId } },
      relations: { user: true, allergy: true },
    });
  }

  async create(createDto: CreateUserAllergyDto): Promise<UserAllergy> {
    const user = await this.userService.getOne(createDto.userId);
    const allergy = await this.allergyService.getById(createDto.allergyId);

    const userAllergy = this.repo.create({
      allergy,
      user,
    });

    await this.repo.save(userAllergy);

    return await this.getById(userAllergy.userAllergyId);
  }

  async delete(userAllergyId: number): Promise<UserAllergy> {
    const userAllergy = await this.getById(userAllergyId);
    await this.repo.remove(userAllergy);
    userAllergy.userAllergyId = userAllergyId;
    return userAllergy;
  }
}
