import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as config from 'config';
import { Request } from 'express';

const jwtConfig = config.get('jwt');
@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.signedCookies?.jwt;
        },
      ]),
      secretOrKey: jwtConfig.secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any, done: Function) {
    const user = { id: payload.id, username: payload.username };
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    done(null, user);
  }
}
