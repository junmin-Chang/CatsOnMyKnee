import { Provider } from 'src/types/user';
import { EntityRepository, FindManyOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUserById(id: string): Promise<any> {
    const user = await this.findOne(id);

    return user;
  }

  async findUserByProvider(provider: Provider, providerId: string) {
    return this.findOne({ where: { provider, providerId } });
  }

  async findAll(params: FindManyOptions<User> = {}) {
    return this.find(params);
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return await this.save(user);
  }
}
