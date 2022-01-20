import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(private readonly userService: UsersService, readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.signedCookies?.Refresh;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }
  async validate(req, payload: any) {
    const refreshToken = req.signedCookies?.Refresh;
    return this.userService.getUserIfRefreshTokenMatches(refreshToken, payload.id);
  }
}
