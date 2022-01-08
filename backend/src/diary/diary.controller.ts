import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';

@Controller('diary')
export class DiaryController {
  constructor(private diaryService: DiaryService) {}
  @Post('/write')
  @UsePipes(ValidationPipe)
  createDiary(@Body() createDiaryDto: CreateDiaryDto): Promise<any> {
    return this.diaryService.createDiary(createDiaryDto);
  }
}
