import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { LoginService } from './services/login.service';
import { AuthModule } from '../auth/auth.module';
import { RegisterService } from './services/register.service';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [LoginService, RegisterService],
  exports: [LoginService],
})
export class UserModule {}
