import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';
import { config as awsConfig } from 'aws-sdk';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.use(cookieParser('dsakfjdsalfjoasi'));
  app.useGlobalFilters(new HttpExceptionFilter());
  const serverConfig = config.get('server');
  const port = serverConfig.port;

  awsConfig.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
  });

  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
