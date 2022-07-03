import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NewPostService } from './services/newpost.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { GetPostsService } from './services/getposts.service';
import { VoteService } from './services/vote.service';
import * as Path from 'path';
import { EditPostService } from './services/editpost.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly newPostService: NewPostService,
    private readonly getPostsService: GetPostsService,
    private readonly voteService: VoteService,
    private readonly editPostService: EditPostService,
  ) {}

  // GET /
  @Get('')
  getPosts(): any {
    return this.getPostsService.getPosts();
  }

  // POST /new
  @UseGuards(JwtAuthGuard)
  @Post('new')
  newPost(
    @Request() req,
    @Body('title') title: string,
    @Body('content') content: string,
  ): any {
    return this.newPostService.newPost(req.user.id, title, content);
  }

  // POST /vote
  @Post('vote')
  upvote(@Body('type') type: boolean, @Body('post_id') post_id): any {
    return this.voteService.vote(type, post_id);
  }

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
