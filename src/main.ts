import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

const httpsOptions = {
  key: fs.readFileSync('src/modules/environment/ssl/key.pem'),
  intermediate: fs.readFileSync('src/modules/environment/ssl/intermediate.pem'),
  cert: fs.readFileSync('src/modules/environment/ssl/cert.pem'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true, httpsOptions });
  process.env['NODE_TLS_REJECT_UNAUTHORIZED=0'] = String(0);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
