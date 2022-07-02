import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { NewPostService } from './services/newpost.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { GetPostsService } from './services/getposts.service';
import { VoteService } from './services/vote.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly newPostService: NewPostService,
    private readonly getPostsService: GetPostsService,
    private readonly voteService: VoteService,
  ) {}

  // GET /
  @Get('')
  getPosts(): any {
    return this.getPostsService.getPosts();
  }

  // POST /new
  @UseGuards(JwtAuthGuard)
  @Post('new')
  newPost(@Body('title') title: string, @Body('content') content: string): any {
    return this.newPostService.newPost(title, content);
  }

  // POST /vote
  @Post('vote')
  upvote(@Body('type') type: boolean, @Body('post_id') post_id): any {
    return this.voteService.vote(type, post_id);
  }
}
