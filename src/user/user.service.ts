import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getByEmail(email: string): Promise<User[]> {
    const user = await this.repo.find({ where: { email } });

    if (!user) {
      return null;
    }

    return user;
  }

  getAll(): Promise<User[]> {
    return this.repo.find();
  }

  async getOne(userId: number): Promise<User> {
    const findUser = await this.repo.findOne({ where: { userId } });

    if (!findUser) {
      return null;
    }

    return findUser;
  }

  async getVerificationToken(userId: number): Promise<string> {
    const findUser = await this.repo.findOne({ where: { userId } });

    if (!findUser) {
      return null;
    }

    return findUser.verificationTokenUser;
  }

  createUser(
    firstName: string,
    lastName: string,
    phoneNumber: number,
    email: string,
    password: string,
    verificationCode: number,
  ): Promise<User> {
    const createdUser = this.repo.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      verificationCode,
    });
    return this.repo.save(createdUser);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    return result;
  }

  async signupUser(
    firstName: string,
    lastName: string,
    phoneNumber: number,
    email: string,
    password: string,
    verificationCode: number,
  ): Promise<User> {
    const users = await this.getByEmail(email);

    if (users.length) {
      throw new BadRequestException(
        'Error, el correo le pertenece a otro usuario.',
      );
    }

    const hash = await this.hashPassword(password);
    const user = await this.createUser(
      firstName,
      lastName,
      phoneNumber,
      email,
      hash,
      verificationCode,
    );
    return user;
  }

  async loginUser(email: string, password: string): Promise<User> {
    const [user] = await this.getByEmail(email);

    if (!user) {
      throw new NotFoundException('Error, la cuenta no existe.');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('El email o la contraseña es incorrecta.');
    }

    return user;
  }

  async jwtValidationUser(user: any) {
    const payload = { sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      userId: user.userId,
      registerData: user.registerData,
    };
  }

  async updateUser(userId: number, attrs: Partial<User>): Promise<User> {
    const updatedUser = await this.repo.findOne({ where: { userId } });
    if (!updatedUser) {
      throw new NotFoundException('La cuenta no existe.');
    }

    Object.assign(updatedUser, attrs);
    return this.repo.save(updatedUser);
  }

  async generateVerificationToken(
    userId: number,
    token: string,
  ): Promise<string> {
    const updatedUser = await this.repo.findOne({ where: { userId } });
    if (!updatedUser) {
      throw new NotFoundException('La cuenta no existe.');
    }
    updatedUser.verificationTokenUser = token;
    await this.repo.save(updatedUser);
    return token;
  }

  async validateToken(userId: number, token: string): Promise<boolean> {
    const updatedUser = await this.repo.findOne({ where: { userId } });
    if (!updatedUser) {
      throw new NotFoundException('La cuenta no existe.');
    }
    if (updatedUser.verificationTokenUser === token) {
      return true;
    } else {
      return false;
    }
  }

  async validateRecoverToken(userId: number, token: string): Promise<boolean> {
    const updatedUser = await this.repo.findOne({ where: { userId } });
    if (!updatedUser) {
      throw new NotFoundException('La cuenta no existe.');
    }
    console.log(token);
    console.log(updatedUser.resetPasswordToken);
    if (updatedUser.resetPasswordToken === token) {
      return true;
    } else {
      return false;
    }
  }

  async updatePassword(userId: number, password: string, newPassword: string) {
    const user = await this.getOne(userId);

    if (!user) {
      throw new NotFoundException('La cuenta no existe.');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('La contraseña es incorrecta.');
    }

    const newHash = await this.hashPassword(newPassword);

    return this.repo
      .createQueryBuilder()
      .update('user')
      .set({ password: `${newHash}` })
      .where('userId = :userId', { userId })
      .execute();
  }

  async updateRegisterData(userId: number): Promise<User> {
    const user = await this.repo.findOne({ where: { userId } });
    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }

    user.registerData = true;
    await this.repo.save(user);

    return user;
  }

  async forgotPassword(
    email: string,
    resetPasswordToken: string,
    verificationTokenExpiration: Date,
  ): Promise<User> {
    const [user] = await this.getByEmail(email);
    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }

    user.resetPasswordToken = resetPasswordToken;
    user.verificationTokenExpiration = verificationTokenExpiration;
    return this.repo.save(user);
  }

  async recoverPassword(userId: number, newPassword: string): Promise<User> {
    const user = await this.getOne(userId);
    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }
    const newHash = await this.hashPassword(newPassword);
    user.password = newHash;
    await this.repo.save(user);

    const foundUser = await this.getOne(userId);
    return foundUser;
  }

  async verificationUser(verificationCode: number): Promise<User> {
    const user = await this.repo.findOne({
      where: { verificationCode },
    });
    if (!user) {
      throw new BadRequestException(
        'El código que usted ingresó no es el correcto',
      );
    }
    user.verification = true;
    return this.repo.save(user);
  }

  async delete(userId: number) {
    const deletedUser = await this.repo.findOne({ where: { userId } });
    return this.repo.remove(deletedUser);
  }
}
