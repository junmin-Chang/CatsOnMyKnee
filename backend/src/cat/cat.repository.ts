import { Logger } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';

@EntityRepository(Cat)
export class CatRepository extends Repository<Cat> {
  async enrollCat(createCatDto: CreateCatDto, user: User): Promise<any> {
    const logger = new Logger();
    const { name, age, breed, hate, favorite, gender, startDate } =
      createCatDto;
    const cat = this.create({
      name,
      age,
      breed,
      user,
      gender,
      favorite,
      hate,
      startDate,
      diary: [],
    });

    await this.save(cat);

    logger.verbose(`CREATED: ${JSON.stringify(cat)}`);
    return cat;
  }
}
