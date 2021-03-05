import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { user } from './User';

@Entity()
export class invite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  club_id: number;

  @ManyToOne(() => user, (user: user) => user.invites)
  user: user;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;
}
