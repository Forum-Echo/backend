import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './services/admin.service';
import { UserModule } from '../users/user.module';
import { PostModule } from '../posts/post.module';

@Module({
  imports: [UserModule, PostModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
