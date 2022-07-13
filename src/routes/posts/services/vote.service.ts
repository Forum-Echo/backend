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

    if (type) {
      return await this.upvote(
        post_id,
        dbResponse[0].liked_by,
        dbResponse[0].author_id,
      );
    } else {
      return await this.downVote(
        post_id,
        dbResponse[0].disliked_by,
        dbResponse[0].author_id,
      );
    }
  }

  async upvote(post_id: string, upvotes: string[], author_id: string) {
    upvotes.push(author_id);
    console.log(upvotes);
    await update(
      { _id: new ObjectId(post_id) },
      { $set: { liked_by: upvotes } },
      'posts',
      'posts',
    );

    return { liked_by: upvotes };
  }

  async downVote(post_id: string, downvotes: string[], author_id: string) {
    downvotes.push(author_id);
    console.log(downvotes);
    await update(
      { _id: new ObjectId(post_id) },
      { $set: { disliked_by: downvotes } },
      'posts',
      'posts',
    );
    return { disliked_by: downvotes };
  }
}
