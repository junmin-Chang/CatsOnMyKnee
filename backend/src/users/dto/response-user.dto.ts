import { Cat } from 'src/cat/cat.entity';

export class ResponseUserDto {
  name: string;
  username: string;
  cat: Cat[];
}
