import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  getAccessToken(user: User) {
    const payload = { id: user.id, username: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: 600 * 1000,
      signed: true,
      secure: true,
    };
  }

  getRefreshToken(user: User) {
    const payload = { id: user.id, username: user.username };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: 1209600,
    });
    return {
      refreshToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: 1209600 * 1000,
      signed: true,
      secure: true,
    };
  }
}
