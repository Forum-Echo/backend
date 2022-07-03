import { Module } from '@nestjs/common';
import { NewPostService } from './services/newpost.service';
import { PostController } from './post.controller';
import { GetPostsService } from './services/getposts.service';
import { VoteService } from './services/vote.service';
import { EditPostService } from './services/editpost.service';

@Module({
  imports: [],
  providers: [NewPostService, GetPostsService, VoteService, EditPostService],
  controllers: [PostController],
})
export class PostModule {}
