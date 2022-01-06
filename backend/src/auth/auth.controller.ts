import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { KakaoOauthGuard } from './guards/kakao-oauth.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  private logger = new Logger('AuthController');
  @Get('/google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() _req) {}

  @Get('/google/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    this.logger.verbose(`google req.user ${JSON.stringify(user)}`);
    const { accessToken, ...accessOption } = this.authService.getAccessToken(user);
    const { refreshToken, ...refreshOption } = this.authService.getRefreshToken(user);
    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    res.cookie('jwt', accessToken, accessOption);
    res.cookie('Refresh', refreshToken, refreshOption);
    return res.redirect('http://localhost:3000/');
  }

  @Get('/kakao')
  @UseGuards(KakaoOauthGuard)
  async kakaoAuth(@Req() _req) {}

  @Get('/kakao/redirect')
  @UseGuards(KakaoOauthGuard)
  async kakaoAuthRedirect(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    this.logger.verbose(`kakao req.user ${JSON.stringify(user)}`);

    const { accessToken, ...accessOption } = this.authService.getAccessToken(user);
    const { refreshToken, ...refreshOption } = this.authService.getRefreshToken(user);
    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    res.cookie('jwt', accessToken, accessOption);
    res.cookie('Refresh', refreshToken, refreshOption);
    return res.redirect('http://localhost:3000/');
  }
}
