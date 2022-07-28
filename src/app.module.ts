import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './modules/posts/post.module';
import { AdminModule } from './modules/admin/admin.module';
import { databaseUrl } from './environment/environment';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PostModule,
    AdminModule,
    MongooseModule.forRoot(databaseUrl),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
