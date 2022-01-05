import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { JwtPayload } from './jwt-auth.strategy';
import * as config from 'config';

const jwtConfig = config.get('jwt');
const refreshConfig = config.get('refresh');
@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  getAccessToken(user: User) {
    const payload: JwtPayload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: Number(jwtConfig.expiresIn) * 1000,
    };
  }

  getRefreshToken(user: User) {
    const payload: JwtPayload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload, {
      secret: jwtConfig.secret,
      expiresIn: refreshConfig.expiresIn,
    });
    return {
      refreshToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: Number(refreshConfig.expiresIn) * 1000,
    };
  }
}
