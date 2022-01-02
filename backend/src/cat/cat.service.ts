import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Cat } from './cat.entity';
import { CatRepository } from './cat.repository';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(CatRepository)
    private catRepository: CatRepository,
  ) {}

  async getAllCats(user: User): Promise<Cat[]> {
    const query = this.catRepository.createQueryBuilder('cat');
    query.where('cat.userId = :userId', { userId: user.id });

    const cat = await query.getMany();

    return cat;
  }
  async createCat(createCatDto: CreateCatDto, user: User): Promise<Cat> {
    return this.catRepository.createCat(createCatDto, user);
  }
}
