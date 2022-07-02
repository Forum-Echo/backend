import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { LoginService } from './services/login.service';
import { AuthModule } from '../auth/auth.module';
import { RegisterService } from './services/register.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';
import { Hash } from '../../utils/hash';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [LoginService, RegisterService, Hash],
  exports: [LoginService],
})
export class UserModule {}
