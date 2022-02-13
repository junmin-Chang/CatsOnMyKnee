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
      callbackURL: 'http://localhost:8000/auth/kakao/redirect',
    });
  }
  async validate(_accessToken: string, _refreshToken: string, profile: any) {
    const { id, _json } = profile;
    console.log(profile);

    let user = await this.usersService.getUserByProvider('kakao', id);
    if (!user) {
      user = await this.usersService.createUser({
        provider: 'kakao',
        providerId: id,
        name: _json.properties.nickname,
        username: _json.kakao_account.email,
        profileImage: _json.properties.thumbnail_image,
      });
    }
    return user;
  }
}
