import { Injectable } from '@nestjs/common';
import { find, update } from '../../../utils/database/database.providers';
import { ObjectId } from 'mongodb';
import * as crypto from 'crypto';

@Injectable()
export class EditUserService {
  async editUser(
    user_id: string,
    new_password: string,
    new_username: string,
  ): Promise<any> {
    const dbResponse = await find(
      { _id: new ObjectId(user_id) },
      'users',
      'users',
    );

    if (!dbResponse[0]) {
      return { error: 'no_user_found' };
    }

    const hashedPassword = this.hash(new_password);

    return await update(
      { _id: new ObjectId(user_id) },
      { $set: { password: hashedPassword, username: new_username } },
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
