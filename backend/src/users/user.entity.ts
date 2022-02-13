import { Exclude } from 'class-transformer';
import { Cat } from 'src/cat/cat.entity';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Provider } from 'src/types/user';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends CommonEntity {
  @Column({ nullable: false })
  provider: Provider;

  @Column({ nullable: false })
  providerId: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany((type) => Cat, (cat) => cat.user, { eager: true })
  cat: Cat[];

  @Column({ nullable: true })
  @Exclude()
  currentHashedRefreshToken?: string;

  @Column({ nullable: true })
  profileImage: string;
}
