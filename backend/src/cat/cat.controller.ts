import {
  BadRequestException,
  Body,
  Delete,
  Get,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  UploadedFile,
  UseFilters,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/user.entity';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@UseInterceptors(SuccessInterceptor)
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
  @Patch(':name')
  @UsePipes(ValidationPipe)
  async updateCat(
    @GetUser() user: User,
    @Param('name') catName: string,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    const { name } = updateCatDto;
    const cat = await this.catService.getCatInfo(name, user);

    if (cat) {
      throw new BadRequestException(['이미 존재하는 고양이 이름입니다.']);
    }
    return await this.catService.updateCat(
      decodeURIComponent(catName),
      user,
      updateCatDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/enroll')
  @UsePipes(ValidationPipe)
  async enrollCat(
    @Body() createCatDto: CreateCatDto,
    @GetUser() user: User,
  ): Promise<any> {
    const { name } = createCatDto;
    const cat = await this.catService.getCatInfo(name, user);

    if (cat) {
      throw new BadRequestException(['이미 존재하는 고양이 이름입니다']);
    }
    return this.catService.enrollCat(createCatDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:name/image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @GetUser() user: User,
    @Param('name') name: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.catService.uploadImage(
      name,
      user,
      file.buffer,
      file.originalname,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:name/image')
  async deleteImage(@GetUser() user: User, @Param('name') name: string) {
    return this.catService.deleteImage(name, user);
  }
}
