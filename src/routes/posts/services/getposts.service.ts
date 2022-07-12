import { Injectable } from '@nestjs/common';
import { find } from '../../../utils/database/database.providers';
import { ObjectId } from 'mongodb';

@Injectable()
export class GetPostsService {
  async getPosts(post_id: string): Promise<any> {
    if (!post_id) {
      return await find({}, 'posts', 'posts');
    }

    return await find({ _id: new ObjectId(post_id) }, 'posts', 'posts');
  }
}
