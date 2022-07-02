import { Injectable } from '@nestjs/common';
import { find, update } from '../../../utils/database/database.providers';
import { ObjectId } from 'mongodb';

@Injectable()
export class VoteService {
  async vote(type: boolean, post_id: string) {
    const dbResponse = await find(
      { _id: new ObjectId(post_id) },
      'posts',
      'posts',
    );

    console.log(dbResponse);

    if (type) {
      return await this.upvote(post_id, dbResponse[0].upvotes);
    } else {
      return await this.downVote(post_id, dbResponse[0].downvotes);
    }
  }

  async upvote(post_id: string, upvotes: number) {
    await update(
      { _id: new ObjectId(post_id) },
      { $set: { upvotes: upvotes + 1 } },
      'posts',
      'posts',
    );

    return { upvotes: upvotes + 1 };
  }

  async downVote(post_id: string, downvotes: number) {
    await update(
      { _id: new ObjectId(post_id) },
      { $set: { downvotes: downvotes + 1 } },
      'posts',
      'posts',
    );

    return { downvotes: downvotes + 1 };
  }
}
