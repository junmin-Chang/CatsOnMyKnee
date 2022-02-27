import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class KakaoOauthStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_SECRET,
      callbackURL: process.env.NODE_ENV
        ? 'http://localhost:8000/auth/kakao/redirect'
        : process.env.BASE_URL + '/auth/kakao/redirect',
    });
  }
  async validate(_accessToken: string, _refreshToken: string, profile: any) {
    const { id, _json } = profile;

    let user = await this.usersService.getUserByProvider('kakao', id);
    if (!user) {
      user = await this.usersService.createUser({
        provider: 'kakao',
        providerId: id,
        name: _json.properties.nickname,
        username: _json.kakao_account.email,
      });
    }
    return user;
  }
}
