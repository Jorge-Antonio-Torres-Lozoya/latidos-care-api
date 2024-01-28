import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  Request,
  Put,
  UnauthorizedException,
  Delete,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto } from './dtos/account.dto';
import { Account } from './account.entity';
import { SignUpAccountDto } from './dtos/signup-account.dto';
import { LocalAccountGuard } from './account-auth/account-guards/account.guard';
import { JwtAccountGuard } from './account-auth/account-guards/account.jwt.guard';
import { UpdateAccountDto } from './dtos/update-account.dto';
import { ChangePasswordDto } from './dtos/change_password.dto';
import { v4 as uuidv4 } from 'uuid';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { RecoverPasswordDto } from './dtos/recover-password.dto';
import { AccountRoleDto } from './dtos/account-role.dto';
import { VerificationValidatedToken } from './dtos/verification_validated_token.dto';
import { RolesGuard } from './account-auth/account-guards/roles.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { Roles } from '../shared/roles.decorator';
import { SendgridService } from '../../sendgrid.service';

@Controller('account')
export class AccountController {
  constructor(
    private accountService: AccountService,
    private sendgridService: SendgridService,
  ) {}

  @Serialize(AccountDto)
  @Get()
  getAllAccounts(): Promise<Account[]> {
    return this.accountService.getAll();
  }

  @Serialize(AccountDto)
  @Get('by-role')
  getAllUsersByRole(@Query('roleName') roleName: string): Promise<Account[]> {
    return this.accountService.getAllByRole(roleName);
  }

  @Serialize(AccountDto)
  @Get('by-email')
  getAllByEmail(@Query('email') email: string): Promise<Account[]> {
    return this.accountService.getByEmail(email);
  }

  @Serialize(AccountDto)
  @Get('/:id')
  async getOneAccount(@Param('id') accountId: string): Promise<Account> {
    const account = await this.accountService.getById(parseInt(accountId));
    return account;
  }

  @Serialize(AccountDto)
  @Get('/by-slug/:slug')
  async getOneAccountBySlug(@Param('slug') slug: string): Promise<Account> {
    const account = await this.accountService.getBySlug(slug);
    return account;
  }

  @Serialize(AccountDto)
  @Post('/signup-user')
  async signupUser(@Body() body: SignUpAccountDto) {
    const account = await this.accountService.signupAccount(body, 'User');
    return account;
  }

  @Serialize(AccountDto)
  @Post('/protected/signup/admin')
  async signupAdmin(@Body() body: SignUpAccountDto) {
    const account = await this.accountService.signupAccount(body, 'Admin');
    return account;
  }

  @UseGuards(LocalAccountGuard)
  @Post('/login')
  async loginAccount(@Request() req: any) {
    return await this.accountService.jwtValidationAccount(req.user);
  }

