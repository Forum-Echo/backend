import { Injectable } from '@nestjs/common';
import { find } from '../../../utils/database/database.providers';

@Injectable()
export class LoginService {
  async findOne(username: string) {
    const dbResponse = await find({ username: username }, 'users', 'users');

    return dbResponse[0];
  }
}
