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
    let flag = 0;

    for (let i = 0; i < upvotes.length; i++) {
      if (upvotes[i] === post_id) {
        upvotes.splice(i, 1);
        flag = 1;
        break;
      }
    }

    if (flag === 0) {
      upvotes.push(author_id);
    }

    await update(
      { _id: new ObjectId(post_id) },
      { $set: { liked_by: upvotes } },
      'posts',
      'posts',
    );

    return { liked_by: upvotes };
  }

  async downVote(post_id: string, downvotes: string[], author_id: string) {
    let flag = 0;

    for (let i = 0; i < downvotes.length; i++) {
      if (downvotes[i] === post_id) {
        downvotes.splice(i, 1);
        flag = 1;
        break;
      }
    }

    if (flag === 0) {
      downvotes.push(author_id);
    }
    await update(
      { _id: new ObjectId(post_id) },
      { $set: { disliked_by: downvotes } },
      'posts',
      'posts',
    );
    return { disliked_by: downvotes };
  }
}
