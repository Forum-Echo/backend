import { Module } from '@nestjs/common';
import { NewPostService } from './services/newpost.service';
import { PostController } from './post.controller';

@Module({
  imports: [],
  providers: [NewPostService],
  controllers: [PostController],
})
export class PostModule {}
