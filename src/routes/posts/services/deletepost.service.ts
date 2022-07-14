import { Injectable } from '@nestjs/common';
import { find } from '../../../utils/database/database.providers';
import { ObjectId } from 'mongodb';

@Injectable()
export class DeletePostService {
  async deletePost(post_id: string) {
    await find({ _id: new ObjectId(post_id) }, 'posts', 'posts');
  }
}
