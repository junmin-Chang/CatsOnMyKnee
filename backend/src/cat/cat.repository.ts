import { User } from 'src/users/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';

@EntityRepository(Cat)
export class CatRepository extends Repository<Cat> {
  async enrollCat(createCatDto: CreateCatDto, user: User): Promise<any> {
    const { name, age, breed, hate, favorite, gender } = createCatDto;
    const cat = this.create({
      name,
      age,
      breed,
      user,
      gender,
      favorite,
      hate,
    });

    await this.save(cat);

    return {
      success: true,
    };
  }
}
