import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from 'src/types/user';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { hash, compare } from 'bcryptjs';
import { ResponseUserDto } from './dto/response-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  createUser(user: CreateUserDto) {
    return this.userRepository.createUser(user);
  }

  async getUserInfo(user: User): Promise<ResponseUserDto> {
    const userInfo = await this.userRepository.findUserById(user.id);
    const { username, name, cat } = userInfo;

    return {
      user: {
        username,
        name,
        cat,
      },
    };
  }

  async getUserByProvider(provider: Provider, providerId: string) {
    return await this.userRepository.findUserByProvider(provider, providerId);
  }

  async setCurrentRefreshToken(refreshToken: string, id: string) {
    const currentHashedRefreshToken = await hash(refreshToken, 10);
    await this.userRepository.update(id, { currentHashedRefreshToken });
  }
  async getUserIfRefreshTokenMatches(refreshToken: string, id: string) {
    const user = await this.userRepository.findUserById(id);
    console.log(user);

    const isRefreshTokenMatching = await compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

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
