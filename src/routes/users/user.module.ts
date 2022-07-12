import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { LoginService } from './services/login.service';
import { AuthModule } from '../auth/auth.module';
import { RegisterService } from './services/register.service';
import { EditUserService } from './services/edituser.service';
import { GetUserService } from './services/getuser.service';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [LoginService, RegisterService, EditUserService, GetUserService],
  exports: [LoginService],
})
export class UserModule {}
