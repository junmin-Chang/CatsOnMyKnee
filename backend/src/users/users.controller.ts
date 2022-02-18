import {
  Body,
  Controller,
  Get,
  Logger,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseUserDto } from './dto/response-user.dto';
import { UsersService } from './users.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  private logger = new Logger('UserController');
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@GetUser() user: User): Promise<ResponseUserDto> {
    return await this.userService.getUserInfo(user);
  }

  @Post('/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserImage(
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    return await this.userService.uploadUserImage(
      user,
      file.buffer,
      file.originalname,
    );
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async editUserInfo(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return await this.userService.updateUserInfo(user, updateUserDto);
  }
}
