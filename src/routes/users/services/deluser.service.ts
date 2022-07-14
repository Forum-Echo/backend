import { Injectable } from '@nestjs/common';
import { del, find } from '../../../utils/database/database.providers';
import { ObjectId } from 'mongodb';

@Injectable()
export class DelUserService {
  async deleteUser(user_id: string) {
    await find({ _id: new ObjectId(user_id) }, 'users', 'users');

    await del({ _id: new ObjectId(user_id) }, 'users', 'users');
  }
}
