import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { VoteService } from './services/vote.service';
import { UserStrategy } from '../auth/strategy/user.strategy';
import { UserModule } from '../users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './models/post.model';
import { PostService } from './services/post.service';
import { VerifyStrategy } from '../auth/strategy/verify.strategy';
import { AuthModule } from '../auth/auth.module';
import { CommentController } from './comments/comments.controller';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
  ],
  providers: [PostService, UserStrategy, VerifyStrategy, VoteService],
  controllers: [PostController, CommentController],
})
export class PostModule {}
