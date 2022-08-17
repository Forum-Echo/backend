import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import * as crypto from 'crypto';
import { Salt } from '../models/salt.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Salt') private readonly saltModel: Model<Salt>,
  ) {}

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

  async getUserByToken(token: string): Promise<any> {
    if (!token) {
      throw new NotFoundException('user_not_found');
    }

    const user = await this.userModel.findOne({ role: token });

    if (!user) {
      throw new NotFoundException('user_not_found');
    }

    return user;
  }

  async deleteUser(user_id: string): Promise<any> {
    const user = await this.userModel.findById(user_id);

    if (!user) {
      throw new NotFoundException('user_not_found');
    }

    this.userModel.findByIdAndDelete(user_id);

    this.saltModel.findOneAndDelete({ userId: user_id });

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

  async verifyUser(token: string): Promise<any> {
    const user = await this.getUserByToken(token);

    if (!user) {
      throw new NotFoundException('user_not_found');
    }

    user.role = 'user';

    user.save();

    return { user: user };
  }

  async getSalt(userId: string): Promise<any> {
    const salt = await this.saltModel.findOne({ userId });

    if (!salt) {
      throw new NotFoundException('salt_not_found');
    }

    return salt.salt;
  }

  hash(password) {
    return crypto
      .createHash('sha512')
      .update(JSON.stringify(password))
      .digest('hex');
  }
}
