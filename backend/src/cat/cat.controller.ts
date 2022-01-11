import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/user.entity';
import { Cat } from './cat.entity';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cat')
export class CatController {
  constructor(private catService: CatService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':name')
  async getCatInfo(@GetUser() user: User, @Param('name') name: string) {
    return await this.catService.getCatInfo(decodeURIComponent(name), user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':name')
  async deleteCat(@GetUser() user: User, @Param('name') name: string) {
    return await this.catService.deleteCat(decodeURIComponent(name), user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/enroll')
  @UsePipes(ValidationPipe)
  async enrollCat(@Body() createCatDto: CreateCatDto, @GetUser() user: User): Promise<any> {
    return this.catService.enrollCat(createCatDto, user);
  }
}
