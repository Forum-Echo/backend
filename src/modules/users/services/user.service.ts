import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUserById(user_id: string): Promise<any> {
    const user = await this.userModel.findById(user_id);

    if (!user) {
      throw new NotFoundException('user_not_found');
    }

    return user;
  }

  async getUserByName(username: string): Promise<any> {
    const user = await this.userModel.findOne({ username: username });

    if (!user) {
      return { error: 'user_not_found' };
    }

    return user;
  }

  async deleteUser(user_id: string): Promise<any> {
    const user = await this.userModel.findById(user_id);

    if (!user) {
      throw new NotFoundException('user_not_found');
    }

    this.userModel.findByIdAndDelete(user_id);

    return { success: true };
  }

  async editUser(
    user_id: string,
    new_password: string,
    new_username: string,
  ): Promise<any> {
    const user = await this.getUserById(user_id);

    if (!user) {
      throw new NotFoundException('user_not_found');
    }

    user.password = this.hash(new_password);
    user.username = new_username;

    user.save();

    return { success: true };
  }

  hash(password) {
    return crypto
      .createHash('sha256')
      .update(JSON.stringify(password))
      .digest('hex');
  }
}
