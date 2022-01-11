import { Injectable, Logger } from '@nestjs/common';
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
  private logger = new Logger('CatService');
  async enrollCat(createCatDto: CreateCatDto, user: User): Promise<any> {
    this.catRepository.enrollCat(createCatDto, user);
  }

  async getCatInfo(name: string, user: User) {
    this.logger.verbose(`user : ${JSON.stringify(user)}`);
    return await this.catRepository.findOne({ where: { name, user } });
  }

  async deleteCat(name: string, user: User) {
    return await this.catRepository.delete({ name, user });
  }
}
