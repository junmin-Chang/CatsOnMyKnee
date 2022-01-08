import { Diary } from 'src/diary/diary.entity';
import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  breed: string;

  @Column()
  age: string;

  @ManyToOne((type) => User, (user) => user.cat, { eager: false })
  user: User;

  @OneToMany((type) => Diary, (diary) => diary.cat, { eager: true })
  diary: Diary[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
