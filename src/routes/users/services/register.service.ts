import { BadRequestException, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { find, insert } from '../../../utils/database/database.providers';

@Injectable()
export class RegisterService {
  async register(
    username: string,
    password: string,
    email: string,
  ): Promise<any> {
    if (username === undefined) {
      new BadRequestException();
      return;
    }

    let dbResponse;

    dbResponse = await find({ username: username }, 'users', 'users');

    if (dbResponse[0] !== undefined) {
      return {
        error: 'user_already_exists',
      };
    }

    dbResponse = await find({ email: email }, 'users', 'users');

    if (dbResponse[0] !== undefined) {
      return {
        error: 'email_already_exists',
      };
    }

    const hashedPassword = this.hash(password);

    return await insert(
      {
        username: `${username}`,
        password: `${hashedPassword}`,
        email: `${email}`,
      },
      'users',
      'users',
    );
  }

  hash(password) {
    return crypto
      .createHash('sha256')
      .update(JSON.stringify(password))
      .digest('hex');
  }
}
