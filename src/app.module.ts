import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './routes/users/user.module';
import { AuthModule } from './routes/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './routes/posts/post.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PostModule,
    /*MongooseModule.forRoot(
      'mongodb+srv://admin:TWBYJ6KA7o5WZGFx@forumecho.pgc3t9e.mongodb.net/users?retryWrites=true&w=majority',
    ),*/
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
