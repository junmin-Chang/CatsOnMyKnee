import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from 'src/types/user';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { hash, compare } from 'bcryptjs';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(user: CreateUserDto) {
    return this.userRepository.save(user);
  }
  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }
  findOneByProvider(provider: Provider, providerId: string) {
    return this.userRepository.findOne({ where: { provider, providerId } });
  }
  findAll(params: FindManyOptions<User> = {}) {
    return this.userRepository.find(params);
  }

  async getUserInfo(user: User): Promise<ResponseUserDto> {
    const userInfo = await this.findOne(user.id);
    const { username, name, cat } = userInfo;

    return {
      user: {
        username,
        name,
        cat,
      },
    };
  }
  async setCurrentRefreshToken(refreshToken: string, id: string) {
    const currentHashedRefreshToken = await hash(refreshToken, 10);
    await this.userRepository.update(id, { currentHashedRefreshToken });
  }
  async getUserIfRefreshTokenMatches(refreshToken: string, id: string) {
    const user = await this.findOne(id);
    console.log(user);

    const isRefreshTokenMatching = await compare(refreshToken, user.currentHashedRefreshToken);

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(id: string) {
    return await this.userRepository.update(id, {
      currentHashedRefreshToken: null,
    });
  }
}
