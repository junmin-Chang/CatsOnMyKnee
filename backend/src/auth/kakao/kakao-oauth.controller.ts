import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { KakaoOauthGuard } from './kakao-oauth.guard';

@Controller('auth/kakao')
export class KakaoOauthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(KakaoOauthGuard)
  async kakaoAuth(@Req() _req) {}

  @Get('redirect')
  @UseGuards(KakaoOauthGuard)
  async kakaoAuthRedirect(@Req() req, @Res() res: Response) {
    const { accessToken } = this.jwtAuthService.login(req.user);
    res.cookie('jwt', accessToken);
    return res.redirect('http://localhost:3000/');
  }
}
