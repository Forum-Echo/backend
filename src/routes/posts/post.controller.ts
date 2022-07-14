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
import { NewPostService } from './services/newpost.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { GetPostsService } from './services/getposts.service';
import { VoteService } from './services/vote.service';
import { EditPostService } from './services/editpost.service';
import { DeletePostService } from './services/deletepost.service';
import { UserGuard } from '../auth/guard/user.guard';

@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(
    private readonly newPostService: NewPostService,
    private readonly getPostsService: GetPostsService,
    private readonly voteService: VoteService,
    private readonly editPostService: EditPostService,
    private readonly deletePostService: DeletePostService,
  ) {}

  // GET /  (Get all Posts)
  @Get(':post_id')
  getPosts(@Param('post_id') post_id: string): any {
    return this.getPostsService.getPosts(post_id);
  }

  // POST /new  (New Post)
  @UseGuards(UserGuard)
  @Post('new')
  newPost(
    @Request() req,
    @Body('title') title: string,
    @Body('content') content: string,
  ): any {
    return this.newPostService.newPost(req.user.id, title, content);
  }

  // POST /vote (Up/Down-vote)
  @UseGuards(UserGuard)
  @Patch('vote')
  upvote(
    @Request() req,
    @Body('type') type: boolean,
    @Body('post_id') post_id: string,
  ): any {
    return this.voteService.vote(type, post_id, req.user.id);
  }

  // PATCH /edit (Edit Post)
  @UseGuards(UserGuard)
  @Patch('edit')
  editPost(
    @Body('post_id') post_id,
    @Body('title') title,
    @Body('content') content,
  ): any {
    return this.editPostService.editPost(post_id, title, content);
  }

  // DELETE /del
  @UseGuards(UserGuard)
  @Delete('del')
  deletePost(@Body('post_id') post_id: string): any {
    return this.deletePostService.deletePost(post_id);
  }
}
