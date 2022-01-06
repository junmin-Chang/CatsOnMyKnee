import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { GoogleOauthStrategy } from './strategies/google-oauth.strategy';
import { KakaoOauthStrategy } from './strategies/kakao-oauth.strategy';
import { forwardRef } from '@nestjs/common';
const jwtConfig = config.get('jwt');

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: jwtConfig.secret || process.env.JWT_SECRET,
          signOptions: {
            expiresIn: jwtConfig.expiresIn || process.env.JWT_EXPIRES_IN,
          },
        };
      },
    }),
    UsersModule,
    PassportModule,
  ],
  providers: [AuthService, JwtAuthStrategy, JwtRefreshStrategy, GoogleOauthStrategy, KakaoOauthStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
