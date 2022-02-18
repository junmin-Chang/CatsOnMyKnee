import { Exclude } from 'class-transformer';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Diary } from 'src/diary/diary.entity';
import { UploadImage } from 'src/upload/upload.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CatGender } from './cat-gender.enum';

@Entity()
export class Cat extends CommonEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  breed: string;

  @Column({ nullable: false })
  age: string;

  @Column({ nullable: false })
  gender: CatGender;

  @Column('simple-array', { nullable: true })
  favorite: string[];

  @Column('simple-array', { nullable: true })
  hate: string[];

  @Column({ nullable: false, type: 'date' })
  startDate: string;

  @Exclude({ toPlainOnly: true })
  @ManyToOne((type) => User, (user) => user.cat, { eager: false })
  user: User;

  @Exclude()
  @OneToMany((type) => Diary, (diary) => diary.cat, {
    eager: false,
    nullable: true,
  })
  diary: Diary[];

  @OneToOne(() => UploadImage, {
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  public image?: UploadImage;
}
