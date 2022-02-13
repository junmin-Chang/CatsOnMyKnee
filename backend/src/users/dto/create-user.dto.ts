import { Provider } from 'src/types/user';

export class CreateUserDto {
  provider: Provider;
  providerId: string;
  username: string;
  name: string;
  profileImage: string;
}
