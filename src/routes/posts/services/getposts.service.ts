import { Injectable } from '@nestjs/common';
import { find } from '../../../utils/database/database.providers';
import { ObjectId } from 'mongodb';

@Injectable()
export class GetPostsService {
  async getPosts(post_id: string): Promise<any> {
    let dbResponse;

    if (post_id === 'false') {
      dbResponse = await find({}, 'posts', 'posts');
      return dbResponse;
    }

    dbResponse = await find({ _id: new ObjectId(post_id) }, 'posts', 'posts');
    return dbResponse[0];
  }
}
