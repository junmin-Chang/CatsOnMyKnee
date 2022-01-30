import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DiaryModule } from './diary/diary.module';
import { CatModule } from './cat/cat.module';
import { UploadModule } from './upload/upload.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_KEY: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        AWS_S3_BUCKET_NAME: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PORT: Joi.number().required().default(8000),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_SECRET: Joi.string().required(),
        KAKAO_CLIENT_ID: Joi.string().required(),
        KAKAO_SECRET: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot(typeORMConfig),
    UsersModule,
    AuthModule,
    DiaryModule,
    CatModule,
    UploadModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
