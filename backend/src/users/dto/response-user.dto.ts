import { Cat } from 'src/cat/cat.entity';

export class ResponseUserDto {
  user: {
    name: string;
    username: string;
    cat: Cat[];
  };
}
