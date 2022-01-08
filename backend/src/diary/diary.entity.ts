import { Cat } from 'src/cat/cat.entity';
import { User } from 'src/users/user.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DiaryFeeling } from './diary-feeling.enum';

@Entity()
export class Diary extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  feeling: DiaryFeeling;

  @ManyToOne((type) => User, (user) => user.diary, { eager: false })
  user: User;

  @ManyToOne((type) => Cat, (cat) => cat.diary, { eager: false })
  cat: Cat;

  @CreateDateColumn()
  @Column()
  created_at: Date;
}
