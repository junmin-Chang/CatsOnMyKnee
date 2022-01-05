import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { KakaoOauthGuard } from './kakao-oauth.guard';

@Controller('auth/kakao')
export class KakaoOauthController {
  constructor(private jwtAuthService: JwtAuthService, private userService: UsersService) {}

  @Get()
  @UseGuards(KakaoOauthGuard)
  async kakaoAuth(@Req() _req) {}

  @Get('redirect')
  @UseGuards(KakaoOauthGuard)
  async kakaoAuthRedirect(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const { accessToken, ...accessOption } = this.jwtAuthService.getAccessToken(user);
    const { refreshToken, ...refreshOption } = this.jwtAuthService.getRefreshToken(user);
    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    res.cookie('jwt', accessToken, accessOption);
    res.cookie('Refresh', refreshToken, refreshOption);
    return res.redirect('http://localhost:3000/');
  }
}
