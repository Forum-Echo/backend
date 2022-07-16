import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { DelPostService } from './services/delpost.service';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [DelPostService],
})
export class AdminModule {}
