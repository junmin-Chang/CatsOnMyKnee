import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';

@EntityRepository(Cat)
export class CatRepository extends Repository<Cat> {
  async createCat(createCatDto: CreateCatDto, user: User): Promise<Cat> {
    const { name, age, gender, breed } = createCatDto;
    const cat = this.create({
      name,
      age,
      gender,
      user,
      breed,
    });
    await this.save(cat);

    return cat;
  }
}
