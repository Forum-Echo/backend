import { Module } from '@nestjs/common';
import { NewPostService } from './services/newpost.service';
import { PostController } from './post.controller';
import { GetPostsService } from './services/getposts.service';
import { VoteService } from './services/vote.service';

@Module({
  imports: [],
  providers: [NewPostService, GetPostsService, VoteService],
  controllers: [PostController],
})
export class PostModule {}
