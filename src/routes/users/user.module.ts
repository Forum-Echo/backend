import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { RegisterService } from './services/register.service';
import { UserService } from './services/user.service';
import { UserStrategy } from '../auth/strategy/user.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [RegisterService, UserService, UserStrategy],
  exports: [UserService],
})
export class UserModule {}
