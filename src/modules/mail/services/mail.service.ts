import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../../users/models/user.model';
import * as dotenv from 'dotenv';

dotenv.config({
  path: 'src/modules/environment/config/dev.env',
});

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User): Promise<any> {
    const url = `${process.env.DOMAIN}login`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to ForumEcho! Confirm your Email',
      template: './confirmation.hbs',
      context: {
        name: user.username,
        url,
      },
    });
  }
}
