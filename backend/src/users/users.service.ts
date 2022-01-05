import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from 'src/types/user';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(user: CreateUserDto) {
    return this.userRepository.save(user);
  }
  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    const { name, username } = user;

    return {
      name,
      username,
    };
  }
  findOneByProvider(provider: Provider, providerId: string) {
    return this.userRepository.findOne({ where: { provider, providerId } });
  }
  findAll(params: FindManyOptions<User> = {}) {
    return this.userRepository.find(params);
  }
}
