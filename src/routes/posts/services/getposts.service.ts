import { Injectable } from '@nestjs/common';
import { find } from '../../../utils/database/database.providers';

@Injectable()
export class GetPostsService {
  async getPosts(): Promise<any> {
    return await find({}, 'posts', 'posts');
  }
}
