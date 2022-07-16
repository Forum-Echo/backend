import { Body, Controller, Delete, UseGuards } from '@nestjs/common';
import { DelPostService } from './services/delpost.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly delPostService: DelPostService) {}

  // DELETE /delpost
  @UseGuards(JwtAuthGuard)
  @Delete('delpost')
  deletePost(@Body('post_id') post_id): any {
    return this.delPostService.deletePost(post_id);
  }
}
