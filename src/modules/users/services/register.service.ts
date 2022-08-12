import { BadRequestException, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { MailService } from '../../mail/services/mail.service';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private userService: UserService,
    private mailService: MailService,
  ) {}
  async register(
    username: string,
    password: string,
    email: string,
  ): Promise<any> {
    if (!username || !password || !email) {
      throw new BadRequestException('Wrong Body');
    }

    if (username.length > 24) {
      throw new BadRequestException('Too long Body');
    }

    const dbResponse = await this.userService.getUserByName(username);

    if (!dbResponse.error) {
      return { error: 'user_already_exists' };
    }

    const hashedPassword = this.hash(password);

    const newUser = new this.userModel({
      username: username,
      email: email,
      password: hashedPassword,
      authority: 3,
      permissions: ['create_post', 'delete_own_post', 'vote'],
      role: 'user',
    });

    const result = await newUser.save();

    //TODO: await this.mailService.sendUserConfirmation(newUser);

    return { success: result.id };
  }

  hash(password) {
    return crypto
      .createHash('sha256')
      .update(JSON.stringify(password))
      .digest('hex');
  }
}
