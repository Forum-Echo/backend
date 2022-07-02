import { Injectable } from '@nestjs/common';
import { find } from '../../../utils/database/database.providers';
import { Hash } from '../../../utils/hash';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class LoginService {
  constructor(private readonly hash: Hash) {}

  async findOne(username: string) {
    const dbResponse = await find({ username: username }, 'users', 'users');

    return dbResponse[0];
  }
}
