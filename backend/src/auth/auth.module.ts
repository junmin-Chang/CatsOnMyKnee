import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { GoogleOauthModule } from './google/google-oauth.module';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { KakaoOauthModule } from './kakao/kakao-oauth.module';

@Module({
  controllers: [],
  imports: [UsersModule, PassportModule, GoogleOauthModule, KakaoOauthModule, JwtAuthModule],
})
export class AuthModule {}
