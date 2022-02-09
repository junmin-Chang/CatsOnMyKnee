import { Exclude } from 'class-transformer';
import { Diary } from 'src/diary/diary.entity';
import { UploadImage } from 'src/upload/upload.entity';
import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CatGender } from './cat-gender.enum';

@Entity()
export class Cat extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  breed: string;

  @Column({ nullable: false })
  age: string;

  @Column({ nullable: false })
  gender: CatGender;

  @Column({ nullable: true })
  favorite: string;

  @Column({ nullable: true })
  hate: string;

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

  @Exclude({ toPlainOnly: true })
  @CreateDateColumn()
  created_at: Date;

  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn()
  updated_at: Date;
}
