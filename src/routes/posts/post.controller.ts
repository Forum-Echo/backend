import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { NewPostService } from './services/newpost.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@Controller('post')
export class PostController {
  constructor(private readonly newPostService: NewPostService) {}

  // POST /new
  @UseGuards(JwtAuthGuard)
  @Post('new')
  newPost(
    @Body('title') title: string,
    @Body('content') content: string,
  ): any {
    return this.newPostService.newPost(title, content);
  }
}
