import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { VoteService } from './services/vote.service';
import { UserGuard } from '../auth/guard/user.guard';
import { PostService } from './services/post.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly voteService: VoteService,
  ) {}

  // GET /:post_id  (Get a specific Posts)
  @Get('id/:post_id')
  getPosts(@Param('post_id') post_id: string): any {
    return this.postService.getPostById(post_id);
  }

  // GET /all (Get all posts)
  @Get('all')
  getAllPosts(): any {
    return this.postService.getAllPosts();
  }

  // POST /new  (New Post)
  @UseGuards(JwtAuthGuard, UserGuard)
  @Post('new')
  newPost(
    @Request() req,
    @Body('title') title: string,
    @Body('content') content: string,
  ): any {
    return this.postService.createPost(req.user.id, title, content);
  }

  // PATCH /vote (Up/Down-vote)
  @UseGuards(JwtAuthGuard, UserGuard)
  @Patch('vote')
  upvote(
    @Request() req,
    @Body('type') type: boolean,
    @Body('post_id') post_id: string,
  ): any {
    return this.voteService.vote(type, post_id, req.user.id);
  }

  // PATCH /edit (Edit Post)
  @UseGuards(JwtAuthGuard, UserGuard)
  @Patch('edit')
  editPost(
    @Body('post_id') post_id,
    @Body('title') title,
    @Body('content') content,
    @Request() req,
  ): any {
    return this.postService.editPost(post_id, req.user.id, title, content);
  }

  // DELETE /del
  @UseGuards(JwtAuthGuard, UserGuard)
  @Delete('del')
  deletePost(@Body('post_id') post_id: string, @Request() req): any {
    return this.postService.deletePost(post_id, req.user.id);
  }
}
