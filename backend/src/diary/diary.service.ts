import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatRepository } from 'src/cat/cat.repository';
import { DiaryRepository } from './diary.repository';
import { CreateDiaryDto } from './dto/create-diary.dto';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(DiaryRepository)
    private diaryRepository: DiaryRepository,
    @InjectRepository(CatRepository)
    private catRepository: CatRepository,
  ) {}
  private logger = new Logger('DiaryService');
  async createDiary(createDiaryDto: CreateDiaryDto, name: string): Promise<any> {
    const cat = await this.catRepository.findOne({ name });

    return await this.diaryRepository.createDiary(createDiaryDto, cat);
  }

  async getDiary(name: string, id: string): Promise<any> {
    const cat = await this.catRepository.findOne({ name });
    return await this.diaryRepository.findOne({ where: { id, cat } });
  }
  async deleteDiary(name: string, id: string): Promise<any> {
    const cat = await this.catRepository.findOne({ name });
    return await this.diaryRepository.delete({ id, cat });
  }
}
