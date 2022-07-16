import { Injectable } from '@nestjs/common';
import { del, find } from '../../../utils/database/database.providers';
import { ObjectId } from 'mongodb';

@Injectable()
export class DelPostService {
  async deletePost(post_id: string): Promise<any> {
    const dbResponse = await find(
      { _id: new ObjectId(post_id) },
      'posts',
      'posts',
    );

    if (!dbResponse[0]) {
      return { error: 'post_not_found' };
    }

    await del({ _id: new ObjectId(post_id) }, 'posts', 'posts');

    return { success: true };
  }
}
