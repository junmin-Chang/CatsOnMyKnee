import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UploadImage {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public url: string;

  @Column()
  public key: string;
}
