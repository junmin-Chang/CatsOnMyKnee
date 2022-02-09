import { Cat } from 'src/cat/cat.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Diary } from './diary.entity';
import { CreateDiaryDto } from './dto/create-diary.dto';

@EntityRepository(Diary)
export class DiaryRepository extends Repository<Diary> {
  async createDiary(createDiaryDto: CreateDiaryDto, cat: Cat): Promise<any> {
    const { title, description, feeling, date } = createDiaryDto;
    const diary = this.create({
      title,
      description,
      feeling,
      date,
      cat,
    });
    await this.save(diary);
    return diary;
  }

  async deleteDiary(cat: Cat, id: string): Promise<any> {
    return await this.delete({ id, cat });
  }
}
