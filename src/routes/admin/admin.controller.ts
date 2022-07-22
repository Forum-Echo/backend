import { Body, Controller, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { AdminService } from './services/admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // DELETE /delpost
  @UseGuards(JwtAuthGuard)
  @Delete('delpost')
  deletePost(@Body('post_id') post_id): any {
    return ''; //this.adminService.deletePost(post_id);
  }
}
