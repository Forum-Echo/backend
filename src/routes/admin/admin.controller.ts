import { Body, Controller, Delete } from '@nestjs/common';
import { DelPostService } from './services/delpost.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly delPostService: DelPostService) {}

  // DELETE /delpost
  @Delete('delpost')
  deletePost(@Body('post_id') post_id): any {
    return this.delPostService.deletePost(post_id);
  }
}
