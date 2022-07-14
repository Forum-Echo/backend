import { Injectable } from '@nestjs/common';
import { find } from '../../../utils/database/database.providers';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserStrategy {
  async validateRequest(request: any): Promise<any> {
    const dbResponse = await find(
      { _id: new ObjectId(request.user.id) },
      'users',
      'users',
    );

    if (!dbResponse[0]) {
      return false;
    }

    return (
      dbResponse[0]._id.toString() === new ObjectId(request.user.id).toString()
    );
  }
}
