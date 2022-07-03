import { Injectable } from '@nestjs/common';
import { update } from '../../../utils/database/database.providers';
import { ObjectId } from 'mongodb';

@Injectable()
export class EditPostService {
  async editPost(
    post_id: string,
    title: string,
    content: string,
  ): Promise<any> {
    const dbResponse = await update(
      { _id: new ObjectId(post_id) },
      { $set: { title: title, content: content, updated_date: new Date() } },
      'posts',
      'posts',
    );

    if (dbResponse.matchedCount === 0) {
      return { error: 'post_does_not_exist' };
    }

    return { success: 'true' };
  }
}
