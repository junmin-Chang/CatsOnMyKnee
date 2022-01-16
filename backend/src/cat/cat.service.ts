import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadService } from 'src/upload/upload.service';
import { User } from 'src/users/user.entity';
import { CatRepository } from './cat.repository';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(CatRepository)
    private catRepository: CatRepository,
    private readonly uploadService: UploadService,
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

  async updateCat(name: string, user: User, updateCatDto: UpdateCatDto) {
    return await this.catRepository.update(
      { name, user },
      {
        ...updateCatDto,
      },
    );
  }
  async uploadImage(name: string, user: User, imageBuffer: Buffer, filename: string) {
    const image = await this.uploadService.uploadImage(imageBuffer, filename);
    const cat = await this.catRepository.findOne({ name, user });
    const { id } = cat;
    await this.catRepository.update(
      { id },
      {
        image,
      },
    );
    return image;
  }
}
