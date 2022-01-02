import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CatGender } from './cat-gender.enum';
import { User } from 'src/auth/user.entity';
@Entity()
export class Cat extends BaseEntity {
  @PrimaryGeneratedColumn()
  catId: number;

  @Column()
  name: string;

  @Column()
  age: string;

  @Column()
  breed: string;

  @Column()
  gender: CatGender;

  @ManyToOne((type) => User, (user) => user.cats, { eager: false })
  user: User;
}
