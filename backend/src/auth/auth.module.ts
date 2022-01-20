import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { GoogleOauthStrategy } from './strategies/google-oauth.strategy';
import { KakaoOauthStrategy } from './strategies/kakao-oauth.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: Number(configService.get('JWT_EXPIRES')),
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
