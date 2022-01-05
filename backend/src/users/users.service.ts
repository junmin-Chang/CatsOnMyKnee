import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from 'src/types/user';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { hash, compare } from 'bcryptjs';

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
    return this.userRepository.findOne(id);
  }
  findOneByProvider(provider: Provider, providerId: string) {
    return this.userRepository.findOne({ where: { provider, providerId } });
  }
  findAll(params: FindManyOptions<User> = {}) {
    return this.userRepository.find(params);
  }
  async setCurrentRefreshToken(refreshToken: string, id: number) {
    const currentHashedRefreshToken = await hash(refreshToken, 10);
    await this.userRepository.update(id, { currentHashedRefreshToken });
  }
  async getUserIfRefreshTokenMatches(refreshToken: string, id: number) {
    const user = await this.findOne(id);

    const isRefreshTokenMatching = await compare(refreshToken, user.currentHashedRefreshToken);

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(id: number) {
    return this.userRepository.update(id, {
      currentHashedRefreshToken: null,
    });
  }
}
