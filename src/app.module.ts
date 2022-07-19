import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './routes/users/user.module';
import { AuthModule } from './routes/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './routes/posts/post.module';
import { AdminModule } from './routes/admin/admin.module';
import { databaseUrl } from './environment/environment';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PostModule,
    AdminModule,
    MongooseModule.forRoot(databaseUrl),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
