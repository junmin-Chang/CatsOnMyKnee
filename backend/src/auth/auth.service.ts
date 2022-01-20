import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

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
      maxAge: Number(process.env.JWT_EXPIRES) * 1000,
      signed: true,
      secure: true,
    };
  }

  getRefreshToken(user: User) {
    const payload = { id: user.id, username: user.username };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.REFRESH_EXPIRES,
    });
    return {
      refreshToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_EXPIRES) * 1000,
      signed: true,
      secure: true,
    };
  }
}
