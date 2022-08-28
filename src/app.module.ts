import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './modules/posts/post.module';
import { AdminModule } from './modules/admin/admin.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { MailModule } from './modules/mail/mail.module';
import { CommentsModule } from './modules/comments/comments.module';
import * as dotenv from 'dotenv';

dotenv.config({
  path: 'src/modules/environment/config/dev.env',
});

@Module({
  imports: [
    UserModule,
    AuthModule,
    PostModule,
    AdminModule,
    MailModule,
    MongooseModule.forRoot(process.env.DB_URL),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30,
    }),
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
