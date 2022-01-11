import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiaryRepository } from './diary.repository';
import { CreateDiaryDto } from './dto/create-diary.dto';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(DiaryRepository)
    private diaryRepository: DiaryRepository,
  ) {}
  async createDiary(createDiaryDto: CreateDiaryDto): Promise<any> {
    return this.diaryRepository.createDiary(createDiaryDto);
  }
}
