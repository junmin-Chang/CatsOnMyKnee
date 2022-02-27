import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { config as awsConfig } from 'aws-sdk';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
async function bootstrap() {
  const isDev = process.env.NODE_ENV === 'development';
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: isDev
      ? 'http://localhost:3000'
      : ['https://catsonmyknee.kro.kr', 'https://www.catsonmyknee.kro.kr'],
    credentials: true,
  });

  app.use(cookieParser('dsakfjdsalfjoasi'));
  app.useGlobalFilters(new HttpExceptionFilter());
  const port = process.env.PORT || 8000;

  awsConfig.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
  });

  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
