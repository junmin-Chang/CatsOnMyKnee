import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './jwt-auth.service';
import { JwtAuthStrategy } from './jwt-auth.strategy';
import * as config from 'config';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { UsersModule } from 'src/users/users.module';
import { forwardRef } from '@nestjs/common';
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
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [JwtAuthStrategy, JwtAuthService, JwtRefreshStrategy],
  exports: [JwtModule, JwtAuthService],
})
export class JwtAuthModule {}
