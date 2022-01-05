import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { GoogleOauthGuard } from './google-oauth.guard';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(private jwtAuthService: JwtAuthService, private userService: UsersService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() _req) {}

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const { accessToken, ...accessOption } = this.jwtAuthService.getAccessToken(user);
    const { refreshToken, ...refreshOption } = this.jwtAuthService.getRefreshToken(user);
    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    res.cookie('jwt', accessToken, accessOption);
    res.cookie('Refresh', refreshToken, refreshOption);
    return res.redirect('http://localhost:3000/');
  }
}
