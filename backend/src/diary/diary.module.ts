import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryController } from './diary.controller';
import { DiaryRepository } from './diary.repository';
import { DiaryService } from './diary.service';

@Module({
  imports: [TypeOrmModule.forFeature([DiaryRepository])],
  controllers: [DiaryController],
  providers: [DiaryService],
})
export class DiaryModule {}
