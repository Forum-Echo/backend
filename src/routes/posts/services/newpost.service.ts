import { BadRequestException, Injectable } from '@nestjs/common';
import { find, insert } from '../../../utils/database/database.providers';

@Injectable()
export class NewPostService {
  async newPost(id: string, title: string, content: string): Promise<any> {
    if (!title || !content) {
      throw new BadRequestException();
    }

    let dbResponse;
    dbResponse = await find({ title: title }, 'posts', 'posts');

    if (dbResponse[0] !== undefined) {
      return { error: 'title_already_exists' };
    }

    dbResponse = await find({ content: content }, 'posts', 'posts');

    if (dbResponse[0] !== undefined) {
      return { error: 'content_already_exists' };
    }

    return await insert(
      {
        author_id: id,
        title: title,
        upvotes: 0,
        downvotes: 0,
        content: content,
      },
      'posts',
      'posts',
    );
  }
}