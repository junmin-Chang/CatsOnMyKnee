import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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
  @Post('/enroll')
  @UsePipes(ValidationPipe)
  async enrollCat(@Body() createCatDto: CreateCatDto, @GetUser() user: User): Promise<any> {
    this.catService.enrollCat(createCatDto, user);
  }
}
