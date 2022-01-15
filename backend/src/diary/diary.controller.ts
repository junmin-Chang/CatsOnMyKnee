import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';

@Controller('diary')
export class DiaryController {
  constructor(private diaryService: DiaryService) {}
  @Post(':name')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  createDiary(@Body() createDiaryDto: CreateDiaryDto, @Param('name') name: string): Promise<any> {
    return this.diaryService.createDiary(createDiaryDto, name);
  }

  @Get(':name/:id')
  @UseGuards(JwtAuthGuard)
  getDiary(@Param('name') name: string, @Param('id') id: string): Promise<any> {
    return this.diaryService.getDiary(name, id);
  }

  @Delete(':name/:id')
  @UseGuards(JwtAuthGuard)
  deleteDiary(@Param('name') name: string, @Param('id') id: string): Promise<any> {
    return this.diaryService.deleteDiary(name, id);
  }
}
