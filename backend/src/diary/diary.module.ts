import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatRepository } from 'src/cat/cat.repository';
import { DiaryController } from './diary.controller';
import { DiaryRepository } from './diary.repository';
import { DiaryService } from './diary.service';

@Module({
  imports: [TypeOrmModule.forFeature([DiaryRepository, CatRepository])],
  controllers: [DiaryController],
  providers: [DiaryService],
})
export class DiaryModule {}
