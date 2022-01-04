import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './jwt-auth.service';
import { JwtAuthStrategy } from './jwt-auth.strategy';
import * as config from 'config';
const jwtConfig = config.get('jwt');
@Module({
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
      inject: [ConfigService],
    }),
  ],
  providers: [JwtAuthStrategy, JwtAuthService],
  exports: [JwtModule, JwtAuthService],
})
export class JwtAuthModule {}
