import { Body, Controller, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // DELETE /delpost
  @UseGuards(JwtAuthGuard)
  @Delete('delpost')
  deletePost(@Body('post_id') post_id): any {
    return this.adminService.deletePost(post_id);
  }
}
