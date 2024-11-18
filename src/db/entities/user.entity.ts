import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: 1 })
  version: number;

  @Column({
    type: 'bigint',
    name: 'created_at',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    },
  })
  createdAt: number;

  @Column({
    type: 'bigint',
    name: 'updated_at',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    },
  })
  updatedAt: number;
}
