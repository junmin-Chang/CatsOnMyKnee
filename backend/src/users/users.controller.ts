import { Controller, Get, Logger, Req, Res, UseGuards, Inject, forwardRef } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtRefreshGuard } from 'src/auth/guards/jwt-refresh.guard';
import { AuthService } from 'src/auth/auth.service';
import { ResponseUserDto } from './dto/response-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private logger = new Logger('UserController');
  constructor(private readonly userService: UsersService, private authService: AuthService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@Req() req): Promise<ResponseUserDto> {
    const user = req.user;
    return await this.userService.getUserInfo(user);
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(@Req() req, @Res({ passthrough: true }) res: Response): Promise<ResponseUserDto> {
    const user = req.user;
    const { accessToken, ...accessOption } = this.authService.getAccessToken(user);
    res.cookie('jwt', accessToken, accessOption);
    return await this.userService.getUserInfo(user);
  }
}
