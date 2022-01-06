import { Exclude } from 'class-transformer';
import { Diary } from 'src/diary/diary.entity';
import { Provider } from 'src/types/user';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  provider: Provider;

  @Column({ nullable: false })
  providerId: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany((type) => Diary, (diary) => diary.user, { eager: true })
  diary: Diary[];

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  @Exclude()
  currentHashedRefreshToken?: string;
}
