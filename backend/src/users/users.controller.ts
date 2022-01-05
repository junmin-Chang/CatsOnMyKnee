import { Controller, Get, Logger, Req, Res, UseGuards, Inject, forwardRef } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { JwtAuthService } from 'src/auth/jwt/jwt-auth.service';
import { JwtRefreshGuard } from 'src/auth/jwt/jwt-refresh.guard';
import { ResponseUserDto } from './dto/response-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private logger = new Logger('UserController');
  constructor(private readonly userService: UsersService, private jwtAuthService: JwtAuthService) {}

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
    const { accessToken, ...accessOption } = this.jwtAuthService.getAccessToken(user);
    res.cookie('jwt', accessToken, accessOption);
    return await this.userService.getUserInfo(user);
  }
}
