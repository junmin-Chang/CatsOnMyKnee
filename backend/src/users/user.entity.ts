import { Exclude } from 'class-transformer';
import { Cat } from 'src/cat/cat.entity';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Provider } from 'src/types/user';
import { UploadImage } from 'src/upload/upload.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

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

  @Column({ nullable: true })
  bio: string;

  @OneToMany((type) => Cat, (cat) => cat.user, { eager: true })
  cat: Cat[];

  @Column({ nullable: true })
  @Exclude()
  currentHashedRefreshToken?: string;

  @OneToOne(() => UploadImage, {
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  public profileImage?: UploadImage;
}
