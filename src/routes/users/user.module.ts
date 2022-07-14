import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { LoginService } from './services/login.service';
import { AuthModule } from '../auth/auth.module';
import { RegisterService } from './services/register.service';
import { EditUserService } from './services/edituser.service';
import { GetUserService } from './services/getuser.service';
import { UserStrategy } from '../auth/strategy/user.strategy';
import { DelUserService } from './services/deluser.service';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    DelUserService,
    LoginService,
    RegisterService,
    EditUserService,
    GetUserService,
    UserStrategy,
  ],
  exports: [LoginService],
})
export class UserModule {}
