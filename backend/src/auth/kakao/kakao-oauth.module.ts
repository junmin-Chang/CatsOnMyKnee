import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { JwtAuthModule } from '../jwt/jwt-auth.module';
import { KakaoOauthController } from './kakao-oauth.controller';
import { KakaoOauthStrategy } from './kakao-oauth.strategy';

@Module({
  imports: [UsersModule, JwtAuthModule],
  controllers: [KakaoOauthController],
  providers: [KakaoOauthStrategy],
})
export class KakaoOauthModule {}
