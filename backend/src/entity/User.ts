import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { invite } from './Invites';

@Entity()
export class user extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: number;

  @Column()
  password: string;

  @Column()
  admin: boolean;

  @OneToMany(() => invite, (invite: invite) => invite.user)
  invites: invite[];

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;
}
