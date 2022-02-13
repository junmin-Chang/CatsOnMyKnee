import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from 'src/types/user';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { hash, compare } from 'bcryptjs';
import { ResponseUserDto } from './dto/response-user.dto';
import { UserRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private uploadService: UploadService,
  ) {}

  createUser(user: any) {
    return this.userRepository.createUser(user);
  }

  async getUserInfo(user: User): Promise<ResponseUserDto> {
    const userInfo = await this.userRepository.findUserById(user.id);
    const { username, name, profileImage } = userInfo;

    return {
      user: {
        username,
        name,
        profileImage,
      },
    };
  }
  async uploadUserImage(
    user: User,
    imageBuffer: Buffer,
    filename: string,
  ): Promise<any> {
    const image = await this.uploadService.uploadImage(imageBuffer, filename);
    const prevImage = user.profileImage;

    if (prevImage) {
      await this.deleteImage(user);
    }
    await this.userRepository.update(user, {
      ...user,
      profileImage: image,
    });
  }
  async deleteImage(user: User) {
    const fileId = user.profileImage.id;
    if (fileId) {
      await this.userRepository.update(user, {
        profileImage: null,
      });
    }
    await this.uploadService.deleteImage(fileId);
  }

  async updateUserInfo(user: User, updateUserDto: UpdateUserDto): Promise<any> {
    const { name } = updateUserDto;

    this.userRepository.update(user, {
      name,
    });
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
