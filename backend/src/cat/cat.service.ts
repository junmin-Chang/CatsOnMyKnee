import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { CatRepository } from './cat.repository';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(CatRepository)
    private catRepository: CatRepository,
  ) {}
  async enrollCat(createCatDto: CreateCatDto, user: User): Promise<any> {
    this.catRepository.enrollCat(createCatDto, user);
  }
}