  @Put('/:id')
  @UseGuards(JwtAccountGuard)
  @Serialize(AccountDto)
  async updateAccount(
    @Param('id') accountId: string,
    @Body() body: UpdateAccountDto,
  ) {
    const account = await this.accountService.updateAccount(
      parseInt(accountId),
      body,
    );

    return account;
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin')
  @Serialize(AccountDto)
  @Put('/protected/add-role/:id')
  async addRoleToAccount(
    @Param('id') accountId: string,
    @Body() body: AccountRoleDto,
  ) {
    const account = await this.accountService.addRole(
      parseInt(accountId),
      body.roleName,
    );
    return account;
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin')
  @Serialize(AccountDto)
  @Get('/protected/activate-account/:id')
  async activateAccount(@Param('id') accountId: string) {
    const account = await this.accountService.activateAccount(
      parseInt(accountId),
    );
    return account;
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin')
  @Serialize(AccountDto)
  @Get('/protected/deactivate-account/:id')
  async deactivateAccount(@Param('id') accountId: string) {
    const account = await this.accountService.deactivateAccount(
      parseInt(accountId),
    );
    return account;
  }

  @UseGuards(JwtAccountGuard, RolesGuard)
  @Roles('Admin')
  @Serialize(AccountDto)
  @Put('/protected/delete-role/:id')
  async deleteRoleOfAccount(
    @Param('id') accountId: string,
    @Body() body: AccountRoleDto,
  ) {
    const account = await this.accountService.deleteRole(
      parseInt(accountId),
      body.roleName,
    );
    return account;
  }

  @UseGuards(JwtAccountGuard)
  @Serialize(AccountDto)
  @Put('/change-password/:id')
  async changePasswordAccount(
    @Param('id') accountId: string,
    @Body() body: ChangePasswordDto,
  ) {
    const account = await this.accountService.updatePassword(
      parseInt(accountId),
      body.password,
      body.newPassword,
    );

    return account;
  }

  @Get('/validate-recover-token/:id')
  async validateUserRecoverToken(
    @Param('id') accountId: string,
    @Query('recover-token') token: string,
  ): Promise<VerificationValidatedToken> {
    const validation = await this.accountService.validateRecoverToken(
      parseInt(accountId),
      token,
    );

    return { validated: validation };
  }

  @Serialize(AccountDto)
  @Post('/forgot-password')
  async forgotPasswordAccount(@Body() body: ForgotPasswordDto) {
    const resetPasswordToken = uuidv4();
    const verificationTokenExpiration = new Date(Date.now() + 30 * 60 * 1000);
    const account = await this.accountService.forgotPassword(
      body.email,
      resetPasswordToken,
      verificationTokenExpiration,
    );

    const mail = {
      to: body.email,
      subject: 'Latidos Care',
      from: 'latidoscare@gmail.com',
      text: 'Latidos Care: Recuperar contraseña',
      html: `
      <div style="width:100%; background:rgb(248, 247, 244); position:relative; font-family:sans-serif; padding-bottom:40px">
      <div style="width:100%; background:rgb(248, 247, 244); position:relative; padding-bottom:40px"></div>
          <div style="position:relative; margin:auto; width:600px; background:white; padding:20px">
            <center>
              <h3 style="font-weight:100; color:#000000; text-align:center;">Ha solicitado recuperar su contraseña</h3>
              <hr style="border:1px solid #ccc; width:80%; margin:5px auto; display:block;">
              <br>
              <p>Haga click en el siguiente enlace para recuperar su contraseña:</p>
              <a href="https://latidos-care-app-production.up.railway.app/recover-password-user/${account.accountId.toString()}?token=${resetPasswordToken}"> https://latidoscare.com/recover-password-user </a>
              <br>
              <p>Este enlace sólo será válido por 30 minutos</p>
            </center>
          </div>
        </div>
      `,
    };
    await this.sendgridService.send(mail);

    return account;
  }

  @Serialize(AccountDto)
  @Put('/recover-password/:id')
  async recoverPasswordAccount(
    @Param('id') accountId: string,
    @Body() body: RecoverPasswordDto,
  ) {
    const account = await this.accountService.getById(parseInt(accountId));

    const now = new Date();
    const expirationTime = new Date(account.verificationTokenExpiration);
    const elapsedMinutes =
      (now.getTime() - expirationTime.getTime()) / (1000 * 60);

    if (elapsedMinutes >= 30) {
      throw new UnauthorizedException('El enlace ya no es válido');
    }

    await this.accountService.recoverPassword(
      parseInt(accountId),
      body.newPassword,
    );

    const mail = {
      to: account.email,
      subject: 'Latidos Care',
      from: 'latidoscare@gmail.com',
      text: 'Latidos Care: Contraseña cambiada',
      html: `
      <div style="width:100%; background:rgb(248, 247, 244); position:relative; font-family:sans-serif; padding-bottom:40px">
      <div style="width:100%; background:rgb(248, 247, 244); position:relative; padding-bottom:40px"></div>
          <div style="position:relative; margin:auto; width:600px; background:white; padding:20px">
            <center>
              <h3 style="font-weight:100; color:#000000; text-align:center;">Su contraseña ha sido cambiada</h3>
              <hr style="border:1px solid #ccc; width:80%; margin:5px auto; display:block;">
              <br>
              <p style="color:#000000;">Si usted no fue quien cambió la contraseña le sugerimos que ingrese a Latidos Care y seleccione la opción ¿Olvidó su contraseña? para poder recuperar su cuenta.</p>
            </center>
          </div>
        </div>
      `,
    };
    await this.sendgridService.send(mail);

    return account;
  }

  @UseGuards(JwtAccountGuard)
  @Serialize(AccountDto)
  @Delete('/:id')
  async deleteAccount(@Param('id') accountId: string) {
    return await this.accountService.delete(parseInt(accountId));
  }
}
