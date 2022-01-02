import { Body, Controller, Get, Logger, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Cat } from './cat.entity';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cat')
@UseGuards(AuthGuard())
export class CatController {
  private logger = new Logger('CatController');
  constructor(private catService: CatService) {}

  @Get()
  getAllCat(@GetUser() user: User): Promise<Cat[]> {
    return this.catService.getAllCats(user);
  }

  @Post('/enroll')
  @UsePipes(ValidationPipe)
  createCat(@Body() createCatDto: CreateCatDto, @GetUser() user: User): Promise<Cat> {
    this.logger.verbose(`User ${user.username} is trying to create cat ${JSON.stringify(createCatDto)}`);
    return this.catService.createCat(createCatDto, user);
  }
}
