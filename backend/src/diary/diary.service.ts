import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatRepository } from 'src/cat/cat.repository';
import { Diary } from './diary.entity';
import { DiaryRepository } from './diary.repository';
import { CreateDiaryDto } from './dto/create-diary.dto';

@Injectable()
export class DiaryService {
  private logger = new Logger();
  constructor(
    @InjectRepository(DiaryRepository)
    private diaryRepository: DiaryRepository,
    @InjectRepository(CatRepository)
    private catRepository: CatRepository,
  ) {}
  async createDiary(
    createDiaryDto: CreateDiaryDto,
    name: string,
  ): Promise<Diary> {
    const cat = await this.catRepository.findOne({ name });

    return await this.diaryRepository.createDiary(createDiaryDto, cat);
  }

  async getDiaries(name: string): Promise<any> {
    const cat = await this.catRepository.findOne({ name });
    this.logger.verbose(`Cat: ${JSON.stringify(cat)}`);

    const diaries = await this.diaryRepository.find({ where: { cat } });
    this.logger.verbose(`Diary: ${JSON.stringify(diaries)}`);

    return diaries;
  }

  async getDiary(name: string, id: string): Promise<Diary> {
    const cat = await this.catRepository.findOne({ name });
    return await this.diaryRepository.findOne({ where: { id, cat } });
  }
  async deleteDiary(name: string, id: string): Promise<any> {
    const cat = await this.catRepository.findOne({ name });
    return await this.diaryRepository.deleteDiary(cat, id);
  }
}
