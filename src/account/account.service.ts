import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { Account } from './account.entity';
import { SignUpAccountDto } from './dtos/signup-account.dto';
import { RoleService } from '../role/role.service';
import { RoleAccountService } from '../role-account/role-account.service';
import { generateSlug } from '../shared/helpersFunc';
const scrypt = promisify(_scrypt);

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private repo: Repository<Account>,
    private jwtService: JwtService,
    private roleService: RoleService,
    private roleAccountService: RoleAccountService,
  ) {}
  async getByEmail(email: string) {
    const account = await this.repo.find({
      where: { email },
      relations: { rolesAccount: { role: true } },
    });

    if (!account) {
      return null;
    }

    return account;
  }

  async getAll(): Promise<Account[]> {
    const allAccount = await this.repo.find({
      relations: { rolesAccount: { role: true } },
    });
    return allAccount;
  }

  async getAllByRole(roleName: string): Promise<Account[]> {
    const allAccount = await this.repo.find({
      where: { rolesAccount: { role: { roleName } } },
      relations: { rolesAccount: { role: true } },
    });
    return allAccount;
  }

  async getById(accountId: number): Promise<Account> {
    const account = await this.repo.findOne({
      where: { accountId },
      relations: { rolesAccount: { role: true } },
    });

    if (!account) {
      throw new NotFoundException('La cuenta no fue encontrada');
    }

    return account;
  }

  async getAllBySlug(slug: string): Promise<Account[]> {
    const accounts = await this.repo.find({
      where: { slug },
      relations: { rolesAccount: { role: true } },
    });

    return accounts;
  }

  async getBySlug(slug: string): Promise<Account> {
    const account = await this.repo.findOne({
      where: { slug },
      relations: {
        rolesAccount: { role: true },
      },
    });

    if (!account) {
      throw new NotFoundException('La cuenta no fue encontrada');
    }

    return account;
  }

  async hashPassword(password: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    return result;
  }

  async signupAccount(body: SignUpAccountDto, roleName: string) {
    const accountsByEmail = await this.getByEmail(body.email);

    if (accountsByEmail.length) {
      throw new BadRequestException(
        'Error, el correo electrónico pertenece a otra cuenta',
      );
    }

    if (body.password !== body.confirmPassword) {
      throw new BadRequestException(
        'Error, las contraseñas que ingresó no son las mismas',
      );
    }

    const hash = await this.hashPassword(body.password);
    const account = this.repo.create({
      email: body.email,
      password: hash,
      activeRole: roleName,
      firstName: body.firstName,
      lastName: body.lastName,
      phoneNumber: body.phoneNumber,
    });
    let baseSlug = generateSlug(body.firstName);
    let accounts = await this.getAllBySlug(baseSlug);
    while (accounts.length > 0) {
      const randomDigit = Math.floor(Math.random() * 100);
      baseSlug = `${baseSlug}${randomDigit}`;
      accounts = await this.getAllBySlug(baseSlug);
    }
    account.slug = baseSlug;

    await this.repo.save(account);

    const newAccount = await this.repo.findOne({
      where: { email: body.email },
      relations: { rolesAccount: { role: true } },
    });

    const role = await this.roleService.getByName(roleName);
    await this.roleAccountService.create(newAccount, role);
    const lastAccount = await this.repo.findOne({
      where: { email: body.email },
      relations: { rolesAccount: { role: true } },
    });

    return lastAccount;
  }

  async loginAccount(loginString: string, password: string) {
    const [accountByEmail] = await this.getByEmail(loginString);

    const [salt, storedHash] = accountByEmail.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException(
        'El correo electrónico o la contraseña son incorrectos',
      );
    }

    return accountByEmail;
  }

  async jwtValidationAccount(account: any) {
    const payload = { sub: account.accountId };
    return {
      access_token: this.jwtService.sign(payload),
      accountId: account.accountId,
      activeRole: account.activeRole,
      slug: account.slug,
      mentor: account.mentor,
    };
  }

  async updateAccount(
    accountId: number,
    attrs: Partial<Account>,
  ): Promise<Account> {
    const account = await this.getById(accountId);
    Object.assign(account, attrs);
    return await this.repo.save(account);
  }

  async addRole(accountId: number, roleName: string): Promise<Account> {
    const account = await this.getById(accountId);
    const role = await this.roleService.getByName(roleName);
    await this.roleAccountService.create(account, role);
    const newAccount = await this.getById(accountId);
    return newAccount;
  }

  async deleteRole(accountId: number, roleName: string): Promise<Account> {
    await this.roleAccountService.delete(accountId, roleName);
    const account = await this.getById(accountId);
    return account;
  }

  async forgotPassword(
    email: string,
    resetPasswordToken: string,
    verificationTokenExpiration: Date,
  ): Promise<Account> {
    const [account] = await this.getByEmail(email);
    if (!account) {
      throw new NotFoundException('El usuario no existe');
    }

    account.resetPasswordToken = resetPasswordToken;
    account.verificationTokenExpiration = verificationTokenExpiration;
    return this.repo.save(account);
  }

  async recoverPassword(
    accountId: number,
    newPassword: string,
  ): Promise<Account> {
    const account = await this.getById(accountId);
    if (!account) {
      throw new NotFoundException('El usuario no existe');
    }
    const newHash = await this.hashPassword(newPassword);
    account.password = newHash;
    await this.repo.save(account);

    const foundAccount = await this.getById(accountId);
    return foundAccount;
  }

  async validateRecoverToken(
    accountId: number,
    token: string,
  ): Promise<boolean> {
    const updatedAccount = await this.repo.findOne({ where: { accountId } });
    if (!updatedAccount) {
      throw new NotFoundException('La cuenta no existe.');
    }
    if (updatedAccount.resetPasswordToken === token) {
      return true;
    } else {
      return false;
    }
  }

  async updatePassword(
    accountId: number,
    password: string,
    newPassword: string,
  ) {
    const account = await this.getById(accountId);

    if (!account) {
      throw new NotFoundException('La cuenta no existe');
    }
    const [salt, storedHash] = account.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('La contraseña es incorrecta');
    }

    const newHash = await this.hashPassword(newPassword);

    account.password = newHash;
    await this.repo.save(account);
    return account;
  }

  async activateAccount(accountId: number): Promise<Account> {
    const account = await this.getById(accountId);
    account.active = true;
    return await this.repo.save(account);
  }

  async deactivateAccount(accountId: number): Promise<Account> {
    const account = await this.getById(accountId);
    account.active = false;
    return await this.repo.save(account);
  }

  async delete(accountId: number) {
    const deletedAccount = await this.getById(accountId);
    return this.repo.remove(deletedAccount);
  }
}
