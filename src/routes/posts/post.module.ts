import { Module } from '@nestjs/common';
import { NewPostService } from './services/newpost.service';
import { PostController } from './post.controller';
import { GetPostsService } from './services/getposts.service';
import { VoteService } from './services/vote.service';
import { EditPostService } from './services/editpost.service';
import { DeletePostService } from './services/deletepost.service';
import { UserStrategy } from '../auth/strategy/user.strategy';
import { UserModule } from '../users/user.module';

@Module({
  imports: [UserModule],
  providers: [
    UserStrategy,
    NewPostService,
    GetPostsService,
    VoteService,
    EditPostService,
    DeletePostService,
  ],
  controllers: [PostController],
})
export class PostModule {}
