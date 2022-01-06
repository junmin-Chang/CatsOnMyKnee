import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as config from 'config';
import { User } from 'src/users/user.entity';

const jwtConfig = config.get('jwt');
const refreshConfig = config.get('refresh');

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  getAccessToken(user: User) {
    const payload = { id: user.id, username: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: Number(jwtConfig.expiresIn) * 1000,
    };
  }

  getRefreshToken(user: User) {
    const payload = { id: user.id, username: user.username };
    const token = this.jwtService.sign(payload, {
      secret: refreshConfig.secret,
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
