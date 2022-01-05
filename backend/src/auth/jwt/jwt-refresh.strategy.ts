import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import * as config from 'config';

const refreshConfig = config.get('refresh');

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: refreshConfig.secret,
      passReqToCallback: true,
    });
  }
  async validate(req, payload: any) {
    const refreshToken = req.cookies?.Refresh;
    return this.userService.getUserIfRefreshTokenMatches(refreshToken, payload.id);
  }
}
