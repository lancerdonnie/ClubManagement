import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Club } from './Club';
import { User } from './User';

@Entity('club_members')
export class ClubMembers extends BaseEntity {
  @ManyToOne(() => User, (user) => user.clubMembers)
  user: User;

  @ManyToOne(() => Club, (club) => club.clubMembers)
  club: Club;

  @Column()
  is_admin: boolean;

  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  clubId: number;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;
}
