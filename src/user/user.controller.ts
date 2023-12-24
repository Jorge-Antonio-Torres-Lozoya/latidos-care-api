import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { SignUpUserDto } from './dtos/signup_user.dto';
import { JwtUserGuard } from './user-auth/user-guard/user.jwt.guard';
import { LocalUserGuard } from './user-auth/user-guard/user.guard';
import { UpdateUserDto } from './dtos/update_user.dto';
import { ChangePasswordUserDto } from './dtos/change_password_user.dto';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';
import { VerificationValidatedToken } from './dtos/verification_validated_token.dto';
import { VerificationToken } from './dtos/verification_token.dto';
import { ForgotPasswordDto } from './dtos/forgot_password.dto';
import { SendgridService } from 'sendgrid.service';
import { generateSixDigitRandomNumber } from '../shared/helpersFunc';
import { RecoverPasswordUserDto } from './dtos/recover_password_user.dto';
import { VerificationUserDto } from './dtos/verification_user.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private sendgridService: SendgridService,
  ) {}

  @Serialize(UserDto)
  @Get()
  getAllUser(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Serialize(UserDto)
  @Get()
  getAllByEmail(@Query('email') email: string): Promise<User[]> {
    return this.userService.getByEmail(email);
  }

  @Serialize(UserDto)
  @Get('/:id')
  async getOneUser(@Param('id') userId: string): Promise<User> {
    const foundUser = await this.userService.getOne(parseInt(userId));
    if (!foundUser) {
      throw new NotFoundException('La cuenta no existe');
    }

    return foundUser;
  }

  @Get('/:id/validate-verification-token')
  async validateUserVerificationToken(
    @Param('id') userId: string,
    @Query('verification-token') token: string,
  ): Promise<VerificationValidatedToken> {
    const validation = await this.userService.validateToken(
      parseInt(userId),
      token,
    );

    return { validated: validation };
  }

  @Get('/validate-recover-token/:id')
  async validateUserRecoverToken(
    @Param('id') userId: string,
    @Query('recover-token') token: string,
  ): Promise<VerificationValidatedToken> {
    const validation = await this.userService.validateRecoverToken(
      parseInt(userId),
      token,
    );

    return { validated: validation };
  }

  @Post('/signup')
  async signupUser(@Body() body: SignUpUserDto): Promise<User> {
    const verificationCode: number = generateSixDigitRandomNumber();
    const user = await this.userService.signupUser(
      body.firstName,
      body.lastName,
      body.phoneNumber,
      body.email,
      body.password,
      verificationCode,
    );

    const mail = {
      to: body.email,
      subject: 'Latidos Care',
      from: 'latidoscare@gmail.com',
      text: 'Latidos Care: Bievenido a Latidos Care',
      html: `
      <div style="width:100%; background:rgb(248, 247, 244); position:relative; font-family:sans-serif; padding-bottom:40px">
      <div style="width:100%; background:rgb(248, 247, 244); position:relative; padding-bottom:40px"></div>
          <div style="position:relative; margin:auto; width:600px; background:white; padding:20px">
            <center>
              <h3 style="font-weight:100; color:#000000; text-align:center;"> Bievenido a Latidos Care!</h3>
              <hr style="border:1px solid #ccc; width:80%; margin:5px auto; display:block;">
              <br>
              <p>Haga click en el siguiente enlace para verificar su cuenta:</p>
              <a href="https://latidos-care-app-production.up.railway.app/verification?token=${verificationCode}"> https://latidoscare.com/verification </a>
            </center>
          </div>
        </div>
      `,
    };

    await this.sendgridService.send(mail);
    return user;
  }

  @UseGuards(LocalUserGuard)
  @Post('/login')
  async loginAccountUser(@Request() req: any) {
    return await this.userService.jwtValidationUser(req.user);
  }

  @Serialize(UserDto)
  @UseGuards(JwtUserGuard)
  @Put('/:id')
  async updateUser(
    @Param('id') userId: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    const updatedUser = await this.userService.getOne(parseInt(userId));

    if (!updatedUser) {
      throw new NotFoundException('La cuenta no existe.');
    }

    return this.userService.updateUser(parseInt(userId), body);
  }

  @Get('/:id/verification-token')
  async getOneUserVerificationToken(
    @Param('id') userId: string,
  ): Promise<VerificationToken> {
    const verificationTokenUser = await this.userService.getVerificationToken(
      parseInt(userId),
    );

    return { verificationToken: verificationTokenUser };
  }

  //@Serialize(UserDto)
  @UseGuards(JwtUserGuard)
  @Get('/:id/generate-verification-token')
  async generateUserVerificationToken(
    @Param('id') userId: string,
  ): Promise<VerificationToken> {
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const token = await this.userService.generateVerificationToken(
      parseInt(userId),
      verificationToken,
    );
    return { verificationToken: token };
  }

  @UseGuards(JwtUserGuard)
  @Put('/change-password/:id')
  async changePasswordMember(
    @Param('id') userId: string,
    @Body() body: ChangePasswordUserDto,
  ) {
    const user = await this.userService.getOne(parseInt(userId));

    if (!user) {
      throw new NotFoundException('La cuenta no existe.');
    }

    const mail = {
      to: user.email,
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

    return this.userService.updatePassword(
      parseInt(userId),
      body.password,
      body.newPassword,
    );
  }

  @Serialize(UserDto)
  @UseGuards(JwtUserGuard)
  @Get('/register-data/:id')
  async updateRegisterDataUser(@Param('id') userId: string): Promise<User> {
    const user = await this.userService.updateRegisterData(parseInt(userId));
    return user;
  }

  @Serialize(UserDto)
  @Post('/forgot-password')
  async forgotPasswordUser(@Body() body: ForgotPasswordDto) {
    const resetPasswordToken = uuidv4();
    const verificationTokenExpiration = new Date(Date.now() + 30 * 60 * 1000);
    const user = await this.userService.forgotPassword(
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
              <a href="https://latidos-care-app-production.up.railway.app/recover-password-user/${user.userId.toString()}?token=${resetPasswordToken}"> https://latidoscare.com/recover-password-user </a>
              <br>
              <p>Este enlace sólo será válido por 30 minutos</p>
            </center>
          </div>
        </div>
      `,
    };
    await this.sendgridService.send(mail);

    return user;
  }

  @Serialize(UserDto)
  @Put('/recover-password/:id')
  async recoverPasswordMember(
    @Param('id') userId: string,
    @Body() body: RecoverPasswordUserDto,
  ) {
    const user = await this.userService.getOne(parseInt(userId));
    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }

    const now = new Date();
    const expirationTime = new Date(user.verificationTokenExpiration);
    const elapsedMinutes =
      (now.getTime() - expirationTime.getTime()) / (1000 * 60);

    if (elapsedMinutes >= 30) {
      throw new UnauthorizedException('El enlace ya no es válido');
    }

    await this.userService.recoverPassword(parseInt(userId), body.newPassword);

    const mail = {
      to: user.email,
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
    return user;
  }

  @Put('/verification')
  verificationUser(@Body() body: VerificationUserDto): Promise<User> {
    return this.userService.verificationUser(body.verificationCode);
  }

  @UseGuards(JwtUserGuard)
  @Serialize(UserDto)
  @Delete('/:id')
  async deleteUser(@Param('id') userId: string): Promise<User> {
    const deleteUser = await this.userService.getOne(parseInt(userId));

    if (!deleteUser) {
      throw new NotFoundException('La cuenta no existe.');
    }

    return this.userService.delete(parseInt(userId));
  }
}
