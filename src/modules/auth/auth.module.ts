import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserStrategy } from './strategy/user.strategy';
import * as dotenv from 'dotenv';
import { VerifyStrategy } from './strategy/verify.strategy';
import { MailModule } from '../mail/mail.module';

dotenv.config({
  path: 'src/modules/environment/config/dev.env',
});

@Module({
  imports: [
    AuthModule,
    forwardRef(() => UserModule),
    PassportModule,
    MailModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserStrategy,
    VerifyStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
