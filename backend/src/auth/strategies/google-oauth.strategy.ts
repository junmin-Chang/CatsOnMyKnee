import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:8000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }
  async validate(_accessToken: string, _refreshToken: string, profile: Profile) {
    const { id, name, emails } = profile;
    let user = await this.usersService.findOneByProvider('google', id);
    if (!user) {
      user = await this.usersService.create({
        provider: 'google',
        providerId: id,
        name: name.givenName,
        username: emails[0].value,
      });
    }
    return user;
  }
}
