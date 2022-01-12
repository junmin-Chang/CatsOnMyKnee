import { Cat } from 'src/cat/cat.entity';
import { User } from 'src/users/user.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DiaryFeeling } from './diary-feeling.enum';

@Entity()
export class Diary extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  feeling: DiaryFeeling;

  @Column({ nullable: false })
  date: string;

  @ManyToOne((type) => Cat, (cat) => cat.diary, { eager: false })
  cat: Cat;

  @CreateDateColumn()
  created_at: Date;
}
