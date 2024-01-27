import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { Admin } from './admin.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private repo: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async getByEmail(email: string) {
    const admin = await this.repo.find({ where: { email } });

    if (!admin) {
      return null;
    }

    return admin;
  }

  getAll() {
    return this.repo.find();
  }

  async getOne(adminId: number) {
    const findAdmin = await this.repo.findOne({ where: { adminId } });

    if (!findAdmin) {
      return null;
    }

    return findAdmin;
  }

  async createAdmin(firstName: string, email: string, password: string) {
    const createdAdmin = this.repo.create({
      firstName,
      email,
      password,
    });
    return await this.repo.save(createdAdmin);
  }

  async hashPassword(password: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    return result;
  }

  async signupAdmin(firstName: string, email: string, password: string) {
    const admins = await this.getByEmail(email);

    if (admins.length) {
      throw new BadRequestException('Error, the email belongs to another user');
    }

    const hash = await this.hashPassword(password);
    const admin = await this.createAdmin(firstName, email, hash);
    return admin;
  }

  async loginAdmin(email: string, password: string) {
    const [admin] = await this.getByEmail(email);

    if (!admin) {
      throw new NotFoundException('Error, the account does not exists');
    }

    const [salt, storedHash] = admin.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('The email or password is incorrect');
    }

    return admin;
  }

  async jwtValidationAdmin(admin: any) {
    const payload = { sub: admin.adminId };
    return {
      access_token: this.jwtService.sign(payload),
      adminId: admin.adminId,
    };
  }

  async updateAdmin(adminId: number, attrs: Partial<Admin>) {
    const updatedAdmin = await this.repo.findOne({ where: { adminId } });
    Object.assign(updatedAdmin, attrs);
    return await this.repo.save(updatedAdmin);
  }

  async updatePassword(adminId: number, password: string, newPassword: string) {
    const admin = await this.getOne(adminId);

    if (!admin) {
      throw new NotFoundException('The account does not exists');
    }
    const [salt, storedHash] = admin.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('The password is incorrect');
    }

    const newHash = await this.hashPassword(newPassword);

    return this.repo
      .createQueryBuilder()
      .update('admin')
      .set({ password: `${newHash}` })
      .where('adminId = :adminId', { adminId })
      .execute();
  }

  async delete(adminId: number) {
    const deletedAdmin = await this.repo.findOne({ where: { adminId } });
    return await this.repo.remove(deletedAdmin);
  }
}
