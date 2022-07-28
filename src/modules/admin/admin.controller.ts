import { Body, Controller, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@Controller('admin')
export class AdminController {
  // DELETE /delpost
  @UseGuards(JwtAuthGuard)
  @Delete('delpost')
  deletePost(@Body('post_id') post_id): any {
    return ''; //this.adminService.deletePost(post_id);
  }
}
