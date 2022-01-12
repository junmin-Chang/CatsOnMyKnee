import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';

@Controller('diary')
export class DiaryController {
  constructor(private diaryService: DiaryService) {}
  @Post(':name')
  @UsePipes(ValidationPipe)
  createDiary(@Body() createDiaryDto: CreateDiaryDto, @Param('name') name: string): Promise<any> {
    return this.diaryService.createDiary(createDiaryDto, name);
  }
}
