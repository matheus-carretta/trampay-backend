import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new Error('Email address or password provided is incorrect.');
  }

  login(user: User): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      accessToken: jwtToken,
    };
  }

  async sendRecoverPasswordEmail(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);

    if (!user)
      throw new NotFoundException('Não há usuário cadastrado com esse email.');

    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
    };

    const jwtToken = this.jwtService.sign(payload);

    const mail = {
      to: user.email,
      from: process.env.SMTP_EMAIL,
      subject: 'Recuperação de senha',
      html: `<html>
      <body>
        <center>
          <div style="background-color: #d3d3d3; max-width: 840px; margin: 0; padding: 30px;">
            <h2 style="color: #292536; text-align: center">Solicitação de alteração de senha</h2>
            <p>Para alterar sua senha clique no botão abaixo, ou acesse o seguinte link: </p>
            <div style="margin: 20px auto; width: 120px; padding: 10px 20px; background-color: #442d52; border-radius: 5px">
              <a href="http://url-do-front/reset-password/?token=${jwtToken}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: #fcfcfc; font-size: 18px; margin: 0 auto;">Alterar Senha</a>
            </div>
          </div>
        </center>
      </body>
    </html>`,
    };

    await this.mailerService.sendMail(mail);
  }
}
