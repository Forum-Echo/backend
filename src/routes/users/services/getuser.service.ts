import { Injectable } from '@nestjs/common';
import { find } from '../../../utils/database/database.providers';
import { ObjectId } from 'mongodb';

@Injectable()
export class GetUserService {
  async getUser(user_id: string): Promise<any> {
    const dbResponse = await find(
      { _id: new ObjectId(user_id) },
      'users',
      'users',
    );

    if (!dbResponse[0]) {
      return { error: 'user_not_exists' };
    }

    return {
      username: dbResponse[0].username,
      id: dbResponse[0]._id,
      email: dbResponse[0].email,
    };
  }
}
