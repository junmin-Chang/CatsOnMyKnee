import { Controller, Get, Logger, Req, Res, UseGuards, Inject, forwardRef } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtRefreshGuard } from 'src/auth/guards/jwt-refresh.guard';
import { AuthService } from 'src/auth/auth.service';
import { ResponseUserDto } from './dto/response-user.dto';
import { UsersService } from './users.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  private logger = new Logger('UserController');
  constructor(private readonly userService: UsersService, private authService: AuthService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@GetUser() user: User): Promise<ResponseUserDto> {
    return await this.userService.getUserInfo(user);
  }
}
