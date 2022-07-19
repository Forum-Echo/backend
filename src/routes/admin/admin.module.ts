import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { DelPostService } from './services/delpost.service';
import { UserModule } from '../users/user.module';

@Module({
  imports: [UserModule],
  controllers: [AdminController],
  providers: [DelPostService],
})
export class AdminModule {}
