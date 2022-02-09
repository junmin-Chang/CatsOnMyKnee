import { Exclude } from 'class-transformer';
import { Cat } from 'src/cat/cat.entity';
import { CommonEntity } from 'src/common/entities/common.entity';
import { User } from 'src/users/user.entity';
import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';
import { DiaryFeeling } from './diary-feeling.enum';

@Entity()
export class Diary extends CommonEntity {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  feeling: DiaryFeeling;

  @Column({ nullable: false })
  date: string;

  @Exclude({ toPlainOnly: true })
  @ManyToOne((type) => Cat, (cat) => cat.diary, {
    eager: false,
    onDelete: 'CASCADE',
  })
  cat: Cat;
}
