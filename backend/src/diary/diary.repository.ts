import { EntityRepository, Repository } from 'typeorm';
import { Diary } from './diary.entity';
import { CreateDiaryDto } from './dto/create-diary.dto';

@EntityRepository(Diary)
export class DiaryRepository extends Repository<Diary> {
  async createDiary(createDiaryDto: CreateDiaryDto): Promise<any> {
    const { title, description, feeling } = createDiaryDto;
    const diary = this.create({
      title,
      description,
      feeling,
    });
    await this.save(diary);

    return {
      success: true,
    };
  }
}
