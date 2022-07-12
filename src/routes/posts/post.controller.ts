import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NewPostService } from './services/newpost.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { GetPostsService } from './services/getposts.service';
import { VoteService } from './services/vote.service';
import { EditPostService } from './services/editpost.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly newPostService: NewPostService,
    private readonly getPostsService: GetPostsService,
    private readonly voteService: VoteService,
    private readonly editPostService: EditPostService,
  ) {}

  // GET /  (Get all Posts)
  @Get(':post_id')
  getPosts(@Param('post_id') post_id: string): any {
    return this.getPostsService.getPosts(post_id);
  }

  // POST /new  (New Post)
  @UseGuards(JwtAuthGuard)
  @Post('new')
  newPost(
    @Request() req,
    @Body('title') title: string,
    @Body('content') content: string,
  ): any {
    return this.newPostService.newPost(req.user.id, title, content);
  }

  // POST /vote (Up/Down-vote)
  @UseGuards(JwtAuthGuard)
  @Post('vote')
  upvote(@Body('type') type: boolean, @Body('post_id') post_id): any {
    return this.voteService.vote(type, post_id);
  }

  // PATCH /edit (Edit Post)
  @UseGuards(JwtAuthGuard)
  @Patch('edit')
  editPost(
    @Body('post_id') post_id,
    @Body('title') title,
    @Body('content') content,
  ) {
    return this.editPostService.editPost(post_id, title, content);
  }
}
